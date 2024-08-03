import axios from "axios";

import {
  KEY_ACCESS_TOKEN,
  getItems,
  setItems,
  removeItem,
} from "./localStorageManager";

let baseURL;

if (import.meta.env.MODE === "production") {
  baseURL = import.meta.env.VITE_SERVER_BASE_URL;
} else {
  baseURL = "http://localhost:8000/";
}
export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  const access_token = getItems(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${access_token}`;

  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  const data = response.data;
  if (data.status === "ok") {
    return data;
  }

  const originalRequest = response.config;
  const statusCode = data.statusCode;
  const error = data.result;

  if (statusCode === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshResponse = await axios
      .create({ withCredentials: true })
      .get(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh`);

    if (refreshResponse.data.status === "ok") {
      setItems(KEY_ACCESS_TOKEN, refreshResponse.data.result.accessToken);
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${refreshResponse.data.result.accessToken}`;

      return axiosClient(originalRequest);
    } else {
      console.log("I am here");
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "self");

      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
}),
  async (error) => {
    return Promise.reject(error);
  };
