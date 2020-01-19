<template>
  <div class="toast" v-if="isShow">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i
        :class="{
          'weui-icon_toast': true,
          'weui-icon-success-no-circle': type === 'suc',
          'weui-loading': type === 'loading'
        }"
      ></i>
      <p class="weui-toast__content" v-html="text.join('<br>')"></p>
    </div>
  </div>
</template>

<script>
import baseComponent from '@/base/baseComponent'

export default {
  name: 'Toast',
  extends: baseComponent,
  props: {
    text: {
      type: [Array],
      default: () => ['']
    }
  },
  data() {
    return {
      type: 'suc',
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

<style lang="less" scoped>
// 透明遮罩
.weui-mask_transparent {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.weui-toast {
  position: fixed;
  z-index: 5000;
  width: 240 / @rem;
  min-height: 240 / @rem;
  top: 180px;
  left: 50%;
  margin-left: -120 / @rem;
  background: rgba(17, 17, 17, 0.7);
  text-align: center;
  border-radius: 5px;
  color: #ffffff;
}
.weui-icon_toast {
  margin: 24px 0 0;
  display: block;
  &.weui-icon-success-no-circle {
    &:before {
      color: #ffffff;
      font-size: 55px;
    }
  }
  &.weui-loading {
    margin: 32px 0 0;
    width: 38px;
    height: 38px;
    vertical-align: baseline;
  }
}

.weui-toast__content {
  margin: 0 0 16px;
  font-size: 14px;
}

.weui-loading {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  animation: weuiLoading 1s steps(12, end) infinite;
  background: transparent
    url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E9E9E9' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23989697' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%239B999A' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23A3A1A2' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23ABA9AA' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23B2B2B2' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23BAB8B9' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23C2C0C1' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23CBCBCB' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23D2D2D2' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23DADADA' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E2E2E2' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E")
    no-repeat;
  background-size: 100%;

  &.weui-loading_transparent,
  .weui-btn_loading.weui-btn_primary & {
    background-image: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E");
  }
}

@-webkit-keyframes weuiLoading {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}

@keyframes weuiLoading {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
</style>
