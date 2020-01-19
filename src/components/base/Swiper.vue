<template>
  <swiper :options="swiperOption" class="swiper-box" ref="swiperInstance">
    <swiper-slide
      class="swiper-item"
      v-for="(item, index) in listData"
      :key="index"
    >
      <img :src="item" :alt="'picture' + index" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

// http://caibaojian.com/swiper-api/
export default {
  components: {
    swiper,
    swiperSlide
  },
  name: 'Swiper',
  props: {
    listData: { type: [Array], default: () => [] }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0, // 间距
        mousewheel: true,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  computed: {
    // swiper() {
    //   return this.$refs.bigSwiper.swiper
    // }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  }
}
</script>

<style lang="less" scoped>
.swiper-box {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.swiper-item {
  height: 100%;
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100%;
  }
}
</style>
