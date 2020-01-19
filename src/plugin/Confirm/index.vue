<template>
  <div class="comfirm" v-if="isShow">
    <div class="comfirm-mask" :style="{ zIndex: zIndex }"></div>
    <div class="comfirm-main" :style="{ zIndex: zIndex + 1 }">
      <div class="comfirm-banner" v-if="iconLink">
        <img
          class="comfirm-banner-img"
          :src="iconLink"
          alt="icon"
          :style="iconStyle"
        />
      </div>
      <div class="comfirm-hd">
        <div class="comfirm-title">{{ title }}</div>
      </div>
      <div class="comfirm-bd">
        {{ desc }}
      </div>
      <div class="comfirm-ft">
        <a
          v-if="!!lBtnShow"
          href="javascript:;"
          class="comfirm-btn comfirm-btn"
          v-tap="lBtnEventEmit"
          :style="lBtnStyle"
          >{{ lBtnText }}</a
        >
        <a
          v-if="!!rBtnShow"
          href="javascript:;"
          class="comfirm-btn comfirm-btn_primary"
          v-tap="rBtnEventEmit"
          :style="rBtnStyle"
          >{{ rBtnText }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import baseComponent from '@/base/baseComponent'
import { is } from 'hu-tool'
export default {
  name: 'Comfirm',
  extends: baseComponent,
  data() {
    return {
      isShow: false,
      title: '',
      desc: '',
      lBtnShow: true,
      rBtnShow: true,
      lBtnText: '取消',
      rBtnText: '确定',
      lBtnEvent: () => {},
      rBtnEvent: () => {},
      zIndex: 100,
      lBtnStyle: {},
      rBtnStyle: {},
      iconLink: '',
      iconStyle: {}
    }
  },
  methods: {
    lBtnEventEmit() {
      console.log('点击了左按钮')
      if (is.function(this.lBtnEvent)) {
        this.lBtnEvent(this)
      }
    },
    rBtnEventEmit() {
      console.log('点击了右按钮')
      if (is.function(this.rBtnEvent)) {
        this.rBtnEvent(this)
      }
    },
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  },
  created() {}
}
</script>

<style lang="less" scope>
.comfirm {
  &-mask {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  &-banner {
    padding-top: 70 / @rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &-img {
      width: 154 / @rem;
    }
  }
  &-main {
    position: fixed;
    z-index: 101;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }
  &-title {
    font-size: 36 / @rem;
    font-weight: bold;
  }
  &-hd {
    font-size: 30 / @rem;
    padding: 1.3em 1.6em 0.5em;
  }
  &-bd {
    padding: 0 1.6em 0.8em;
    min-height: 80 / @rem;
    font-size: 26 / @rem;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    color: #888;
  }
  &-ft {
    position: relative;
    line-height: 96 / @rem;
    font-size: 36 / @rem;
    display: flex;
    &:after {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #d5d5d6;
      color: #d5d5d6;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
  }
  &-btn {
    display: block;
    flex: 1;
    text-decoration: none;
    position: relative;
    color: @textDefaultColor;
    &_primary {
      color: #57be69;
    }
    &:after {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      bottom: 0;
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.1);
      transform: scaleX(0.5);
    }
    &:first-child {
      &:after {
        display: none;
      }
    }
  }
}
</style>
