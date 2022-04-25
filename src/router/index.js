import Vue from 'vue'
import VueRouter from 'vue-router'
import Empty from '../views/Empty'
import Layout from '../views/Layout'
import Home from '../Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Empty,
    name: 'Index',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/preview',
        name: 'Preview',
        component: () => import('../views/Preview'),
      },
    ]
  }
]

export default new VueRouter({
  // base: '/',
  // scrollBehavior: () => ({ y: 0 }),
  routes
})