declare type AppReducerType = {
  loading: boolean;
};
declare type PreviousSearchesType = SearchInfoType[];
declare type ResultsMovieType = {
  [key: string]: MovieType;
};
declare type ResultsMoviesType = {
  [key: string]: ResultMoviesType;
};
declare type TabsType = {
  tab: number;
};
declare type SearchInfoType = {
  input: string;
  page: number;
  key: string;
};
declare type RootStateType = {
  appReducer: AppReducerType;
  previousSearches: PreviousSearchesType;
  resultsMovie: ResultsMovieType;
  resultsMovies: ResultsMoviesType;
  tabsReducer: TabsType;
  urlReducer: SearchInfoType;
};

declare type ResultMoviesType = {
  movies: MovieType[];
  totalResults: string;
};

declare type MovieType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot?: string;
};

declare type ReducerPropsType = {
  type: string;
  searchValue: RequestData;
};

declare type TabsPropsType = {
  type: string;
  tab: number;
};

declare type MoviesResponseType = {
  Response: string;
  Search: MovieType[];
  totalResults: string;
};

declare type ReviewType = {
  name: string;
  review: string;
  rating: number;
  uid: string;
  date: number;
};

declare type ReviewsType = {
  [id: string]: ReviewType[];
};
