<template>
  <div>
    <VCode
      :typing.sync="typing"
      :keyPress="onKeyboardPress"
      :vCodeNums.sync="vCodeNums"
      :phone="phone"
      :getVCode="getVCode"
    ></VCode>
  </div>
</template>

<script>
import VCode from '@/components/base/VCode.vue'
export default {
  name: 'VCodeDemo',
  components: {
    VCode
  },
  data() {
    return {
      typing: 0,
      vCodeNums: ['', '', '', '', '', ''],
      phone: '13800138000'
    }
  },
  methods: {
    onKeyboardPress(e) {
      console.log('event', e.type, e.value)
      if (e.type === 'enter') {
        for (let i = 0, len = this.vCodeNums.length; i < len; i++) {
          if (this.vCodeNums[i] === '') {
            this.$set(this.vCodeNums, i, `${e.value}`)
            break
          }
        }
      } else if (e.type === 'delete') {
        for (let i = this.vCodeNums.length - 1; i >= 0; i--) {
          if (this.vCodeNums[i] !== '') {
            this.$set(this.vCodeNums, i, '')
            break
          }
        }
      } else if (e.type === 'clear') {
        for (let i = this.vCodeNums.length - 1; i >= 0; i--) {
          this.$set(this.vCodeNums, i, '')
        }
      } else if (e.type === 'finish' || e.type === 'cancel') {
        this.typing = 0
      }
    },
    getVCode() {
      console.log('发送请求获取验证码')
    }
  },
  created() {
    setTimeout(() => {
      this.typing = 1
    }, 500)
  }
}
</script>

<style lang="less" scoped></style>
