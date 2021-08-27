import axios from "axios";
import { API_BASE } from "../consts";

const tokenFn = () => JSON.parse(localStorage.getItem("authToken") || "null");

const instance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `Bearer ${tokenFn()}`;
    console.log(request, "request");
    return request;
  },
  (error) => {
    console.log(error, "error");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(response, "response");
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("666");
    }

    console.log(error, "error");
    return Promise.reject(error);
  }
);

export default instance;
