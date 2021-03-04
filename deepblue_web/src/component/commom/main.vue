<template>
  <div>
    <Sidebar/>
    <Header @login='beginLogin'/>
    <Login @login='beginLogin'/>
    <div id='main-box' class="main-contain-box">
      <div class="main-content">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './header'
import Sidebar from './sidebar'
import Login from '../login/index.vue'
import Api from '@/api/user'
import bus from '@/component/bus'
import ActivePage from '@/view/activePage/index.vue'
import Test from '@/view/channelIdTest/index.vue'
import { locationStorageTools } from '@/common/utils'

export default {
  name: 'Main',
  data () {
    return {
    }
  },
  components: {
    Header,
    Sidebar,
    Login
  },
  mounted () {
  },
  methods: {
    beginLogin (val) {
      this.login(val.account, val.password, val.save)
    },
    login (account, password, save) {
      if (account === '' || password === '') {
        this.$message.error('请输入账号和密码')
        return
      }
      Api.login(account, password).then(
        res => {
          if (!res.result) {
            console.log(res)
            this.$store.dispatch('upVuex', {
              mutations: 'setUserInfo',
              value: {
                icon: res.data.icon,
                name: res.data.name,
                account,
                password
              }
            })
            if (save) {
              locationStorageTools.set('deepblue_user', {
                icon: res.data.icon,
                name: res.data.name,
                account,
                password
              })
            }
            this.registRouter(res.data.view)
            bus.$emit('loginSuccess')
            bus.$emit('registNav', res.data.view)
          } else {
            this.$message.error(res.msg)
          }
        }
      )
    },
    registRouter (list) {
      for (let item of list) {
        this.$router.addRoute('Main', {
          path: item.path,
          component: ActivePage,
          meta: { iframepath: item.iframepath }
        })
      }
    }
  }
}
</script>

<style>
.main-contain-box {
  position: absolute;
  left: 215px;
  right: 0;
  top: 75px;
  bottom: 0;
  padding: 0 15px 15px 15px;
  background: #f1f2f4;
  overflow-x: hidden;
  overflow-y: auto;
}
.main-content {
  position: relative;
  height: 100%;
  background-color: #FFF;
}
</style>
