<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class App extends Vue {}
</script>

<style lang="less">
@import '../src/style/base/import.all.less';

.mx_reset();

.app {
  height: 100%;
  width: 100%;
  background-image: radial-gradient(ellipse at 50% 10%, #acc8b4 30%, #5b816e);
  min-height: 736px;
}
</style>
