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

//activateEmail
export const activateEmail = ({ commit }, params) => {
  return Api.activateEmail(params).then(response => {
    return response;
  })
}
