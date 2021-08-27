import { API_KEY } from "../consts";
import omdbInstance from "./omdbInstance";

export const getMovie = async (id: string) => {
  try {
    const { data } = await omdbInstance({
      method: "GET",
      url: `/?apiKey=${API_KEY}&plot=full&i=${id}`,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};

export const getMovies = async (searchValue: string, page: number) => {
  try {
    const { data } = await omdbInstance({
      method: "GET",
      url: `/?apiKey=${API_KEY}&s=${searchValue}&page=${page}`,
    });
    return data;
  } catch (e) {
    console.log("Error -", e);
  }
};
