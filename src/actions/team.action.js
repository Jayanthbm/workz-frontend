
import {
    SUCCESS,
    REQUESTING,
    ERROR
  } from "../utils/constant";
  import * as Cookie from "../utils/Cookie.js";
  import { get, post } from "../utils/apiRequest.js";

  export const GET_TEAM_REQUEST = "GET_TEAM_REQUEST";
  export const GET_TEAM_SUCCESS = "GET_TEAM_SUCCESS";
  export const GET_TEAM_FAILURE = "GET_TEAM_FAILURE";

  export const GET_TEAM_USER_REQUEST = "GET_TEAM_USER_REQUEST";
  export const GET_TEAM_USER_SUCCESS = "GET_TEAM_USER_SUCCESS";
  export const GET_TEAM_USER_FAILURE = "GET_TEAM_USER_FAILURE";

  export function getTeamRequest() {
      return {
        type: GET_TEAM_REQUEST,
        status: REQUESTING
      };
    }
    
    export function getTeamSuccess(teamDetails) {
      return {
        type: GET_TEAM_SUCCESS,
        status: SUCCESS,
        teamDetails
      };
    }
    
    export function getTeamFailure(error) {
        console.log("fail",error)
      return {
        type: GET_TEAM_FAILURE,
        status: ERROR,
        error
      };
    }
    
    export function getTeam() {
   
      return async dispatch => {
        dispatch(getTeamRequest());
        try {
          let url = `teams`;
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
          status: REQUESTING
        };
      }
      
      export function getTeamUserSuccess(teamUserDetails) {
        return {
          type: GET_TEAM_USER_SUCCESS,
          status: SUCCESS,
          teamUserDetails
        };
      }
      
      export function getTeamUserFailure(error) {
          console.log("fail",error)
        return {
          type: GET_TEAM_USER_FAILURE,
          status: ERROR,
          error
        };
      }
      
      export function getTeamUser(teamId) {
     
        return async dispatch => {
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