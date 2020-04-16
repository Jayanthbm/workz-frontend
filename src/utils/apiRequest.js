import { API_URL_ROOT, ACCESS_TOKEN } from "./constant.js";
import axios from "axios";
import * as Cookie from "./Cookie";

export async function post(path, postData) {
  let config = {
    headers: {
      Authorization: "Bearer " + Cookie.getCookie(ACCESS_TOKEN),
    },
  };
  const url = `${API_URL_ROOT}/${path}`;
  return await axios.post(url, postData, config);
}
export async function postToken(path, token, postData) {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const url = `${API_URL_ROOT}/${path}`;
  return await axios.post(url, postData, config);
}
export async function postFormData(path, postData) {
  const url = `${API_URL_ROOT}/${path} `;
  return await axios({
    url: url,
    method: "POST",
    data: postData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + Cookie.getCookie(ACCESS_TOKEN),
    },
  });
}

export async function get(path) {
  if (Cookie.getCookie(ACCESS_TOKEN)) {
    let config = {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: "Bearer " + Cookie.getCookie(ACCESS_TOKEN),
      },
    };
    const url = `${API_URL_ROOT}/${path}`;
    return await axios.get(url, config);
  } else {
    const url = `${API_URL_ROOT}/${path}`;
    return await axios.get(url);
  }
}

export async function put(path, postData) {
  let config = {
    headers: {
      Authorization: "Bearer " + Cookie.getCookie(ACCESS_TOKEN),
    },
  };
  const url = `${API_URL_ROOT}/${path}`;
  return await axios.put(url, postData, config);
}

export async function deleteData(path, postData) {
  const url = `${API_URL_ROOT}/${path}`;
  return await axios({
    url: url,
    method: "DELETE",
    data: postData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + Cookie.getCookie(ACCESS_TOKEN),
    },
  });
}

export async function publicGet(path) {
  const url = `${API_URL_ROOT}/${path}`;
  return await axios.get(url);
}

export async function blob(path) {
  const url = `${API_URL_ROOT}/${path} `;
  return await axios({
    url: url,
    method: "GET",
    responseType: "blob",
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + Cookie.getCookie(ACCESS_TOKEN),
    },
  });
}
