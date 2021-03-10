import { request, getVuex } from './postApi'
export default {
  getUser () {
    return getVuex()
  },
  getType () {
    return request({
      url: 'getType'
    })
  },
  getLabel (type_id) {
    return request({
      url: 'getLabel?type=' + type_id,
    })
  },
  addLabel (type, label) {
    return request({
      url: `addLabel?type=${type}&label=${label}`,
    })
  },
  addCourse (data) {
    return request({
      url: 'addCourse',
      type: 'POST',
      data: JSON.stringify(data)
    })
  },
  addTopic (data) {
    return request({
      url: 'addTopic',
      type: 'POST',
      data: JSON.stringify(data)
    })
  },
  delTopic (id) {
    return request({
      url: 'delTopic',
      data: {
        id
      }
    })
  },
  getMyTopic (account, type, name) {
    return request({
      url: 'getTopic',
      data: {
        account,
        type,
        name
      }
    })
  },
  getTopic (type, name) {
    return request({
      url: 'getTopic',
      data: {
        type,
        name
      }
    })
  },
  getTopicDetail (id) {
    return request({
      url: 'getTopicDetail',
      data: {
        id
      }
    })
  },
  receiveTopic (data) {
    return request({
      url: 'receiveTopic',
      type: 'POST',
      data: JSON.stringify(data)
    })
  }
}