import { API_BASE } from "./../consts";
import instance from "./instance";
import axios from "axios";

export const login = async (props: any) => {
  try {
    const { data } = await instance({
      method: "POST",
      url: "/login",
      data: props,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const logout = async () => {
  try {
    const { data } = await instance({
      method: "POST",
      url: "/logout",
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const register = async (props: any) => {
  try {
    const { data } = await instance({
      method: "POST",
      url: "/registration",
      data: props,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const checkAuth = async () => {
  try {
    const data = await axios.get(`${API_BASE}/refresh`, {
      withCredentials: true,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};
