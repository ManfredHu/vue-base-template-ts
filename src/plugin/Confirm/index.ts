import index from './index.vue'

interface ShowConfirmParams {
  isShow: Boolean
  title: String
  desc: String
  lBtnShow: Boolean
  rBtnShow: Boolean
  lBtnText: String
  rBtnText: String
  lBtnEvent: Function
  rBtnEvent: Function
  zIndex: Number
  lBtnStyle: Object
  rBtnStyle: Object
  iconLink: String
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
    Vue.prototype.$showConfirm = (params: ShowConfirmParams) => {
      const info = {
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
        iconLink: ''
      }
      const resultParams: any = Object.assign({}, info, params)
      for (const i in resultParams) {
        instance[i] = resultParams[i]
      }
      instance.show()
    }

    Vue.prototype.$hideConfirm = () => {
      instance.hide()
    }
  }
}
export default Obj
