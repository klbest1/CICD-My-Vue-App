import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  }, {
    path: '/goodsList',
    name: 'goodsList',
    component: () => import(/* webpackChunkName: "goods-list" */ '../views/GoodsList.vue')
  }, {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: () => import(/* webpackChunkName: "goods-detail" */ '../views/GoodsDetail.vue')
  }, {
    path: '/Buy',
    name: 'Buy',
    component: () => import(/* webpackChunkName: "goods-Buy" */ '../views/Buy.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
