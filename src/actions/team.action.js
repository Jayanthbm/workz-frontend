import { SUCCESS, REQUESTING, ERROR } from "../utils/constant";
import * as Cookie from "../utils/Cookie.js";
import { get, post, postAws } from "../utils/apiRequest.js";

export const GET_TEAM_REQUEST = "GET_TEAM_REQUEST";
export const GET_TEAM_SUCCESS = "GET_TEAM_SUCCESS";
export const GET_TEAM_FAILURE = "GET_TEAM_FAILURE";

export const GET_TEAM_USER_REQUEST = "GET_TEAM_USER_REQUEST";
export const GET_TEAM_USER_SUCCESS = "GET_TEAM_USER_SUCCESS";
export const GET_TEAM_USER_FAILURE = "GET_TEAM_USER_FAILURE";

export const POST_FORM_REQUEST = "POST_FORM_REQUEST";
export const POST_FORM_SUCCESS = "POST_FORM_SUCCESS";
export const POST_FORM_FAILURE = "POST_FORM_FAILURE";

export const GET_DEEPDIVE_REQUEST = "GET_DEEPDIVE_REQUEST";
export const GET_DEEPDIVE_SUCCESS = "GET_DEEPDIVE_SUCCESS";
export const GET_DEEPDIVE_FAILURE = "GET_DEEPDIVE_FAILURE";

export const GET_DEEPDIVE_DROPDOWN_REQUEST = "GET_DEEPDIVE_DROPDOWN_REQUEST";
export const GET_DEEPDIVE_DROPDOWN_SUCCESS = "GET_DEEPDIVE_DROPDOWN_SUCCESS";
export const GET_DEEPDIVE_DROPDOWN_FAILURE = "GET_DEEPDIVE_DROPDOWN_FAILURE";

export const POST_FLAG_REQUEST = "POST_FLAG_REQUEST";
export const POST_FLAG_SUCCESS = "POST_FLAG_SUCCESS";
export const POST_FLAG_FAILURE = "POST_FLAG_FAILURE";

export const GET_BREAKUP_REQUEST = "GET_BREAKUP_REQUEST";
export const GET_BREAKUP_SUCCESS = "GET_BREAKUP_SUCCESS";
export const GET_BREAKUP_FAILURE = "GET_BREAKUP_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const POST_MESSAGE_REQUEST = "POST_MESSAGE_REQUEST";
export const POST_MESSAGE_SUCCESS = "POST_MESSAGE_SUCCESS";
export const POST_MESSAGE_FAILURE = "POST_MESSAGE_FAILURE";

export const GET_MESSAGE_REQUEST = "GET_MESSAGE_REQUEST";
export const GET_MESSAGE_SUCCESS = "GET_MESSAGE_SUCCESS";
export const GET_MESSAGE_FAILURE = "GET_MESSAGE_FAILURE";

export function getMessageRequest() {
  return {
    type: GET_MESSAGE_REQUEST,
    status: REQUESTING,
  };
}

export function getMessageSuccess(getMessageData) {
  return {
    type: GET_MESSAGE_SUCCESS,
    status: SUCCESS,
    getMessageData,
  };
}

export function getMessageFailure(error) {
  return {
    type: GET_MESSAGE_FAILURE,
    status: ERROR,
    error,
  };
}

export function gettMessage(timeId) {
  return async (dispatch) => {
    dispatch(getMessageRequest());
    try {
      let url = `comment/${timeId}`;
      const result = await get(url);
      const resultJson = await result.data;
      console.log(resultJson);
      if (typeof resultJson.message != "object") {
        throw new Error(resultJson.message);
      }
      return dispatch(getMessageSuccess(resultJson));
    } catch (e) {
      return dispatch(getMessageFailure(e.message));
    }
  };
}

export function postMessageRequest() {
  return {
    type: POST_MESSAGE_REQUEST,
    status: REQUESTING,
  };
}

export function postMessageSuccess(messageData) {
  return {
    type: POST_MESSAGE_SUCCESS,
    status: SUCCESS,
    messageData,
  };
}

