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

// categoryData
export const categoryData = ({ commit }, params) => {
  return Api.categoryData(params).then(response => {
    return response;
  })
}

// categoryOrder
export const categoryOrder = ({ commit }, params) => {
  return Api.categoryOrder(params).then(response => {
    return response;
  })
}

// orderList
export const getOrderList = ({ commit }, params) => {
  return Api.getOrderList(params).then(response => {
    return response;
  })
}

//getOrderListMap
export const getOrderListMap = ({ commit }, params) => {
  return Api.getOrderListMap(params).then(response => {
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

// add transport
export const addTransport = ({ commit }, params) => {
  return Api.addTransport(params).then(response => {
    return response;
  })
}

// delete transport
export const deleteTransport = ({ commit }, params) => {
  return Api.deleteTransport(params).then(response => {
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

// carList
export const getCarList = ({ commit }, params) => {
  return Api.getCarList(params).then(response => {
    return response;
  })
}

// add car
export const addCar = ({ commit }, params) => {
  return Api.addCar(params).then(response => {
    return response;
  })
}

// delete car
export const deleteCar = ({ commit }, params) => {
  return Api.deleteCar(params).then(response => {
    return response;
  })
}

//getCarListMap
export const getCarListMap = ({ commit }, params) => {
  return Api.getCarListMap(params).then(response => {
    return response;
  })
}

// teamList
export const getTeamList = ({ commit }, params) => {
  return Api.getTeamList(params).then(response => {
    return response;
  })
}

// add team
export const addTeam = ({ commit }, params) => {
  return Api.addTeam(params).then(response => {
    return response;
  })
}

// delete team
export const deleteTeam = ({ commit }, params) => {
  return Api.deleteTeam(params).then(response => {
    return response;
  })
}
