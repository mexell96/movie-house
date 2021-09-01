import instance from "./instance";

export const getUsers = async () => {
  try {
    const { data } = await instance({
      method: "GET",
      url: "/users",
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const deleteUser = async (id: any, root: string = "") => {
  try {
    const { data } = await instance({
      method: "DELETE",
      url: `/${root}delete-user/${id}`,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const changeEmail = async (
  id: string,
  email: string,
  root: string = ""
) => {
  try {
    const { data } = await instance({
      method: "PATCH",
      url: `/${root}user-email/${id}`,
      data: { email },
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const changeImage = async (id: string, avatar: string) => {
  try {
    const { data } = await instance({
      method: "PATCH",
      url: `/user-avatar/${id}`,
      data: { avatar },
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const changeName = async (
  id: string,
  name: string,
  root: string = ""
) => {
  try {
    const { data } = await instance({
      method: "PATCH",
      url: `/${root}user-name/${id}`,
      data: { name },
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const changePassword = async (
  id: string,
  { oldPassword, newPassword }: any
) => {
  try {
    const { data } = await instance({
      method: "PATCH",
      url: `/user-password/${id}`,
      data: { oldPassword, newPassword },
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const changeRole = async (id: string, role: string) => {
  try {
    const { data } = await instance({
      method: "PATCH",
      url: `/root-user-role/${id}`,
      data: { role },
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const changeTheme = async (id: string, theme: string) => {
  try {
    const { data } = await instance({
      method: "PATCH",
      url: `/user-theme/${id}`,
      data: { theme },
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};
