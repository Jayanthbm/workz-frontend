import {
  SUCCESS,
  FAILURE,
  REQUESTING,
  ERROR,
  ACCESS_TOKEN,
  USER_DETAILS,
} from "../utils/constant";
import * as Cookie from "../utils/Cookie.js";
import { get, post, postToken } from "../utils/apiRequest.js";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_FAILURE = "UPDATE_PASSWORD_FAILURE";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

export const FORGOT_VALIDATE_REQUEST = "FORGOT_VALIDATE_REQUEST";
export const FORGOT_VALIDATE_SUCCESS = "FORGOT_VALIDATE_SUCCESS";
export const FORGOT_VALIDATE_FAILURE = "FORGOT_VALIDATE_FAILURE";

export const FORGOT_POST_REQUEST = "FORGOT_POST_REQUEST";
export const FORGOT_POST_SUCCESS = "FORGOT_POST_SUCCESS";
export const FORGOT_POST_FAILURE = "FORGOT_POST_FAILURE";

export function forgotPostRequest() {
  return {
    type: FORGOT_POST_REQUEST,
    status: REQUESTING,
  };
}

export function forgotPostSuccess(postDetails) {
  console.log(postDetails);
  return {
    type: FORGOT_POST_SUCCESS,
    postStatus: SUCCESS,
    postDetails,
  };
}

export function forgotPostFailure(error) {
  return {
    type: FORGOT_POST_FAILURE,
    postStatus: ERROR,
    error,
  };
}

export function forgotPost(token, postDetails) {
  return async (dispatch) => {
    dispatch(forgotPostRequest());
    try {
      let url = `updatepass`;
      const result = await postToken(url, token, postDetails);
      const resultJson = await result.data;
      if (resultJson.message !== "Password Updated Succesfully") {
        throw new Error(resultJson.message);
      }
      return dispatch(forgotPostSuccess(resultJson));
    } catch (e) {
      return dispatch(forgotPostFailure(e.message));
    }
  };
}

export function forgotValidateRequest() {
  return {
    type: FORGOT_VALIDATE_REQUEST,
    status: REQUESTING,
  };
}
export function forgotValidateSuccess(forgotDetails) {
  console.log(forgotDetails);
  return {
    type: FORGOT_VALIDATE_SUCCESS,
    status: SUCCESS,
    forgotDetails,
  };
}

export function forgotValidateFailure(error) {
  return {
    type: FORGOT_VALIDATE_FAILURE,
    status: ERROR,
    error,
  };
}

export function forgotValidate(token) {
  return async (dispatch) => {
    dispatch(forgotValidateRequest());
    try {
      let url = `validate`;
      const result = await post(url, token);
      const resultJson = await result.data;
      if (resultJson.message !== "Valid") {
        throw new Error(resultJson.message);
      }
      return dispatch(forgotPassSuccess(resultJson));
    } catch (e) {
      return dispatch(forgotPassFailure(e.message));
    }
  };
}

export function forgotPassRequest() {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    status: REQUESTING,
  };
}
export function forgotPassSuccess(forgotPassDetails) {
  console.log(forgotPassDetails);
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    status: SUCCESS,
    forgotPassDetails,
  };
}

export function forgotPassFailure(error) {
  console.log("sy=");
  return {
    type: FORGOT_PASSWORD_FAILURE,
    status: ERROR,
    error,
  };
}

export function forgotPass(userId) {
  return async (dispatch) => {
    dispatch(forgotPassRequest());
    try {
      let url = `forgotpass`;
      const result = await post(url, userId);
      const resultJson = await result.data;
      if (resultJson.message !== "Email Sent to registered Address") {
        throw new Error(resultJson.message);
      }
      return dispatch(forgotPassSuccess(resultJson));
    } catch (e) {
      return dispatch(forgotPassFailure(e.message));
    }
  };
}

export function updatePasswordRequest() {
  return {
    type: UPDATE_PASSWORD_REQUEST,
    status: REQUESTING,
  };
}

export function updatePasswordSuccess(updatePassword) {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    status: SUCCESS,
    updatePassword,
  };
}

export function updatePasswordFailure(error) {
  return {
    type: UPDATE_PASSWORD_FAILURE,
    status: ERROR,
    error,
  };
}

export function updatePassword(userLoginDetails) {
  return async (dispatch) => {
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
    type: LOGIN_USER_REQUEST,
    status: REQUESTING,
  };
}
export function loginUserSuccess(loginDetails) {
  return {
    type: LOGIN_USER_SUCCESS,
    status: SUCCESS,
    loginDetails,
  };
}

export function loginUserFailure(error) {
  return {
    type: LOGIN_USER_FAILURE,
    status: ERROR,
    error,
  };
}

export function getLogin(userLoginDetails) {
  return async (dispatch) => {
    dispatch(loginUserRequest());
    try {
      let url = `login`;
      const result = await post(url, userLoginDetails);
      const resultJson = await result.data;
      if (resultJson.message) {
        throw new Error(resultJson.message);
      }

      Cookie.createCookie(ACCESS_TOKEN, resultJson.token, 7);
      Cookie.createCookie(USER_DETAILS, JSON.stringify(resultJson), 7);
      return dispatch(loginUserSuccess(resultJson));
    } catch (e) {
      return dispatch(loginUserFailure(e.message));
    }
  };
}
