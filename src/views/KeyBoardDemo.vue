<template>
  <div class="keyBoardDemo">
    <div>
      <p>这个输入框focus会拉起系统数字键</p>
      <input
        type="number"
        pattern="\d*"
        class="phoneInput"
        placeholder="会自动呼起系统键盘"
        maxlength="11"
      />
    </div>
    <div>
      <input
        type="tel"
        pattern="\d*"
        class="phoneInput"
        placeholder="会自动呼起系统键盘"
        maxlength="11"
      />
    </div>
    <button v-tap.prevent="showKeyBoard">点击拉起虚拟键盘</button>
    <KeyBoard
      :keyPress="onKeyboardPress"
      :typing.sync="typing"
      :phoneText.sync="phoneText"
      blurMask="1"
      :placeHolder="placeHolder"
    ></KeyBoard>
    <div>输入的号码为:{{ purePhone }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import KeyBoard from '@/components/base/KeyBoard.vue'
import { Phone } from 'hu-tool'

export default {
  name: 'KeyBoardDemo',
  components: {
    KeyBoard
  },
  data() {
    return {
      typing: 0,
      phoneText: '',
      placeHolder: '请输入手机号码'
    }
  },
  methods: {
    onKeyboardPress(e) {
      console.log('event', e.type, e.value)
      if (e.type === 'enter') {
        if (Phone.getPurePhone(this.phoneText).length < 11) {
          this.phoneText += e.value
        }
      } else if (e.type === 'delete') {
        const tt = this.phoneText
        this.phoneText = tt.length > 1 ? tt.substr(0, tt.length - 1) : ''
      } else if (e.type === 'clear') {
        this.phoneText = ''
      } else if (e.type === 'finish' || e.type === 'cancel') {
        if (!this.phoneText) {
          this.$showDialog({
            text: ['请输入手机号'],
            showTime: 2000
          })
        }
        this.typing = 0
      }
    },
    showKeyBoard() {
      this.typing = 1
    }
  },
  computed: {
    purePhone() {
      return Phone.getPurePhone(this.phoneText)
    }
  }
}
</script>

<style scoped lang="less">
.phoneInput {
  border: none;
  color: #000;
  border-radius: 0;
}
</style>
