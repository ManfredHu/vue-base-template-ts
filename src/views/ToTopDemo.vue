<template>
  <div class="totopDemo">
    <p class="totopDemo-text" v-for="(item,index) in listData" :key="index">{{item}}</p>
    <ToTop :showHeight="showHeight"></ToTop>
  </div>
</template>

<script>
// @ is an alias to /src
import ToTop from '@/components/base/ToTop.vue'

export default {
  name: 'ToTopDemo',
  data () {
    return {
      listData: [],
      showHeight: 736
    }
  },
  components: {
    ToTop
  },
  created () {
    for (let i = 0; i < 1000; i++) {
      this.listData.push(`line ${i}: 一大段文本来袭`)
    }
  },
  mounted () {
    // to show demo
    window.scrollTo(0, 1000)
  }
}
</script>

<style scoped lang="less">
.totopDemo{
  &-text{
    color: #fff;
  }
}
</style>
