<template>
  <div class="siderbar">
    <!-- 头像及频道ID -->
    <div class="userInfoBox">
      <div class="userInfo">
        <div class="el-icon-user userIcon">
          <img v-if="icon !== null" :src="icon">
        </div>
      </div>
    </div>
    <el-menu
      class="menu-left"
      :default-active="onRoutes"
      @select="handleSelect"
      text-color="#333333"
      active-text-color="#000">
      <!-- 页面列表 -->
      <template v-for="(item, index) in navList">
        <template >
          <el-menu-item
            v-if=!item.childOpt
            :index='`/${item.path}`'
            :key=index
            :class="{ activeItem: onRoutes === `/${item.path}` }">
            <span class="icon"></span>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <el-submenu v-else :index=item.name :key=index>
            <template slot="title">
              <i :class=item.icon></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(item2, index2) in item.childOpt"
                :key='`${index}-${index2}`'
                :index='`/${item2.path}`'
                :class="{ activeItem: onRoutes === `/${item2.path}` }">
                {{item2.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import list from '@/component/navList'
import bus from '@/component/bus'

export default {
  name: 'Sidebar',
  data () {
    return {
      navList: list
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path
    },
    icon () {
      return this.$store.getters.getUserInfo.icon || null
    }
  },
  mounted () {
    bus.$on('registNav', iframelist => {
      let l = JSON.parse(JSON.stringify(list))
      for (let item of iframelist) {
        l.push({
          icon: 'el-icon-location',
          name: item.name,
          path: item.path
        })
      }
      this.navList = l
    })
  },
  methods: {
    // 切换一级页面
    handleSelect (key, keyPath) {
      this.$router.push({
        path: key
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.siderbar {
  position: absolute;
  top: 75px;
  left: 15px;
  height: calc(100% - 75px);
  width: 200px;
  background-color: #FFF;
  .userInfoBox {
    position: absolute;
    width: 200px;
    height: 160px;
    border-right: solid 1px #e6e6e6;
    .userInfo {
      width: 150px;
      height: 160px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #efefef;
      .userIcon {
        position: relative;
        font-size: 50px;
        height: 100px;
        width: 100px;
        margin-bottom: 10px;
        border-radius: 100px;
        text-align: center;
        line-height: 100px;
        img {
          position: absolute;
          border-radius: 100px;
          height: 100px;
          width: 100px;
          left: 0;
          top: 0;
        }
      }
    }
  }
  .menu-left {
    position: absolute;
    left: 0;
    top: 160px;
    height: calc(100% - 160px);
    width: 200px;
    padding-top: 15px;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    .icon {
      display: inline-block;
      height: 20px;
      width: 20px;
      background-color: #cccccc;
      border-radius: 4px;
      margin-right: 5px;
    }
  }
}

</style>
