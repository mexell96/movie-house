import { noPicture } from "./consts";

export const uniqueKey = (movie: string = "", page: number = 1): string => {
  return `s_${movie}_${page}`;
};

export const getPicture = (poster: string) => {
  return poster !== "N/A" ? poster : noPicture;
};
