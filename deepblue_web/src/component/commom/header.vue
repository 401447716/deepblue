<template>
  <div>
    <el-menu
      class="el-menu-demo menu-top"
      mode="horizontal"
      @select="handleSelect"
      background-color="#242F42"
      text-color="#fff"
    >
      <p>深蓝学习系统</p>
      <div class="full"></div>
      <template v-if="name !== ''">
        <el-submenu index="1">
          <template slot="title">欢迎，{{name}}</template>
          <el-menu-item index="2-1" @click="quit">退出</el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item class="login" index="2" @click="openLogin">登录</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { locationStorageTools } from '@/common/utils'
import bus from '@/component/bus'
export default {
  name: 'Header',
  data () {
    return {
      collapse: false,
      name: ''
    }
  },
  mounted () {
   let location = locationStorageTools.get('deepblue_user')
   if (location !== null) {
      this.$store.dispatch('upVuex', {
        mutations: 'setUserInfo',
        value: {
          account: location.account,
          password: location.password
        }
      })
      this.name = location.name
      this.$emit('login', {
        account: location.account,
        password: location.password
      })
    }
    bus.$on('loginSuccess', () => {
      this.name = this.$store.getters.getUserInfo.name || this.$store.getters.getUserInfo.account
    })
  },
  methods: {
    handleSelect (key, keyPath) {
    },
    openLogin () {
      bus.$emit('openLogin')
    },
    quit () {
      this.name = ''
      this.$store.dispatch('upVuex', {
        mutations: 'setUserInfo',
        value: {
          icon: '',
          name: '',
          account: '',
          password: ''
        }
      })
      locationStorageTools.clear('deepblue_user')
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  p {
    color: #FFF;
    font-size: 24px;
    margin-left: 20px;
  }
  .login {
    color: #FFF !important;
  }
  .full {
    flex: 1;
  }
}
</style>

