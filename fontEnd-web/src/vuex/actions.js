import Api from "../api/api";
import * as types from "./mutation-types";

// login
export const login = ({ commit }, params) => {
  return Api.login(params).then(response => {
    return response;
  })
}

// register
export const register = ({ commit }, params) => {
  return Api.register(params).then(response => {
    return response;
  })
}

// activateEmail
export const activateEmail = ({ commit }, params) => {
  return Api.activateEmail(params).then(response => {
    return response;
  })
}

// orderList
export const getOrderList = ({ commit }, params) => {
  return Api.getOrderList(params).then(response => {
    return response;
  })
}

// add Order
export const addOrder = ({ commit }, params) => {
  return Api.addOrder(params).then(response => {
    return response;
  })
}

// delete Order
export const deleteOrder = ({ commit }, params) => {
  return Api.deleteOrder(params).then(response => {
    return response;
  })
}

// transport List
export const getTransportList = ({ commit }, params) => {
  return Api.getTransportList(params).then(response => {
    return response;
  })
}


// storeList
export const getStoreList = ({ commit }, params) => {
  return Api.getStoreList(params).then(response => {
    return response;
})
}

// add store
export const addStore = ({ commit }, params) => {
  return Api.addStore(params).then(response => {
    return response;
})
}

// delete store
export const deleteStore = ({ commit }, params) => {
  return Api.deleteStore(params).then(response => {
    return response;
})
}
