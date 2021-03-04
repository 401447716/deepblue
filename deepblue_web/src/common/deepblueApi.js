const p = {
  vuex: null
}
function request (opt) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://${opt.domain || '127.0.0.1:7001'}/${opt.url}`,
      data: opt.data || null,
      type: opt.type || 'GET',
      dataType: opt.dataType || 'JSON',
      contentType: opt.contentType || 'application/json',
      success: function (res) {
        resolve(res)
      }
    })
  })
}

function getVuexGetters () {
  if (p.vuex) {
    return JSON.parse(JSON.stringify(p.vuex.getters))
  } else {
    return ''
  }
}

function execute(data) {
  return new Promise((resolve, reject) => {
    if (data.module === 'vuex') {
      resolve(getVuexGetters())
    } else if (data.module === 'send') {
      request(data).then(
        res => {
          resolve(res)
        }
      )
    } else {
      resolve('Error Module')
    }
  })
}

export default function deepblueApi (Vuex) {
  p.vuex = Vuex
  window.addEventListener('message', function (e) {
    if (location.origin !== e.origin) {
      execute(e.data.data).then(
        res => {
          document.getElementById('myIframe').contentWindow.postMessage({
            data: res,
            callbackid: e.data.callBack
          }, '*')
        }
      )
    }
  }, false)
}
