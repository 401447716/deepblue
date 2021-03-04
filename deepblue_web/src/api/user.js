import request from './webApi'
export default {
  login (account, password) {
    return request({
      url: 'login',
      data: {
        account,
        password
      }
    })
  },
  regist (account, password) {
    return request({
      url: 'regist',
      data: {
        account,
        password
      }
    })
  }
}
