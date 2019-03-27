export function felterMobile (str) {
  let a = str.slice(0, 3)
  let b = str.slice(-3)
  return a + '****' + b
}
