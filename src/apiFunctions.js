import axios from "axios";

import { API_KEY, API_URL } from "./consts";

export const getMovies = async (searchValue, page) => {
  const url = `${API_URL}/?apiKey=${API_KEY}&s=${searchValue}&page=${page}`;
  const response = await axios({
    method: "GET",
    url,
  });
  return response;
};

export const getMovie = async (id) => {
  const url = `${API_URL}/?apiKey=${API_KEY}&plot=full&i=${id}`;
  const response = await axios({
    method: "GET",
    url,
  });
  return response;
};
