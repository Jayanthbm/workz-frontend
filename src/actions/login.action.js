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
export function loginUserRequest() {
    return {
      type: LOGIN_USER_REQUEST,
      status: REQUESTING
    };
  }
  
  export function loginUserSuccess(loginDetails) {
      console.log("Successs")
    return {
      type: LOGIN_USER_SUCCESS,
      status: SUCCESS,
      loginDetails
    };
  }
  
  export function loginUserFailure(error) {
      console.log("fail",error)
    return {
      type: LOGIN_USER_FAILURE,
      status: ERROR,
      error
    };
  }
  
  export function getLogin(userLoginDetails) {
      console.log(userLoginDetails)
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