export function postMessageFailure(error) {
  return {
    type: POST_MESSAGE_FAILURE,
    status: ERROR,
    error,
  };
}

export function postMessage(formData, timeId) {
  return async (dispatch) => {
    dispatch(postMessageRequest());
    try {
      let url = `comment/${timeId}`;
      const result = await post(url, formData);
      const resultJson = await result.data;
      if (resultJson.message !== "Comment Sent") {
        throw new Error(resultJson.message);
      }
      return dispatch(postMessageSuccess(resultJson));
    } catch (e) {
      return dispatch(postMessageFailure(e.message));
    }
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
    status: REQUESTING,
  };
}

export function logoutSuccess(logoutDetails) {
  return {
    type: LOGOUT_SUCCESS,
    status: SUCCESS,
    logoutDetails,
  };
}

export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    status: ERROR,
    error,
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch(logoutRequest());
    try {
      let url = `logout`;
      const result = await post(url);
      const resultJson = await result.data;
      window.location.reload();
      if (resultJson.message) {
        throw new Error(resultJson.message);
      }

      return dispatch(logoutSuccess(resultJson));
    } catch (e) {
      return dispatch(logoutFailure(e.message));
    }
  };
}

export function getBreakupRequest() {
  return {
    type: GET_BREAKUP_REQUEST,
    status: REQUESTING,
  };
}

export function getBreakupSuccess(breakupDetails) {
  return {
    type: GET_BREAKUP_SUCCESS,
    status: SUCCESS,
    breakupDetails,
  };
}

export function getBreakupFailure(error) {
  return {
    type: GET_BREAKUP_FAILURE,
    status: ERROR,
    error,
  };
}

export function getBreakup(timeId) {
  return async (dispatch) => {
    dispatch(getBreakupRequest());
    try {
      let url = `breakup/${timeId}`;
      const result = await post(url, timeId);
      const resultJson = await result.data;
      console.log(resultJson);
      if (resultJson.message) {
        throw new Error(resultJson.message);
      }
      return dispatch(getBreakupSuccess(resultJson));
    } catch (e) {
      return dispatch(getBreakupFailure(e.message));
    }
  };
}

export function postFlagRequest() {
  return {
    type: POST_FLAG_REQUEST,
    status: REQUESTING,
  };
}

export function postFlagSuccess(flagDetails) {
  return {
    type: POST_FLAG_SUCCESS,
    status: SUCCESS,
    flagDetails,
  };
}

export function postFlagFailure(error) {
  return {
    type: POST_FLAG_FAILURE,
    status: ERROR,
    error,
  };
}

export function postFlag(timeId) {
  return async (dispatch) => {
    dispatch(postFlagRequest());
    try {
      let url = `flag/${timeId}`;
      const result = await post(url, timeId);
      const resultJson = await result.data;
      console.log(resultJson);
      if (resultJson.message != "Successfully Flagged") {
        throw new Error(resultJson.message);
      }
      return dispatch(postFlagSuccess(resultJson));
    } catch (e) {
      return dispatch(postFlagFailure(e.message));
    }
  };
}

export function getDeepdiveDropdownRequest() {
  return {
    type: GET_DEEPDIVE_DROPDOWN_REQUEST,
    status: REQUESTING,
  };
}

export function getDeepdiveDropdownSuccess(deepdiveDropdownData) {
  console.log(deepdiveDropdownData);
  return {
    type: GET_DEEPDIVE_DROPDOWN_SUCCESS,
    status: SUCCESS,
    deepdiveDropdownData: deepdiveDropdownData,
  };
}

export function getDeepdiveDropdownFailure(error) {
  console.log(error);
  return {
    type: GET_DEEPDIVE_DROPDOWN_FAILURE,
    status: ERROR,
    error,
  };
}

