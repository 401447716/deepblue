const callbacks = {}
let key = 1
window.addEventListener("message", function(e) {
  if (location.origin !== e.origin) {
    callbacks[e.data.callbackid](e.data.data)
    delete callbacks[e.data.callbackid]
  }
})

function sendMessage(data, callback) {
  callbacks[key] = callback
  window.parent.postMessage({
    data,
    callBack: key++
  }, '*');
}

export function request (opt) {
  return new Promise((resolve, reject) => {
    sendMessage({
      module: 'send',
      url: opt.url,
      data: opt.data || null,
      type: opt.type || 'GET',
    }, resolve)
  })
}

export function getVuex () {
  return new Promise((resolve, reject) => {
    sendMessage({
      module: 'vuex'
    }, resolve)
  })
}