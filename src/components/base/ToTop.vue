<template>
  <div class="totop" v-tap="backTop" v-show="btnFlag" :style="styleObj">
    <i class="totop-icon"></i>
  </div>
</template>

<script>
export default {
  name: 'ToTop',
  props: {
    text: {
      type: String,
      default: 'TOP'
    },
    showHeight: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 5
    },
    styleObj: {
      default() {
        return {
          right: '0',
          bottom: '20%'
        }
      }
    }
  },
  data() {
    return {
      btnFlag: false,
      scrollTop: 0
    }
  },
  methods: {
    backTop() {
      const that = this
      that.repeatOften(() => {
        let ispeed = Math.ceil(-that.scrollTop / that.speed)
        window.scrollTo(0, that.scrollTop + ispeed)
        if (that.scrollTop <= that.speed) {
          window.scrollTo(0, 0)
          // to fix dialog mask lock
          if (document.querySelector('#app')) {
            document.querySelector('#app').style.top = '0'
          }
          return false
        }
        return true
      })
    },
    repeatOften(cb) {
      const tag = cb()
      const func = this.repeatOften.bind(this, cb)
      // requestAnimFrameFix already fix
      tag && window.requestAnimationFrame(func)
    },
    scrollToTop() {
      const that = this
      that.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (that.scrollTop > that.showHeight) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>

<style scoped lang="less">
.totop {
  background: #fff;
  border-radius: 50%;
  width: 82 / @rem;
  height: 82 / @rem;
  position: fixed;
  z-index: 50;
  bottom: 20%;
  right: 0;
  text-align: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 3px #888;
  &-icon {
    height: 100%;
    &:before {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: 5 / @rem;
      content: '';
      width: 20 / @rem;
      height: 20 / @rem;
      z-index: 501;
      transform-origin: center;
      transform: translate(-50%, -50%) rotate(45deg);
      border: 2px solid #4a4a4a;
      border-right: none;
      border-bottom: none;
      border-radius: 1px;
    }
  }
}
</style>
