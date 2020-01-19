<template>
  <div class="dialog" v-if="isShow">
    <div class="dialog-mask" v-if="showMask"></div>
    <div class="dialog-main">
      <div class="dialog-bd" v-html="text.join('<br>')"></div>
    </div>
  </div>
</template>

<script>
import baseComponent from '@/base/baseComponent'
export default {
  name: 'Dialog',
  extends: baseComponent,
  props: {
    text: {
      type: [Array],
      default: () => ['']
    }
  },
  data() {
    return {
      isShow: false,
      showTime: 86400000,
      showMask: false,
      timer: null
    }
  },
  methods: {
    show() {
      this.isShow = true
      clearTimeout(this.timer)
      if (this.showTime) {
        this.timer = setTimeout(() => {
          this.hide()
        }, this.showTime)
      }
    },
    hide() {
      this.isShow = false
    }
  },
  mounted() {}
}
</script>

<style lang="less" scope>
.dialog {
  &-mask {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  &-main {
    position: fixed;
    z-index: 500;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: 16 / @rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  &-bd {
    padding: 0.8em 1.6em;
    font-size: 34 / @rem;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    color: #fff;
    background: rgba(17, 17, 17, 0.7);
  }
}
</style>
