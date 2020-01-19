export default () => {
  /**
   * local file method, using dynamic imports, see https://webpack.docschina.org/guides/code-splitting
   */

  if (
    !/debug=vconsole/.test(window.location.search) &&
    !/vconsole=true/.test(window.location.search)
  )
    return
  // using webapck split chunk and rename async.vconsole.[hashName].js
  import(/* webpackChunkName: "vconsole" */ 'vconsole').then(VConsole => {
    let vc = null
    if (typeof VConsole.default === 'function') {
      vc = new VConsole.default()
    } else {
      // @ts-ignore
      vc = new VConsole()
    }
    // eslint 不输出会告警，我也是醉了这个new VConsole,并没有用到这个变量
    console.log('<vconsole> vconsole start suc', vc)
  })
}
