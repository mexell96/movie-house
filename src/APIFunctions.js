import axios from "axios";
import { API_KEY, API_URL } from "./consts";

export const getMovies = async (searchValue, page = 1) => {
  return await axios.get(
    `${API_URL}/?apiKey=${API_KEY}&s=${searchValue}&page=${page}`
  );
};

export const getMovie = async (id) => {
  return await axios.get(`${API_URL}/?apiKey=${API_KEY}&plot=full&i=${id}`);
};
