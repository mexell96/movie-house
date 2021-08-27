import axios from "axios";
import { API_URL } from "../consts";

const omdbInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

omdbInstance.interceptors.request.use(
  (request) => {
    console.log(request, "request");
    return request;
  },
  (error) => {
    console.log(error, "error");
    return Promise.reject(error);
  }
);

omdbInstance.interceptors.response.use(
  (response) => {
    console.log(response, "response");
    return response;
  },
  (error) => {
    console.log(error, "error");
    return Promise.reject(error);
  }
);

export default omdbInstance;
