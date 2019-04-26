import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import activate from '@/views/activate'
import register from '@/views/register'
import layout from '@/views/layout'
import home from '@/views/home'
import store from '@/views/store'
import team from '@/views/team'
import order from '@/views/order'
import car from '@/views/car'
import transport from '@/views/transport'
import orderCollect from '@/views/orderCollect'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: "/login",
      component: login,
      meta: {
        zhName: '登陆',
        key: '0'
      }
    },
    {
      path: "/register",
      component: register,
      meta: {
        zhName: '注册',
        key: '0'
      }
    },
    {
      path: "/activate/:code",
      component: activate,
      meta: {
        zhName: '激活',
        key: '0'
      }
    },
    {
      path: '/',
      name: 'layout',
      isNest: false,
      meta: {
        zhName: '概览',
        key: '1',
        role: 3
      },
      component: layout,
      children: [{
        path: '/home',
        name: 'home',
        icon: 'el-icon-view',
        meta: {
          zhName: '概览',
          key: '1-1',
          role: 3
        },
        component: home
      }]
    },
    {
      path: '/manage',
      name: 'layout',
      isNest: false,
      meta: {
        zhName: '订单统计',
        key: '1-10',
        role: 3
      },
      component: layout,
      children: [{
        path: '/manage/order',
        name: 'home',
        icon: 'el-icon-goods',
        meta: {
          zhName: '订单统计',
          key: '1-11',
          role: 3
        },
        component: orderCollect
      }]
    },
    {
      path: '/admin',
      name: 'layout',
      isNest: true,
      meta: {
        zhName: '管理员管理',
        key: '2',
        role: 3
      },
      component: layout,
      children: [{
        path: '/order',
        name: 'order',
        icon: 'el-icon-view',
        meta: {
          zhName: '订单管理',
          key: '2-1',
          role: 3
        },
        component: order
      },{
        path: '/transport',
        name: 'transport',
        icon: 'el-icon-view',
        meta: {
          zhName: '运输任务管理',
          key: '2-2',
          role: 3
        },
        component: transport
      },{
        path: '/store',
        name: 'store',
        icon: 'el-icon-view',
        meta: {
          zhName: '仓库管理',
          key: '2-3',
          role: 3
        },
        component: store
      },{
        path: '/team',
        name: 'team',
        icon: 'el-icon-view',
        meta: {
          zhName: '人员管理',
          key: '2-4',
          role: 3
        },
        component: team
      },{
        path: '/car',
        name: 'car',
        icon: 'el-icon-view',
        meta: {
          zhName: '车辆管理',
          key: '2-5',
          role: 3
        },
        component: car
      }]
    }
  ]
})

/* 路由白名单 */
let whiteRouter = ["/login", "/register", "/activate"]

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  let flag = whiteRouter.some(item => {
    if (to.path.indexOf(item) >= 0){
      return true
    }
  })
  if (!localStorage.LogisticsManagementSystemUserToken) {
    if (flag) {
      next()
    } else {
      next("/login");
    }
  } else {
    if (flag) {
      next("/home");
    } else {
      next();
    }
  }
});

export default router;
