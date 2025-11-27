function u(e: Date) {
  let t
  return (function (e) {
    return s(d()) + s(e) + s(d()) + s(d())
  })(
    ((t = l(
      (t = (function (e) {
        return Math.floor(e.getTime() / 1e3) - 1577804400
      })(e)),
      2967816889,
    )),
    (t = l(
      (t = (function (e) {
        return (e
          = (((e
            = (((e
              = (((e
                = (((e = ((e >> 1) & 1431655765) | ((1431655765 & e) << 1))
                  >> 2)
                & 858993459)
              | ((858993459 & e) << 2))
            >> 4)
          & 252645135)
        | ((252645135 & e) << 4))
      >> 8)
    & 16711935)
  | ((16711935 & e) << 8))
>> 16)
& 65535)
| ((65535 & e) << 16))
      })(t)),
      4009073545,
    ))),
  )
}
function d() {
  return Math.floor(1073741823 * Math.random()) + 1073741824
}
function l(e: number, t: number) {
  const n = 65535 & e
  const a = 65535 & t
  const o = n * a
  return (
    (((((o >> 16) & 65535)
      + ((((e >> 16) & 65535) * a) & 65535)
      + ((n * ((t >> 16) & 65535)) & 65535))
    & 65535)
  << 16)
| (65535 & o)
  )
}
function s(e: number) {
  return (
    (`000${((e >> 16) & 65535).toString(16)}`).slice(-4)
    + (`000${(65535 & e).toString(16)}`).slice(-4)
  )
}

export default u
