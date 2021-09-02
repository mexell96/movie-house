import axios from "axios";
import { API_BASE } from "../consts";
import { setLocalStorageToken, clearLocalStorageToken } from "../utils";

const tokenFn = () => JSON.parse(localStorage.getItem("token") || "null");

const instance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${tokenFn()}`;
    return config;
  },
  (error) => {
    console.log(error, "error");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_BASE}/refresh`, {
          withCredentials: true,
        });
        setLocalStorageToken(response.data.accessToken || "");

        return instance.request(originalRequest);
      } catch (e) {
        console.log("Not authorized");
        clearLocalStorageToken();
      }
    }
    throw error;
  }
);

export default instance;
