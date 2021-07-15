import axios from "axios";

import { API_KEY, API_URL } from "./consts";

export const getMovies = async (searchValue: string, page: number) => {
  const url: string = `${API_URL}/?apiKey=${API_KEY}&s=${searchValue}&page=${page}`;
  const { data } = await axios({
    method: "GET",
    url,
  });
  return data;
};

export const getMovie = async (id: string) => {
  const url: string = `${API_URL}/?apiKey=${API_KEY}&plot=full&i=${id}`;
  const { data } = await axios({
    method: "GET",
    url,
  });
  return data;
};
