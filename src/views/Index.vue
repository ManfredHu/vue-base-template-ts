<template>
  <div class="components-list">
    <header class="components-list-header">组件列表</header>
    <ul>
      <li>
        <router-link class="components-list-text" to="/swiper"
          >Swiper轮播图</router-link
        >
      </li>
      <li>
        <router-link class="components-list-text" to="/dialog"
          >提示浮层</router-link
        >
      </li>
      <li>
        <router-link class="components-list-text" to="/confirm"
          >确认框</router-link
        >
      </li>
      <li>
        <router-link class="components-list-text" to="/totop"
          >返回顶部</router-link
        >
      </li>
      <li>
        <router-link class="components-list-text" to="/keyboard"
          >虚拟键盘</router-link
        >
      </li>
      <li>
        <router-link class="components-list-text" to="/distpicker"
          >地区级联选择</router-link
        >
      </li>
      <li>
        <router-link class="components-list-text" to="/toast"
          >弹出式提示（Loading/Suc）</router-link
        >
      </li>
      <li>
        <router-link class="components-list-text" to="/vcode"
          >验证码</router-link
        >
      </li>
      <li>
        <router-link class="components-list-text" to="/idcard"
          >身份证</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import baseView from '../base/baseView'

export default {
  extends: baseView,
  name: 'Index',
  components: {},
  created() {}
}
</script>

<style lang="less" scoped>
.components {
  &-list {
    color: #fff;
    &-header {
      font-size: 48 / @rem;
    }
    &-text {
      font-size: 36 / @rem;
      color: #eee;
    }
  }
}
</style>
