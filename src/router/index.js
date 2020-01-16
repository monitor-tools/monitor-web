import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/Index'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    hidden: true
  },
  {
    path: '/redis',
    component: Layout,
    hidden: true,
    children:[
      {
        path: 'list',
        component: () => import('@/views/redis/list/List'),
        name: 'list'
      },
      {
        path: 'infos/:id',
        component: () => import('@/views/redis/info/Info'),
        props:true,
        name: 'infos'
      },
      {
        path: 'echats/:id',
        component: () => import('@/views/redis/echarts/Echarts'),
        props:true,
        name: 'echats'
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router