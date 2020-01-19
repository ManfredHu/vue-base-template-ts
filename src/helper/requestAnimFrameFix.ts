import debug from 'debug'
const log = debug('worker:requestAniFix')

function requestAnimFrameFix() {
  log('requestAnimFrameFix')
  window.requestAnimFrame = (() => {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function _requestAnimFrame(callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    )
  })()
}
export default requestAnimFrameFix