export function getDeepdiveDropdown(userDetails) {
  return async (dispatch) => {
    dispatch(getDeepdiveRequest());
    try {
      let url = `deepdivedropdown`;
      const result = await post(url, userDetails);
      const resultJson = await result.data;
      console.log(resultJson);
      if (resultJson.message) {
        throw new Error(resultJson.message);
      }

      return dispatch(getDeepdiveDropdownSuccess(resultJson));
    } catch (e) {
      return dispatch(getDeepdiveDropdownFailure(e.message));
    }
  };
}

export function getDeepdiveRequest() {
  return {
    type: GET_DEEPDIVE_REQUEST,
    status: REQUESTING,
  };
}

export function getDeepdiveSuccess(deepdiveData) {
  return {
    type: GET_DEEPDIVE_SUCCESS,
    status: SUCCESS,
    deepdiveData,
  };
}

export function getDeepdiveFailure(error) {
  console.log(error);
  return {
    type: GET_DEEPDIVE_FAILURE,
    status: ERROR,
    error,
  };
}

export function getDeepdive(userDetails) {
  return async (dispatch) => {
    dispatch(getDeepdiveRequest());
    try {
      let url = `deepdive`;
      const result = await post(url, userDetails);
      const resultJson = await result.data;
      console.log(resultJson);
      if (resultJson.message) {
        throw new Error(resultJson.message);
      }

      return dispatch(getDeepdiveSuccess(resultJson));
    } catch (e) {
      return dispatch(getDeepdiveFailure(e.message));
    }
  };
}

export function postFormRequest() {
  return {
    type: POST_FORM_REQUEST,
    status: REQUESTING,
  };
}

export function postFormSuccess(formData) {
  return {
    type: POST_FORM_SUCCESS,
    status: SUCCESS,
    formData,
  };
}

export function postFormFailure(error) {
  return {
    type: POST_FORM_FAILURE,
    status: ERROR,
    error,
  };
}

export function postForm(formData) {
  return async (dispatch) => {
    dispatch(postFormRequest());
    try {
      let url = `submitform`;
      const result = await post(url, formData);
      const resultJson = await result.data;
      if (resultJson.message) {
        throw new Error(resultJson.message);
      }
      return dispatch(postFormSuccess(resultJson));
    } catch (e) {
      return dispatch(postFormFailure(e.message));
    }
  };
}

export function getTeamRequest() {
  return {
    type: GET_TEAM_REQUEST,
    status: REQUESTING,
  };
}

export function getTeamSuccess(teamDetails) {
  return {
    type: GET_TEAM_SUCCESS,
    status: SUCCESS,
    teamDetails: teamDetails.results ? teamDetails.results : teamDetails,
  };
}

export function getTeamFailure(error) {
  return {
    type: GET_TEAM_FAILURE,
    status: ERROR,
    error,
  };
}

export function getTeam(userId) {
  return async (dispatch) => {
    dispatch(getTeamRequest());
    try {
      let url = `manager/${userId}`;
      const result = await get(url);
      const resultJson = await result.data;
      if (resultJson.message) {
        throw new Error(resultJson.message);
      }
      return dispatch(getTeamSuccess(resultJson));
    } catch (e) {
      return dispatch(getTeamFailure(e.message));
    }
  };
}
export function getTeamUserRequest() {
  return {
    type: GET_TEAM_USER_REQUEST,
    status: REQUESTING,
  };
}

export function getTeamUserSuccess(teamUserDetails) {
  return {
    type: GET_TEAM_USER_SUCCESS,
    status: SUCCESS,
    teamUserDetails: teamUserDetails.results
      ? teamUserDetails.results
      : teamUserDetails,
  };
}

export function getTeamUserFailure(error) {
  return {
    type: GET_TEAM_USER_FAILURE,
    status: ERROR,
    error,
  };
}

export function getTeamUser(teamId) {
  return async (dispatch) => {
    dispatch(getTeamUserRequest());
    try {
      let url = `teams/${teamId}`;
      const result = await get(url);
      const resultJson = await result.data;
      if (resultJson.message) {
        throw new Error(resultJson.message);
      }
      return dispatch(getTeamUserSuccess(resultJson));
    } catch (e) {
      return dispatch(getTeamUserFailure(e.message));
    }
  };
}
