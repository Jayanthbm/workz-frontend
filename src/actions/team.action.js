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
    deepdiveData: deepdiveData,
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
