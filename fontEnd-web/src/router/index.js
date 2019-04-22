import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import activate from '@/views/activate'
import register from '@/views/register'
import layout from '@/views/layout'
import home from '@/views/home'

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
