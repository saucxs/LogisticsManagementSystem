import {
    USER_INFO
} from "../mutation-types.js";

const state = {
  systemName: 'XXX系统',
  userInfo: JSON.parse(localStorage.getItem('LogisticsManagementSystemUserInfo'))
};

const mutations = {
  [USER_INFO](state,newData){
    state.userInfo = newData;
  }
}

export default {
  state,
  mutations
}
