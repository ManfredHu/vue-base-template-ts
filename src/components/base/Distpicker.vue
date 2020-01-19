<template>
  <div>
    <transition name="fade">
      <div v-if="isShow" class="distpicker-mask" v-tap="close"></div>
    </transition>
    <transition name="slide-fade">
      <div v-if="isShow" class="distpicker-address-wrapper">
        <div class="distpicker-header">
          <h2 class="distpicker-title">选择所在区域</h2>
          <i class="distpicker-close" v-tap="close"></i>
        </div>
        <div class="address-header">
          <ul>
            <li :class="{ active: tab === 1 }" v-tap="resetProvince">
              {{
                currentProvince && !staticPlaceholder
                  ? currentProvince
                  : placeholders.province
              }}
            </li>
            <template>
              <li
                v-if="showCityTab"
                :class="{ active: tab === 2 }"
                v-tap="resetCity"
              >
                {{
                  currentCity && !staticPlaceholder
                    ? currentCity
                    : placeholders.city
                }}
              </li>
              <li v-if="showAreaTab" :class="{ active: tab === 3 }">
                {{
                  currentArea && !staticPlaceholder
                    ? currentArea
                    : placeholders.area
                }}
              </li>
            </template>
          </ul>
        </div>
        <div class="address-container">
          <ul v-if="tab === 1">
            <li
              v-for="(item, index) in filterProvince"
              :class="{ active: item === currentProvince }"
              @click="chooseProvince(item)"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
          <template>
            <ul v-if="tab === 2">
              <li
                v-for="(item, index) in filterCities"
                :class="{ active: item === currentCity }"
                @click="chooseCity(item)"
                :key="index"
              >
                {{ item }}
                <i
                  class="weui-icon-success-no-circle distpicker-active-suc"
                ></i>
              </li>
            </ul>
            <ul v-if="tab === 3">
              <li
                v-for="(item, index) in areas"
                :class="{ active: item === currentArea }"
                @click="chooseArea(item)"
                :key="index"
              >
                {{ item }}
                <i
                  class="weui-icon-success-no-circle distpicker-active-suc"
                ></i>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import baseComponent from '@/base/baseComponent'
import DISTRICTS from '@/data/districts'
import debug from 'debug'
const log = debug('worker:Distpicker')
const DEFAULT_CODE = 100000

// 支持传入地区预占位置
// 如需传入:province="广东" :city="深圳市"的情况，具体可以看fixProvince方法，可以修复传入的province值

