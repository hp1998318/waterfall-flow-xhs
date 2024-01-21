export function throttle(fn: Function, delay: number) {
  let flag = true
  return function(this: any ,...args: any) {
    if (!flag) return;
    flag = false
    setTimeout(() => {
      fn.call(this, ...args);
      flag = true
    }, delay);
  }
}
