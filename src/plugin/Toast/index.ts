import index from './index.vue'

interface ShowToastParams {
  type: String
  text: Array<String>
  showTime: Number
}

const Obj = {
  install: (Vue: Vue) => {
    // 生成一个Vue的子类
    // 同时这个子类也就是组件
    const ObjConstructor = Vue.extend(index)

    // 生成一个该子类的实例
    const instance = new ObjConstructor()

    // 将这个实例挂载在创建的div上
    // 并将此div加入全局挂载点内部
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    // 通过Vue的原型注册一个方法
    // 让所有实例共享这个方法
    Vue.prototype.$showToast = (params: ShowToastParams) => {
      const info = {
        type: 'suc',
        text: ['已成功'],
        showTime: 2000
      }
      const resultParams = Object.assign({}, info, params)
      instance.type = resultParams.type
      instance.text = resultParams.text
      instance.showTime = resultParams.showTime
      instance.show()
    }

    Vue.prototype.$hideToast = () => {
      instance.isShow = false
      instance.text = []
    }
  }
}
export default Obj
