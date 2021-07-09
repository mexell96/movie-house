import axios from "axios";
import { API_KEY, API_URL } from "./consts";

export const getMovies = async (searchValue, page = 1) => {
  const response = await axios.get(
    `${API_URL}/?apiKey=${API_KEY}&s=${searchValue}&page=${page}`
  );
  return response;
};

export const getMovie = async (id) => {
  return await axios.get(`${API_URL}/?apiKey=${API_KEY}&plot=full&i=${id}`);
};
