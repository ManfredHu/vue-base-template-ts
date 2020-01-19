<template>
  <div class="distpickerDemo">
    <input
      class="address-input"
      placeholder="所在地区"
      readonly
      v-tap="showHide"
    />
    <Distpicker
      :province="select.province"
      :city="select.city"
      :area="select.area"
      @province="selectProvince"
      @city="selectCity"
      @area="selectArea"
      :isShow="isShow"
      @showHide="showHide"
    >
    </Distpicker>
    <div class="content-show">
      <pre><code>{{ select }}</code></pre>
    </div>
  </div>
</template>

<script>
import Distpicker from '@/components/base/Distpicker'

export default {
  name: 'DistpickerDemo',
  components: { Distpicker },
  data() {
    return {
      showCode: false,
      isShow: false,
      select: { province: '广东省', city: '深圳市' }
    }
  },
  methods: {
    selectProvince(value) {
      this.$set(this.select, 'province', value.value)
      console.log(value)
    },
    selectCity(value) {
      this.$set(this.select, 'city', value.value)
      console.log(value)
    },
    selectArea(value) {
      this.$set(this.select, 'area', value.value)
      console.log(value)
    },
    showHide(isShow) {
      if (typeof isShow === 'boolean') {
        this.isShow = isShow
      } else {
        this.isShow = !this.isShow
      }
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.content-show {
  color: #fff;
}
.address-input {
  border: none;
  color: #000;
  border-radius: 0;
}
</style>
