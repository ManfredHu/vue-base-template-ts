import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route } from 'vue-router'
import { Store } from 'vuex'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $route: Route
    $store: Store<any>
    $api: any
    extend: Function
    directive: Function
    prototype: {
      $showConfirm: Function
      $hideConfirm: Function
      $showDialog: Function
      $hideDialog: Function
      $showToast: Function
      $hideToast: Function
      $cookie: Function
      $time: Function
      $axios: Function
      $cache: Function
    }
  }
}

interface HTMLElement {
  addEventListener: Function
  tapObj: {
    handler: Function
  }
}
