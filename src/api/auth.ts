import instance from "./instance";

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
    const data = await instance({
      method: "GET",
      url: "/refresh",
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};
