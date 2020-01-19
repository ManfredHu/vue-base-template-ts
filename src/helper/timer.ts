const timeoutArr: any = []
const intervalArr: any = []

export function setTimeout() {
  // @ts-ignore
  const timer = window.setTimeout(...arguments)
  timeoutArr.push(timer)
  return timer
}

export function setInterval() {
  // @ts-ignore
  const timer = window.setInterval(...arguments)
  intervalArr.push(timer)
  return timer
}

export function destory() {
  timeoutArr.forEach((item: any) => clearTimeout(item))
  intervalArr.forEach((item: any) => clearInterval(item))
}

export function logTimer() {
  console.log('timeoutArr', timeoutArr)
  console.log('intervalArr', intervalArr)
}