export default {
  name: 'Distpicker',
  extends: baseComponent,
  props: {
    isShow: { default: 0 },
    province: { type: [String, Number], default: '' },
    city: { type: [String, Number], default: '' },
    area: { type: [String, Number], default: '' },
    type: { type: String, default: '' },
    staticPlaceholder: { type: Boolean, default: false },
    lockAddressSelect: { default: false }, // 不规定类型，有可能是String或者Boolean
    placeholders: {
      type: Object,
      default() {
        return {
          province: '省',
          city: '市',
          area: '区'
        }
      }
    },
    ignoreArea: { type: [Object], default: () => {} }
  },
  data() {
    return {
      tab: 1,
      showCityTab: false,
      showAreaTab: false,
      provinces: [],
      cities: [],
      areas: [],
      currentProvince:
        this.determineType(this.province) || this.placeholders.province,
      currentCity: this.determineType(this.city) || this.placeholders.city,
      currentArea: this.determineType(this.area) || this.placeholders.area
    }
  },
  created() {
    // 创建时候根据传入数据刷新一次选项
    this.updateComponentDefaultSelect()
  },
  computed: {
    lockProvince() {
      if (this.lockAddressSelect) {
        return !!parseInt(this.lockAddressSelect.split(/-|\|/)[0])
      }
      return false
    },
    lockCity() {
      if (this.lockAddressSelect) {
        return !!parseInt(this.lockAddressSelect.split(/-|\|/)[1])
      }
      return false
    },
    filterProvince() {
      if (
        this.ignoreArea &&
        this.ignoreArea.province &&
        this.ignoreArea.province.length > 0
      ) {
        const rst = {}
        for (const [key, value] of Object.entries(this.provinces)) {
          if (!this.ignoreArea.province.includes(value)) {
            rst[key] = value
          } else {
            log('忽略省份', key, value)
          }
        }
        return rst
      }
      return this.provinces
    },
    filterCities() {
      if (
        this.ignoreArea &&
        this.ignoreArea.city &&
        this.ignoreArea.city.length > 0
      ) {
        const rst = {}
        for (const [key, value] of Object.entries(this.cities)) {
          if (!this.ignoreArea.city.includes(value)) {
            rst[key] = value
          } else {
            log('忽略城市', key, value)
          }
        }
        return rst
      }
      return this.cities
    }
  },
  watch: {
    currentProvince(value) {
      if (value !== this.placeholders.province) {
        this.$emit('province', this.setData(value))
      }
    },
    currentCity(value) {
      if (value !== this.placeholders.city) {
        this.$emit('city', this.setData(value, this.currentProvince))
      }
      this.emit('selected')
    },
    currentArea(value) {
      if (value !== this.placeholders.area) {
        this.$emit('area', this.setData(value, this.currentProvince))
      }
      this.emit('selected')
    },
    province(value) {
      this.currentProvince = this.province || this.placeholders.province
      this.cities = this.determineValue(
        this.currentProvince,
        this.placeholders.province
      )
    },
    city(value) {
      this.currentCity = this.city || this.placeholders.city
      this.areas = this.determineValue(
        this.currentCity,
        this.placeholders.city,
        this.currentProvince
      )
    },
    area(value) {
      this.currentArea = this.area || this.placeholders.area
    }
  },
  methods: {
    setData(value, check = '') {
      return {
        code: this.getAreaCode(value, check),
        value: value
      }
    },
    emit(name) {
      let data = {
        province: this.setData(this.currentProvince)
      }

      // if (!this.onlyProvince) {
      //   this.$set(data, 'city', this.setData(this.currentCity))
      // }

      // if (!this.onlyProvince || this.hideArea) {
      //   this.$set(data, 'area', this.setData(this.currentArea, this.currentCity))
      // }

      this.$emit(name, data)
    },
    getCities() {
      this.currentCity = this.placeholders.city
      this.currentArea = this.placeholders.area
      this.cities = this.determineValue(
        this.currentProvince,
        this.placeholders.province
      )
      this.cleanList('areas')
      if (this.cities.length === 0) {
        this.emit('selected')
        this.tab = 1
        this.showCityTab = false
      }
    },
    getAreas() {
      this.currentArea = this.placeholders.area
      this.areas = this.determineValue(
        this.currentCity,
        this.placeholders.city,
        this.currentProvince
      )
      if (this.areas.length === 0) {
        this.emit('selected')
        this.tab = 2
        this.showAreaTab = false
      }
    },
    resetProvince() {
      if (this.lockProvince) return
      this.tab = 1
      this.showCityTab = false
      this.showAreaTab = false
      this.$emit('city', this.setData(''))
      this.$emit('area', this.setData(''))
      this.provinces = this.getDistricts()
    },
    resetCity() {
      if (this.lockCity) return
      this.tab = 2
      this.showCityTab = true
      this.showAreaTab = false
      this.$emit('area', this.setData(''))
      this.getCities()
    },
    chooseProvince(name) {
      this.currentProvince = name
      if (this.checkIsLast(name)) {
        this.close()
        return
      }
      this.tab = 2
      this.showCityTab = true
      this.showAreaTab = false
      this.getCities()
    },
    chooseCity(name) {
      this.currentCity = name
      if (this.checkIsLast(name)) {
        // 选择了四个直辖市，没有下一级的情况下，需要清空
        this.area = ''
        this.close()
        return
      }
      this.tab = 3
      this.showCityTab = true
      this.showAreaTab = true
      this.getAreas()
    },
    chooseArea(name) {
      this.currentArea = name
      if (this.checkIsLast(name)) {
        this.close()
      }
    },
    getAreaCodeByPreCode(name, preCode) {
      let codes = []

      for (let x in DISTRICTS) {
        for (let y in DISTRICTS[x]) {
          if (name === DISTRICTS[x][y]) {
            codes.push(y)
          } else if (DISTRICTS[x][y].indexOf(name) > -1) {
            codes.push(y)
          }
        }
      }

      if (codes.length > 1) {
        let index
        codes.forEach((item, i) => {
          if (item.slice(0, 2) === preCode) {
            index = i
          }
        })

        return codes[index]
      } else {
        return codes[0]
      }
    },
    getAreaCode(name, check = '') {
      for (let x in DISTRICTS) {
        for (let y in DISTRICTS[x]) {
          // 兼容广东省和广东的情况
          if (name === DISTRICTS[x][y] || DISTRICTS[x][y].indexOf(name) > -1) {
            if (check.length > 0) {
              if (
                y.slice(0, 2) !==
                this.getAreaCodeByPreCode(check, y.slice(0, 2)).slice(0, 2)
              ) {
                continue
              } else {
                return y
              }
            } else {
              return y
            }
          }
        }
      }
    },
    getCodeValue(code) {
      for (let x in DISTRICTS) {
        for (let y in DISTRICTS[x]) {
          if (code === parseInt(y)) {
            return DISTRICTS[x][y]
          }
        }
      }
    },
    getDistricts(code = DEFAULT_CODE) {
      return DISTRICTS[code] || []
    },
    determineValue(currentValue, placeholderValue, check = '') {
      if (currentValue === placeholderValue) {
        return []
      } else {
        return this.getDistricts(this.getAreaCode(currentValue, check))
      }
    },
    // 传入value为number则返回code，其他透传
    determineType(value) {
      if (typeof value === 'number') {
        return this.getCodeValue(value)
      }
      return value
    },
    cleanList(name) {
      this[name] = []
    },
    close() {
      // 隐藏组件
      this.$emit('showHide', false)
    },
    // 是否是最后一级
    checkIsLast(name) {
      const code = this.getAreaCode(name)
      const len = this.getDistricts(code)
      if (len.length <= 0) {
        return true
      }
      return false
    },
    // 修复省份传入为“广东”而不是“广东省”的情况
    fixProvince(provinceText) {
      for (let x in DISTRICTS) {
        for (let y in DISTRICTS[x]) {
          if (DISTRICTS[x][y].indexOf(provinceText) > -1) {
            return DISTRICTS[x][y]
          }
        }
      }
      return provinceText
    },
    updateComponentDefaultSelect() {
      // 传了区域的情况下
      if (this.area) {
        this.tab = 3
        this.showCityTab = true
        this.showAreaTab = true
        this.areas = this.getDistricts(
          this.getAreaCode(this.determineType(this.city), this.area)
        )
      } else if (this.city) {
        // 传了城市的情况下
        this.tab = 3
        this.showCityTab = true
        this.showAreaTab = true
        this.cities = this.getDistricts(
          this.getAreaCode(this.determineType(this.province))
        )
        this.areas = this.getDistricts(
          this.getAreaCode(this.determineType(this.city), this.area)
        )
      } else if (this.province) {
        this.tab = 2
        this.showCityTab = true
        this.cities = this.getDistricts(
          this.getAreaCode(this.determineType(this.province))
        )
      } else {
        this.provinces = this.getDistricts()
      }
    }
  }
}
</script>

