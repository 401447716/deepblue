import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '@/view/channelIdTest/index.vue'
// 主入口
import Main from '@/component/commom/main.vue'
Vue.use(VueRouter)

const homeRouter = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'channelidtest',
          component: Test
        },
        {
          path: '/',
          redirect: 'channelidtest'
        }
      ]
    },
    {
      path: '*',
      component: Main,
    }
  ]
})

homeRouter.beforeEach((to, from, next) => {
  next()
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default homeRouter
