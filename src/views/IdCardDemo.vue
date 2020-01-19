<template>
  <div>
    <VCode
      type="idcard"
      :typing.sync="typing"
      :keyPress="onKeyboardPress"
      :vCodeNums.sync="idCardNums"
    ></VCode>
  </div>
</template>

<script>
import VCode from '@/components/base/VCode.vue'
const idCardNumsTemp = new Array(18)
export default {
  name: 'IdCardDemo',
  components: {
    VCode
  },
  data() {
    return {
      typing: 0,
      idCardNums: idCardNumsTemp.fill('')
    }
  },
  methods: {
    onKeyboardPress(e) {
      console.log('event', e.type, e.value)
      if (e.type === 'enter') {
        for (let i = 0, len = this.idCardNums.length; i < len; i++) {
          if (this.idCardNums[i] === '') {
            this.$set(this.idCardNums, i, `${e.value}`)
            break
          }
        }
      } else if (e.type === 'delete') {
        for (let i = this.idCardNums.length - 1; i >= 0; i--) {
          if (this.idCardNums[i] !== '') {
            this.$set(this.idCardNums, i, '')
            break
          }
        }
      } else if (e.type === 'clear') {
        for (let i = this.idCardNums.length - 1; i >= 0; i--) {
          this.$set(this.idCardNums, i, '')
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
