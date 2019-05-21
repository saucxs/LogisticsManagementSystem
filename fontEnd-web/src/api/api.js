"use strict";
// 引入vue和axios
import Vue from "vue";
import axios from "axios";
import router from '../router'
import { MessageBox } from 'element-ui'

// 继承vue的原型方法
Vue.prototype.axios = axios;

const service = axios.create({
  baseURL: '/api/logistics/',
  // baseURL: 'http://chat.chengxinsong.cn',
  timeout: 10000
})

service.interceptors.request.use(config => {
  const token = localStorage.getItem('LogisticsManagementSystemUserToken');
  if (token) {
    /*Bearer是JWT的认证头部信息*/
    config.headers.common['Authorization'] = 'Bearer ' + token;
  }
  return config;
},error => {
  return Promise.reject(error);
});

service.interceptors.response.use(
  response => {
    let data = response.data;
    if (!data.data) {
      //   登陆成功的回调地址
      return data;
    } else {
      return data;
    }
  },
  error => {
    if(error.response) {
      switch (error.response.status){
        case 401:
          /* 返回401，清空token信息，并跳转到登陆页 */
          localStorage.removeItem("LogisticsManagementSystemUserToken");
          localStorage.removeItem("LogisticsManagementSystemUserInfo");
          setTimeout(function() {
            router.push({
              path: "/login",
              query: {redirect: router.currentRoute.fullPath}
            });
          }, 500);
        case 504:
          /* 后端服务器关闭的时候 */
          MessageBox.confirm('服务器暂时开了小差，请稍后重试','提示',{
            confirmButtonText:'重新连接',
            type:'warning',
            center: true,
            showClose: false,
            showCancelButton: false,
            closeOnClickModal: false,
          }).then(()=>{
            console.log('服务器关闭了');
            window.location.reload();
          })
      }
    } else if (!error.response) {
      /*断网*/
      MessageBox.confirm('您现在处于无网的状态，请确定网络正常后重试','提示',{
        confirmButtonText:'重新连接',
        type:'warning',
        center: true,
        showClose: false,
        showCancelButton: false,
        closeOnClickModal: false,
      }).then(()=>{
        console.log('我断网了');
        window.location.reload();
      })
    }
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  }
);

export default {
  /* 登陆 - post */
  login: params => {
    return service.post("/login", params);
  },
  /* 注册-未激活 - post */
  register: params => {
    return service.post("/register", params);
  },
  /* 注册-激活 - get */
  activateEmail: (params) => {
    let data = { params: params };
    return service.get("/activate", data)
  },
  /* 分类数据大盘 - get */
  categoryData: (params) => {
    let data = { params: params };
    return service.get("/categoryData", data)
  },
  /* 分类数据订单 - get */
  categoryOrder: (params) => {
    let data = { params: params };
    return service.get("/categoryOrder", data)
  },
  /* 获取订单列表 - get */
  getOrderList: (params) => {
    let data = { params: params };
    return service.get("/orderList", data)
  },
  /*获取订单的select项*/
  getOrderListMap: (params) => {
    let data = { params: params };
    return service.get("/orderListMap", data)
  },
  /* 新增订单 post */
  addOrder: (params) => {
    return service.post("/addOrder", params)
  },
  /* 删除订单 post */
  deleteOrder: (params) => {
    return service.post("/deleteOrder", params)
  },
  /*运输任务*/
  /* 分类数据运输单 - get */
  categoryTransport: (params) => {
    let data = { params: params };
    return service.get("/categoryTransport", data)
  },
  /* 获取运输单列表 - get */
  getTransportList: (params) => {
    let data = { params: params };
    return service.get("/transportList", data)
  },
  /* 新增订单 post */
  addTransport: (params) => {
    return service.post("/addTransport", params)
  },
  /* 删除订单 post */
  deleteTransport: (params) => {
    return service.post("/deleteTransport", params)
  },

  /*仓库*/
  /* 获取仓库列表 - get */
  getStoreList: (params) => {
    let data = { params: params };
    return service.get("/storeList", data)
  },
  /* 新增仓库 post */
  addStore: (params) => {
    return service.post("/addStore", params)
  },
  /* 删除仓库 post */
  deleteStore: (params) => {
    return service.post("/deleteStore", params)
  },
  /*获取仓库的select项*/
  getStoreListMap: (params) => {
    let data = { params: params };
    return service.get("/storeListMap", data)
  },
  /*获取城市的select项*/
  getCityListMap: (params) => {
    let data = { params: params };
    return service.get("/cityListMap", data)
  },

  /*车辆*/
  /* 获取汽车列表 - get */
  getCarList: (params) => {
    let data = { params: params };
    return service.get("/carList", data)
  },
  /* 新增仓库 post */
  addCar: (params) => {
    return service.post("/addCar", params)
  },
  /* 删除仓库 post */
  deleteCar: (params) => {
    return service.post("/deleteCar", params)
  },
  /*获取汽车的select项*/
  getCarListMap: (params) => {
    let data = { params: params };
    return service.get("/carListMap", data)
  },

  /*人员*/
  /* 获取人员列表 - get */
  getTeamList: (params) => {
    let data = { params: params };
    return service.get("/teamList", data)
  },
  /* 新增人员 post */
  addTeam: (params) => {
    return service.post("/addTeam", params)
  },
  /* 删除人员 post */
  deleteTeam: (params) => {
    return service.post("/deleteTeam", params)
  },
  /*获取人员的select项*/
  getTeamListMap: (params) => {
    let data = { params: params };
    return service.get("/teamListMap", data)
  },


  /*用户查询*/
  getPersonalTransportList: (params) => {
    let data = { params: params };
    return service.get("/personTransportList", data)
  },
  /**
   * API demo
   *
   * getAPI: (params) => {
   *    getConfig.params = params.params
   *    return axios.get('xxxx.do', getConfig)
   * }
   *
   * postAPI: (params) => {
   *     return axios.post('xxxx.do', params, postConfig)
   * }
   */

}
