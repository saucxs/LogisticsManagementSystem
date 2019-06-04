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
import transportCollect from '@/views/transportCollect'
import transportUser from '@/views/transportUser'

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
        key: '1'
      }
    },
    {
      path: "/activate/:code",
      component: activate,
      meta: {
        zhName: '激活',
        key: '2'
      }
    },
    {
      path: '/',
      name: 'layout',
      isNest: false,
      meta: {
        zhName: '概览',
        key: '3',
        role: 1
      },
      component: layout,
      children: [{
        path: '/home',
        name: 'home',
        icon: 'el-icon-view',
        meta: {
          zhName: '概览',
          key: '3-1',
          role: 1
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
        key: '4',
        role: 1
      },
      component: layout,
      children: [{
        path: '/manage/order',
        name: 'home',
        icon: 'el-icon-goods',
        meta: {
          zhName: '订单统计',
          key: '4-1',
          role: 1
        },
        component: orderCollect
      }]
    },
    {
      path: '/manage',
      name: 'layout',
      isNest: false,
      meta: {
        zhName: '运输单统计',
        key: '5',
        role: 1
      },
      component: layout,
      children: [{
        path: '/manage/transport',
        name: 'home',
        icon: 'el-icon-tickets',
        meta: {
          zhName: '运输单统计',
          key: '5-1',
          role: 1
        },
        component: transportCollect
      }]
    },
    {
      path: '/admin',
      name: 'layout',
      isNest: true,
      meta: {
        zhName: '管理员管理',
        key: '6',
        role: 1
      },
      component: layout,
      children: [{
        path: '/order',
        name: 'order',
        icon: 'el-icon-view',
        meta: {
          zhName: '订单管理',
          key: '6-1',
          role: 1
        },
        component: order
      },{
        path: '/transport',
        name: 'transport',
        icon: 'el-icon-view',
        meta: {
          zhName: '运输任务管理',
          key: '2-2',
          role: 1
        },
        component: transport
      },{
        path: '/store',
        name: 'store',
        icon: 'el-icon-location-outline',
        meta: {
          zhName: '仓库管理',
          key: '6-2',
          role: 1
        },
        component: store
      },{
        path: '/team',
        name: 'team',
        icon: 'el-icon-view',
        meta: {
          zhName: '人员管理',
          key: '6-3',
          role: 1
        },
        component: team
      },{
        path: '/car',
        name: 'car',
        icon: 'el-icon-view',
        meta: {
          zhName: '车辆管理',
          key: '6-4',
          role: 1
        },
        component: car
      }]
    },
    {
      path: '/',
      name: 'layout',
      isNest: false,
      meta: {
        zhName: '概览',
        key: '3',
        role: 2
      },
      component: layout,
      children: [{
        path: '/home',
        name: 'home',
        icon: 'el-icon-view',
        meta: {
          zhName: '概览',
          key: '3-1',
          role: 2
        },
        component: home
      }]
    },
    {
      path: '/manage',
      name: 'layout',
      isNest: false,
      meta: {
        zhName: '仓库管理',
        key: '5-1-1',
        role: 2
      },
      component: layout,
      children: [{
        path: '/store',
        name: 'store',
        icon: 'el-icon-location-outline',
        meta: {
          zhName: '仓库管理',
          key: '5-1-2',
          role: 2
        },
        component: store
      }]
    },
    {
      path: '/manage',
      name: 'layout',
      isNest: false,
      meta: {
        zhName: '运输单统计',
        key: '5',
        role: 3
      },
      component: layout,
      children: [{
        path: '/manage/transport',
        name: 'home',
        icon: 'el-icon-tickets',
        meta: {
          zhName: '运输单统计',
          key: '5-1',
          role: 3
        },
        component: transportCollect
      }]
    },
    {
      path: '/manage',
      name: 'layout',
      isNest: false,
      meta: {
        zhName: '车辆管理',
        key: '5-1-3',
        role: 3
      },
      component: layout,
      children: [{
        path: '/car',
        name: 'store',
        icon: 'el-icon-bell',
        meta: {
          zhName: '车辆管理',
          key: '5-1-4',
          role: 3
        },
        component: car
      }]
    },
    {
      path: '/transport',
      name: 'layout',
      isNest: false,
      meta: {
        zhName: '运输单申请',
        key: '7',
        role: 3
      },
      component: layout,
      children: [{
        path: '/transport/apply',
        name: 'transport',
        icon: 'el-icon-edit-outline',
        meta: {
          zhName: '运输单申请',
          key: '7-1',
          role: 3
        },
        component: transport
      }]
    },
    {
      path: '/manage',
      name: 'layout',
      isNest: false,
      meta: {
        zhName: '运输单统计',
        key: '5',
        role: 4
      },
      component: layout,
      children: [{
        path: '/manage/transport',
        name: 'home',
        icon: 'el-icon-tickets',
        meta: {
          zhName: '运输单统计',
          key: '5-1',
          role: 4
        },
        component: transportCollect
      }]
    },
    {
      path: '/transport',
      name: 'layout',
      isNest: false,
      meta: {
        zhName: '运输单申请',
        key: '7',
        role: 4
      },
      component: layout,
      children: [{
        path: '/transport/apply',
        name: 'transport',
        icon: 'el-icon-edit-outline',
        meta: {
          zhName: '运输单申请',
          key: '7-1',
          role: 4
        },
        component: transport
      }]
    },
    {
      path: '/person',
      name: 'layout',
      isNest: false,
      meta: {
        zhName: '个人订单查询',
        key: '8',
        role: 5
      },
      component: layout,
      children: [{
        path: '/person/order/query',
        name: 'transport',
        icon: 'el-icon-search',
        meta: {
          zhName: '个人订单查询',
          key: '8-1',
          role: 5
        },
        component: transportUser
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