<style lang="less">
@textColor: #f6f6f6;

// 选择部分
.slide-fade-enter {
  opacity: 0;
  transform: translateY(100%);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-leave {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

// 浮层
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.distpicker {
  &-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 200;
  }

  &-header {
    position: relative;
    height: 88 / @rem;
    line-height: 88 / @rem;
  }

  &-title {
    color: @defaultTextColor;
    font-size: 28 / @rem;
    padding: 0 30 / @rem;
    background: #f7f7f7;
  }

  &-close {
    height: 22 / @rem;
    width: 22 / @rem;
    position: absolute;
    right: 28 / @rem;
    top: 50%;
    margin-top: -11 / @rem;
    background: url('../../assets/img/close.png') no-repeat center;
    background-size: 22 / @rem;
  }
}

.distpicker-address-wrapper {
  z-index: 201;
  color: #9caebf;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 900 / @rem;
  overflow: hidden;
  border-top-left-radius: 14 / @rem;
  border-top-right-radius: 14 / @rem;
  select {
    padding: 0.5rem 0.75rem;
    height: 40 / @rem;
    font-size: 1rem;
    line-height: 1.25;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

    option {
      font-weight: normal;
      display: block;
      white-space: pre;
      min-height: 1.2em;
      padding: 0px 2px 1px;
    }
  }
  ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;
    }
  }
  .address-header {
    background-color: #fff;
    padding: 0 20 / @rem;
    height: 80 / @rem;
    position: relative;
    ul {
      position: absolute;
      bottom: 0;
      li {
        display: inline-block;
        padding: 20 / @rem 20 / @rem 14 / @rem;

        &.active {
          border-bottom: @mainColor solid 6 / @rem;
          color: @mainColor;
        }
      }
    }
  }
  .address-container {
    background-color: #fff;
    overflow: auto;
    height: 700 / @rem;
    ul {
      height: 100%;
      overflow: auto;
      li {
        padding: 16 / @rem 20 / @rem;
        border-top: 1px solid #f6f6f6;
        display: flex;
        justify-content: space-between;

        .distpicker-active-suc {
          display: none;
          font-size: 30 / @rem;
        }
        &.active {
          color: @mainColor;
          .distpicker-active-suc {
            display: inline-block;
          }
        }
      }
    }
  }
  @keyframes showUp {
    0% {
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes showDown {
    0% {
      transform: translate3d(0, 0, 0);
    }

    100% {
      transform: translate3d(0, 100%, 0);
      visibility: hidden;
    }
  }
}
</style>
