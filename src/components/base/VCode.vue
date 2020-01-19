<template>
  <div @keyup="onKeyUp" tabindex="0">
    <transition name="fade">
      <div
        class="mask"
        v-tap.prevent="triggerBlur"
        v-if="!!blurMask && !!typing"
      ></div>
    </transition>
    <transition name="slide-fade">
      <div
        :class="{ vcode: true, idcard: type === 'idcard' }"
        v-if="!!typing"
        :sytle="defaultStyle"
      >
        <i class="vcode-close" v-tap.prevent="finishEdit"></i>
        <div class="vcode-hd">
          <h2 class="vcode-hd-title">{{ title }}</h2>
          <p class="vcode-hd-desc" v-if="!type">
            验证码已发送到<span class="vcode-hd-desc__main">{{
              beautifyPhone
            }}</span
            >的手机
          </p>
          <p class="vcode-hd-desc" v-else>
            身份信息仅用于手机购买
          </p>
          <ul class="vcode-hd-numlist">
            <li v-for="(item, idx) in vCodeNums" :key="idx">{{ item }}</li>
          </ul>
          <div
            class="vcode-hd-again"
            v-tap.prevent="toGetVCode"
            v-if="!isCountDown && !type"
          >
            重新获取验证码
          </div>
          <div
            class="vcode-hd-again vcode-hd-again__timer"
            v-if="isCountDown && !type"
          >
            {{ time }}秒后可重新获取
          </div>
        </div>

        <div class="vcode-keyboard">
          <div class="vcode-keyboard-num">
            <div class="btn" v-tap.prevent="typeText.bind(this, 1)">1</div>
            <div class="btn" v-tap.prevent="typeText.bind(this, 2)">2</div>
            <div class="btn" v-tap.prevent="typeText.bind(this, 3)">3</div>
            <div class="btn" v-tap.prevent="typeText.bind(this, 4)">4</div>
            <div class="btn" v-tap.prevent="typeText.bind(this, 5)">5</div>
            <div class="btn" v-tap.prevent="typeText.bind(this, 6)">6</div>
            <div class="btn" v-tap.prevent="typeText.bind(this, 7)">7</div>
            <div class="btn" v-tap.prevent="typeText.bind(this, 8)">8</div>
            <div class="btn" v-tap.prevent="typeText.bind(this, 9)">9</div>
            <div
              class="btn"
              v-if="type === 'idcard'"
              v-tap.prevent="typeText.bind(this, 'X')"
            >
              X
            </div>
            <div v-else class="btn"></div>
            <div class="btn" v-tap.prevent="typeText.bind(this, 0)">0</div>
            <div class="btn"></div>
          </div>
          <div class="vcode-keyboard-func">
            <div
              class="deleteBtn"
              v-tap.prevent="deleteText"
              v-longpress="clearText"
            ></div>
            <div class="finishBtn" v-tap.prevent="finishEdit">完成</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Phone } from 'hu-tool'
import { setInterval, clearInterval } from 'timers'

