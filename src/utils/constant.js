import * as Cookie from "./Cookie";
export const URL =
  "http://ec2-54-179-146-232.ap-southeast-1.compute.amazonaws.com"; //http://ec2-54-179-146-232.ap-southeast-1.compute.amazonaws.com http://localhost
export const API_URL_ROOT = `${URL}:3000`;
export const ACCESS_TOKEN = "accesToken";
export const USER_DETAILS = "userDetails";
export const SUCCESS = "SUCCESS";
export const REQUESTING = "REQUESTING";
export const ERROR = "ERROR";
export const FAILURE = "FAILURE";
export const isUserLogedIn = Cookie.getCookie(ACCESS_TOKEN) ? true : false;
