import Vue from 'vue'
import store from '@/component/vuex'
import ElementUI from 'element-ui'
import '@/css/theme/element-variables.scss'
import App from '@/view/App'
import deepblueApi from '@/common/deepblueApi'
import '@/api/jquery_3.5.1'

Vue.use(ElementUI, { size: 'small' })
deepblueApi(store)

function init () {
  new Vue({ // eslint-disable-line
    el: '#app',
    store: store,
    render: h => h(App)
  })
}

init()