export default {
  name: 'VCode',
  props: {
    type: {
      type: String,
      default: ''
    },
    keyPress: Function,
    typing: {
      type: Number,
      twoWay: true,
      default: 0
    },
    // 是否显示mask
    blurMask: {
      default: 0
    },
    zIndex: {
      default: 500
    },
    phone: {
      default: ''
    },
    vCodeNums: Array,
    getVCode: Function
  },
  data() {
    return {
      defaultStyle: {
        zIndex: this.zIndex
      },
      time: 0,
      isCountDown: false,
      timer: null
    }
  },
  computed: {
    beautifyPhone() {
      const purePhone = Phone.getPurePhone(this.phone)
      if (purePhone) {
        return Phone.beautifyPhone(purePhone)
      }
      return ''
    },
    title() {
      if (this.type === 'idcard') {
        return '本人身份证号码校验'
      }
      return '请输入验证码'
    }
  },
  methods: {
    typeText(num) {
      this.keyPress && this.keyPress({
        type: 'enter',
        value: num
      })
    },
    deleteText() {
      this.keyPress && this.keyPress({
        type: 'delete',
        value: undefined
      })
    },
    clearText() {
      this.keyPress && this.keyPress({
        type: 'clear',
        value: undefined
      })
    },
    finishEdit() {
      this.$emit('typing', 0)
      this.keyPress && this.keyPress({
        type: 'finish',
        value: undefined
      })
    },
    triggerBlur() {
      this.$emit('typing', 0)
      this.keyPress && this.keyPress({
        type: 'cancel',
        value: undefined
      })
    },
    toGetVCode() {
      const that = this
      that.isCountDown = true
      that.time = 60
      clearInterval(that.timer)
      that.timer = setInterval(() => {
        if (that.time > 0) {
          that.time -= 1
        } else {
          clearInterval(that.timer)
          that.timer = null
          that.time = 60
          that.isCountDown = false
        }
      }, 1000)
      this.getVCode && this.getVCode()
    },
    onKeyUp(e) {
      const key = parseInt(e.key)
      if (key >= 0 && key < 10 ) {
        this.typeText(key)
      } else if (e.key === 'x') {
        this.typeText(e.key.toUpperCase())
      } else if (e.key === 'Backspace') {
        this.deleteText()
      } else if (e.key === 'Enter') {
        this.finishEdit()
      }
    }
  },
  created() {
    this.time = 60
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
    this.time = 60
  }
}
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 499;
  background: @maskBgColor;
}
.vcode {
  position: fixed;
  z-index: 500;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  &-hd {
    background: #fff;
    min-height: 342 / @rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24 / @rem 0;
    &-title {
      font-size: 36 / @rem;
    }
    &-desc {
      color: #888;
      padding-top: 10 / @rem;
      // padding-bottom: 36 / @rem;
      font-size: 24 / @rem;
      &__main {
        color: @baseTextColor;
        font-weight: bold;
        padding: 0 10 / @rem;
      }
    }
    &-numlist {
      display: flex;
      flex-direction: row;
      margin-top: 40 / @rem;
      li {
        font-size: 65 / @rem;
        font-weight: bold;
        height: 90 / @rem;
        line-height: 90 / @rem;
        width: 50 / @rem;
        text-align: center;
        margin: 0 17 / @rem;
        border-bottom: 4 / @rem solid @baseTextColor;
      }
    }
    &-again {
      color: @mainColor;
      font-size: 23 / @rem;
      margin-top: 38 / @rem;
      font-weight: bold;
      &__timer {
        color: #888;
        font-weight: normal;
      }
    }
  }
  &-keyboard {
    display: flex;
    background: #fff;
    &-num {
      flex: 1;
      flex-wrap: wrap;
      display: flex;
      justify-content: center;
      .btn {
        width: 184 / @rem;
        height: 115 / @rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid @containerBorderColor;
        border-right: 1px solid @containerBorderColor;
        font-weight: bold;
        font-size: 48 / @rem;
      }
    }
    &-func {
      width: 190 / @rem;
      display: flex;
      flex-direction: column;
      .deleteBtn {
        height: 50%;
        border-top: 1px solid @containerBorderColor;
        background: url('../../assets/img/delete.png') no-repeat;
        background-size: 84 / @rem;
        background-position: center;
      }
      .finishBtn {
        font-size: 38 / @rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        height: 50%;
        border-top: 1px solid @containerBorderColor;
        background: @mainColor;
      }
    }
  }
  &-close {
    display: block;
    height: 20 / @rem;
    width: 20 / @rem;
    background: url('../../assets/img/close.png') no-repeat center;
    background-size: 22 / @rem;
    position: absolute;
    right: 33 / @rem;
    top: 33 / @rem;
    transform: translateY(-50%);
  }
}
.idcard {
  .vcode-hd {
    min-height: 300 / @rem;
  }
  .vcode-hd-numlist {
    margin-top: 60 / @rem;
    width: 650 / @rem;
    border: 1px solid #95979b;
    border-radius: 8 / @rem;
    padding: 0 20 / @rem;
    align-items: center;
    justify-content: center;
    li {
      margin: 0;
      border: none;
      font-size: 52 / @rem;
      width: auto;
      &:nth-child(6) {
        margin-right: 20 / @rem;
      }
      &:nth-child(14) {
        margin-right: 20 / @rem;
      }
    }
  }
}
</style>
