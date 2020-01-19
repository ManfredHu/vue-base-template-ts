import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

// Dynamic page, like activity page
const SwiperDemo = () =>
  import(/* webpackChunkName: "SwiperDemo" */ '@/views/SwiperDemo.vue')
const DialogDemo = () =>
  import(/* webpackChunkName: "DialogDemo" */ '@/views/DialogDemo.vue')
const ConfirmDemo = () =>
  import(/* webpackChunkName: "ConfirmDemo" */ '@/views/ConfirmDemo.vue')
const ToTopDemo = () =>
  import(/* webpackChunkName: "ToTopDemo" */ '@/views/ToTopDemo.vue')
const KeyBoardDemo = () =>
  import(/* webpackChunkName: "KeyBoardDemo" */ '@/views/KeyBoardDemo.vue')
const DistpickerDemo = () =>
  import(/* webpackChunkName: "DistpickerDemo" */ '@/views/DistpickerDemo.vue')
const ToastDemo = () =>
  import(/* webpackChunkName: "ToastDemo" */ '@/views/ToastDemo.vue')
const VCodeDemo = () =>
  import(/* webpackChunkName: "VCodeDemo" */ '@/views/VCodeDemo.vue')
const IdCardDemo = () =>
  import(/* webpackChunkName: "IdCardDemo" */ '@/views/IdCardDemo.vue')

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/Swiper'.toLowerCase(),
    name: 'Swiper',
    component: SwiperDemo
  },
  {
    path: '/Dialog'.toLowerCase(),
    name: 'Dialog',
    component: DialogDemo
  },
  {
    path: '/Confirm'.toLowerCase(),
    name: 'Confirm',
    component: ConfirmDemo
  },
  {
    path: '/ToTop'.toLowerCase(),
    name: 'ToTop',
    component: ToTopDemo
  },
  {
    path: '/KeyBoard'.toLowerCase(),
    name: 'KeyBoard',
    component: KeyBoardDemo
  },
  {
    path: '/Distpicker'.toLowerCase(),
    name: 'Distpicker',
    component: DistpickerDemo
  },
  {
    path: '/Toast'.toLowerCase(),
    name: 'Toast',
    component: ToastDemo
  },
  {
    path: '/VCode'.toLowerCase(),
    name: 'VCode',
    component: VCodeDemo
  },
  {
    path: '/IdCard'.toLowerCase(),
    name: 'IdCard',
    component: IdCardDemo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
