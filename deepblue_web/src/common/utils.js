export const locationStorageTools = (function (params) {
  let tools = {}
  tools.set = (key, value) => {
    let v = value
    if (typeof v === 'object') {
      v = JSON.stringify(v)
      v = 'obj-' + v
    }
    window.localStorage.setItem(key, v)
    return true
  }
  tools.get = (key) => {
    var v = window.localStorage.getItem(key)
    if (!v) {
      return null
    }
    if (v.indexOf('obj-') === 0) {
      return JSON.parse(v.slice(4))
    } else {
      return v
    }
  }
  tools.clear = (key) => {
    window.localStorage.removeItem(key)
    return true
  }
  return tools
})()

export const getCookie = (name) => {
  let arr
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) {
    // return unescape(arr[2]) // unescape已废弃
    return decodeURIComponent(arr[2])
  } else {
    return null
  }
}

export const isLogin = () => !!getCookie('username')
