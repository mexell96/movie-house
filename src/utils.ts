import { noPicture } from "./consts";

export const uniqueKey = (movie: string = "", page: number = 1): string => {
  return `s_${movie}_${page}`;
};

export const getPicture = (poster: string) => {
  return poster !== "N/A" ? poster : noPicture;
};

export const setLocalStorageToken = (token: string) => {
  localStorage.setItem("authToken", JSON.stringify(token));
};

export const clearLocalStorageToken = () => {
  localStorage.removeItem("authToken");
};
