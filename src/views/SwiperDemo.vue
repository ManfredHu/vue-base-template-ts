<template>
  <div class="swiperDemo">
    <Swiper class="insert-class" :listData="getBannerListData"></Swiper>
  </div>
</template>

<script>
// @ is an alias to /src
import Swiper from '@/components/base/Swiper.vue'

// http://caibaojian.com/swiper-api/
export default {
  name: 'SwiperDemo',
  components: {
    Swiper
  },
  data() {
    return {
      getBannerListData: [
        '//static.gtimg.com/vd/act/ggimg/201907/20559f792fc3f2f5361194b7fe1858bf.jpg',
        '//static.gtimg.com/vd/act/ggimg/201907/d2b5c9d45ff6421596dc917a56a1dc68.jpg',
        '//static.gtimg.com/vd/act/ggimg/201907/4a2e19a4c0f4d74703b625b803175ab8.jpg'
      ]
    }
  }
}
</script>

<style scoped lang="less">
.swiperDemo {
  height: 500 / @rem;
}
</style>
