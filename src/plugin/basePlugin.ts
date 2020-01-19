import vTap from '@/directives/tap'
import longpress from '@/directives/longpress'
import { is, phone, ua, url } from 'hu-tool'
import rem from '../helper/rem'
import cookie from 'js-cookie'
import dayjs from 'dayjs'
import axios from 'axios'
import localforage from 'localforage'
import vconsole from '../helper/vconsole-helper'
import requestAnimFrameFix from '../helper/requestAnimFrameFix'
import axiosInterceptors from '../helper/axiosInterceptors'

const isDebug = process.env.NODE_ENV === 'development'

export default {
  install(Vue: Vue) {
    // install v-tap
    Vue.directive('tap', vTap)
    Vue.directive('longpress', longpress)

    // set driver to localStorage, if you want to use WEBSQL or INDEXEDDB
    // check https://localforage.github.io/localForage/#settings-api-setdriver
    localforage.config({
      driver: localforage.LOCALSTORAGE,
      name: 'cache'
    })

    // open debug log
    if (url().getQueryParam('debug') || isDebug) {
      localStorage.setItem('debug', 'worker:*')
    }

    // Mount some common module
    Object.assign(Vue.prototype, {
      $cookie: cookie,
      $time: dayjs,
      $axios: axios,
      $cache: localforage
    })

    // Mount hu-tool
    const mouteTool = [
      {
        name: 'is',
        value: is
      },
      {
        name: 'phone',
        value: phone
      },
      {
        name: 'ua',
        value: ua
      },
      {
        name: 'url',
        value: url
      }
    ]

    mouteTool.forEach(item => {
      // @ts-ignore
      Vue.prototype[`$${item.name}`] = item.value
    })

    // rem init
    rem()

    // debug options
    vconsole()

    // requestAnimFrameFix
    requestAnimFrameFix()

    // axios拦截器
    axiosInterceptors()
  }
}
