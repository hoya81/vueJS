import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import About from '@/views/About'
import store from '@/store/store'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    { path: '*', component: Main }
  ]
})
router.beforeEach((to, from, next) => {
  if(store.state.isMovePage)return;
  next();
})

export default router
