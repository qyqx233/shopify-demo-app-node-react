// for (let i = 0; i < 5; i++) {
//   setTimeout(function () {
//     console.log(i);
//   }, 1000 * i);
// }
// console.log(i)

function fn() {
  var a = { count: 0 };
  function fx() {
    return a
  }
  return fx;
}
var result = fn()
let aa = result()
console.log(aa)
aa.count++
result = fn()
aa = result()
console.log(aa)