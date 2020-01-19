<template>
  <div @keyup="onKeyUp" tabindex="0">
    <div
      class="mask"
      v-tap.prevent="triggerBlur"
      v-if="!!blurMask && !!typing"
    ></div>
    <div class="keyboard" v-if="!!typing" :sytle="defaultStyle">
      <div class="topBar" v-if="Boolean(finishBtn)">
        <div class="finishBtn" v-tap.prevent="finishEdit">完成</div>
      </div>
      <div class="keyboard-input">
        <input
          readonly
          class="phoneInput"
          :placeholder="placeHolder"
          v-model="beautifyPhone"
        />
      </div>
      <div class="shell">
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
          v-tap.prevent="typeText.bind(this, 'X')"
          v-if="isID === 1"
        >
          X
        </div>
        <div class="spaceBtn" v-else-if="isID === 2"></div>
        <div class="hideBtn" v-tap.prevent="finishEdit" v-else></div>
        <div class="btn" v-tap.prevent="typeText.bind(this, 0)">0</div>
        <div
          class="deleteBtn"
          v-tap.prevent="deleteText"
          v-longpress="clearText"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { phone } from 'hu-tool'

export default {
  name: 'KeyBoard',
  props: {
    // 1 支持身份证X
    // 2 隐藏收起键盘按钮
    isID: {
      type: Number,
      default: 0
    },
    keyPress: Function,
    finishBtn: {
      default: 1
    },
    typing: {
      type: Number,
      twoWay: true,
      default: 0
    },
    blurMask: {
      default: 0
    },
    zIndex: {
      default: 500
    },
    phoneText: {
      type: String,
      default: ''
    },
    placeHolder: {
      type: String,
      default: '请输入号码'
    }
  },
  data() {
    return {
      defaultStyle: {
        zIndex: this.zIndex
      }
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
  computed: {
    beautifyPhone() {
      return phone.beautifyPhone(this.phoneText)
    }
  },
  mounted() {},
  destroyed() {}
}
</script>

<style scoped lang="less">
@lightGray: #cfd6da;
@lighterGray: #f8f8f8;
@gray: #b1b7ba;
@gray2: #eceeee;
@deepDark: #4d4d4d;
@blue: #618bff;

.keyboard {
  animation: showUp 0.3s;
  position: fixed;
  z-index: 500;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: @gray2;
  box-sizing: border-box;
  box-shadow: 0 16px 40px 0 rgba(0, 0, 0, 0.8);
  &-input {
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      padding: 20 / @rem;
      border: none;
      font-size: 40 / @rem;
      font-weight: bold;
      width: 100%;
      text-align: center;
    }
  }

  .topBar {
    background: @lighterGray;
    width: 100%;
    box-sizing: border-box;
    text-align: right;
    height: 68 / @rem;
    font-size: 30 / @rem;
    line-height: 68 / @rem;
    padding: 0 20 / @rem;
    color: @blue;
    font-weight: bold;
  }

  .shell {
    display: flex;
    flex-wrap: wrap;
    padding: 22 / @rem 14 / @rem;
    justify-content: space-between;

    .btn {
      width: 234 / @rem;
      height: 92 / @rem;
      background: #fff;
      border-radius: 10 / @rem;
      font-size: 56 / @rem;
      line-height: 92 / @rem;
      text-align: center;
      font-weight: bold;
      color: @deepDark;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      margin-bottom: 14 / @rem;

      &:active {
        background: @gray;
      }
    }

    .spaceBtn {
      .btn();

      background: @gray2;
      box-shadow: none;
    }

    .hideBtn {
      .btn();
      background: url('../../assets/img/hideKeyboard.png') no-repeat center;
      background-size: 84 / @rem;
      box-shadow: none;

      img {
        margin-top: 8 / @rem;
        width: 84 / @rem;
        height: 84 / @rem;
      }
    }

    .deleteBtn {
      .btn();
      background: url('../../assets/img/delete.png') no-repeat center;
      background-size: 84 / @rem;
      box-shadow: none;

      img {
        margin-top: 8 / @rem;
        width: 84 / @rem;
        height: 84 / @rem;
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
}

.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 499;
  background: @maskBgColor;
}
</style>
