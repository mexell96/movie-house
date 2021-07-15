export interface IRequest {
  input: string;
  page: number;
  key?: string;
}

export interface IReducerProps {
  type: string;
  payload: IRequest;
}

export interface IMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}
