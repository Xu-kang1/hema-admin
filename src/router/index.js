import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/views/login/login'], resolve)
const Cardealer = resolve => require(['../views/Cardealer/cardealer'], resolve)
const CarList = resolve => require(['../views/CarList/carList'], resolve)
const Credit = resolve => require(['../views/Credit/credit'], resolve)
const Agency = resolve => require(['../views/Agency/agency'], resolve)
const Main = resolve => require(['@/views/main'], resolve)
const Query = resolve => require(['../views/Query/query'], resolve)
const Deload = resolve => require(['../views/Deload/deload'], resolve)
// import Content from '@/components/Content'
// import Login from '@/views/login/login'
// import Cardealer from '../views/Cardealer/cardealer'
// import CarList from '../views/CarList/carList'
// import Credit from '../views/Credit/credit'
// import Agency from '../views/Agency/agency'
// import Main from '@/views/main'
// import Query from '../views/Query/query'
// import Deload from '../views/Deload/deload'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      meta: {
        requireAuth: true
      },
      component: Main,
      children: [{
        path: 'cardealer',
        component: Cardealer
      },
      {
        path: 'carList',
        component: CarList
      },
      {
        path: 'credit',
        component: Credit
      },
      {
        path: 'deload',
        component: Deload
      },
      {
        path: 'agency',
        component: Agency
      },
      {
        path: 'query',
        component: Query
      }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
export default router
