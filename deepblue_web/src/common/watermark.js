let watermark = {}

let setWatermark = (str, boxID) => {
  let id = 'ws123_1'
  let id2 = 'ws123_2'
  if (document.getElementById(id) !== null) {
    document.getElementById(boxID).removeChild(document.getElementById(id))
  }
  if (document.getElementById(id2) !== null) {
    document.getElementById(boxID).removeChild(document.getElementById(id2))
  }

  let can = document.createElement('canvas')
  can.width = 320
  can.height = 150

  let cans = can.getContext('2d')
  cans.rotate(-15 * Math.PI / 180)
  cans.font = '14px Vedana'
  cans.fillStyle = 'rgba(185,185,185,0.4)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(str, can.width / 16, can.height / 2)

  let div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '-15px'
  div.style.left = '-70px'
  div.style.position = 'absolute'

  let div2 = document.createElement('div')
  div2.id = id2
  div2.style.pointerEvents = 'none'
  div2.style.top = '70px'
  div2.style.left = '90px'
  div2.style.position = 'absolute'

  let box = document.getElementById(boxID)
  let clientWidth = box.clientWidth
  let clientHeight = box.clientHeight
  let background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  div.style.width = clientWidth + 200 - 10 + 'px'
  div.style.height = clientHeight + 'px'
  div.style.background = background
  div2.style.width = clientWidth + 200 - 10 - 160 + 'px'
  div2.style.height = clientHeight - 90 + 'px'
  div2.style.background = background
  box.insertBefore(div, box.children[0])
  box.insertBefore(div2, box.children[0])
  // box.appendChild(div)
  return { id, id2 }
}
let chawstr = '频道ID'
// 该方法只允许调用一次
watermark.set = (channelId, boxID = 'main-box') => {
  chawstr = `频道ID ${channelId}`
  let id = setWatermark(chawstr, boxID)
  setInterval(() => {
    if (document.getElementById(id.id) === null) {
      id = setWatermark(chawstr, boxID)
    }
    if (document.getElementById(id.id2) === null) {
      id = setWatermark(chawstr, boxID)
    }
  }, 500)
  window.onresize = () => {
    setWatermark(chawstr, boxID)
  }
}

export default watermark
