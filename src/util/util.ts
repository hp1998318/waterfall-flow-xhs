// export function throttle(fn: Function) {
//   let lock = false;
//   return function (this: any, ...args: any[]) {
//     if (lock) return;
//     lock = true;
//     window.requestAnimationFrame(() => {
//       fn.apply(this, args);
//       lock = false;
//     });
//   };
// }
export function throttle(fn: any, delay = 5000) {
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
