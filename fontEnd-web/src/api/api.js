"use strict";
// 引入vue和axios
import Vue from "vue";
import axios from "axios";
import router from '../router'

// 继承vue的原型方法
Vue.prototype.axios = axios;

const service = axios.create({
  baseURL: '/api/logistics/',
  // baseURL: 'http://chat.chengxinsong.cn',
  timeout: 10000
})

service.interceptors.request.use(config => {
  const token = localStorage.getItem('HappyChatUserToken');
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
          /*返回401，清空token信息，关闭socketio，并跳转到登陆页*/
          let userInfo = JSON.parse(localStorage.getItem("HappyChatUserInfo"));
          socketWeb.emit('logout', userInfo.user_id)
          localStorage.removeItem("HappyChatUserToken");
          localStorage.removeItem("HappyChatUserInfo");
          setTimeout(function() {
            router.push({
              path: "/login",
              query: {redirect: router.currentRoute.fullPath}
            });
          }, 500);
        case 504:
          /*后端服务器关闭的时候*/
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
      // console.log('我断网了');
      // console.log(Loading, '----------------')
      // Loading.installed = true;
      // Loading.$loading.show();
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
  }
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