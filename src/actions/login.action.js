import {
  SUCCESS,
  FAILURE,
  REQUESTING,
  ERROR,
  ACCESS_TOKEN,
  USER_DETAILS
} from "../utils/constant";
import * as Cookie from "../utils/Cookie.js";
import { get, post } from "../utils/apiRequest.js";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_FAILURE = "UPDATE_PASSWORD_FAILURE";


export function updatePasswordRequest() {
    return {
      type: UPDATE_PASSWORD_REQUEST,
      status: REQUESTING
    };
  }
  
  export function updatePasswordSuccess(updatePassword) {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    status: SUCCESS,
    updatePassword
  };
}

export function updatePasswordFailure(error) {
  return {
    type: UPDATE_PASSWORD_FAILURE,
    status: ERROR,
    error
  };
}

export function updatePassword(userLoginDetails) {
  return async dispatch => {
    dispatch(updatePasswordRequest());
    try {
      let url = `updatepass`;
      const result = await post(url, userLoginDetails);
      const resultJson = await result.data;
      if (resultJson.message) {
        throw new Error(resultJson.message);
      }
      return dispatch(updatePasswordSuccess(resultJson));
    } catch (e) {
      return dispatch(updatePasswordFailure(e.message));
    }
  };
}

export function loginUserRequest() {
  return {
    type: UPDATE_PASSWORD_REQUEST,
    status: REQUESTING
  };
}
  export function loginUserSuccess(loginDetails) {
    return {
      type: LOGIN_USER_SUCCESS,
      status: SUCCESS,
      loginDetails
    };
  }
  
  export function loginUserFailure(error) {
    return {
      type: LOGIN_USER_FAILURE,
      status: ERROR,
      error
    };
  }
  
  export function getLogin(userLoginDetails) {
    return async dispatch => {
      dispatch(loginUserRequest());
      try {
        let url = `login`;
        const result = await post(url, userLoginDetails);
        const resultJson = await result.data;
        if (resultJson.message) {
          throw new Error(resultJson.message);
        }
  
        Cookie.createCookie(ACCESS_TOKEN, resultJson.token,7);
        Cookie.createCookie(USER_DETAILS, JSON.stringify(resultJson),7);
        return dispatch(loginUserSuccess(resultJson));
      } catch (e) {
        return dispatch(loginUserFailure(e.message));
      }
    };
  }
