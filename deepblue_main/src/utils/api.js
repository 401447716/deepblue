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
  }
}