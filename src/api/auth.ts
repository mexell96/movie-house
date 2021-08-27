import instance from "./instance";

export const authentification = async () => {
  try {
    const { data } = await instance({
      method: "GET",
      url: `/api/profile`,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const login = async (props: any) => {
  try {
    const { data } = await instance({
      method: "POST",
      url: "/api/login",
      data: props,
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
      url: "/api/register",
      data: props,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};
