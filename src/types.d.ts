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
declare type TabsPropsType = {
  type: string;
  payload: TabsType;
};
declare type SearchInfoType = {
  input: string;
  page: number;
  key: string;
};
declare type ReviewType = {
  name: string;
  review: string;
  rating: number;
  uid: string;
  date: number;
  avatar: string;
};
declare type ReviewsReducerType = {
  [key: string]: ReviewType[];
};
declare type UserReducerPropsType = {
  type: string;
  payload: UserType;
};
declare type RootStateType = {
  appReducer: AppReducerType;
  previousSearches: PreviousSearchesType;
  resultsMovie: ResultsMovieType;
  resultsMovies: ResultsMoviesType;
  tabsReducer: TabsType;
  urlReducer: SearchInfoType;
  reviewsReducer: ReviewsReducerType;
  userReducer: UserType;
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
  payload: SearchInfoType;
};

declare type MoviesResponseType = {
  Response: string;
  Search: MovieType[];
  totalResults: string;
};

declare type ReviewInfoCheckerType = {
  name: boolean;
  review: boolean;
  rating: boolean;
  avatar: boolean;
};

declare type ReviewErrorsType = {
  name: string;
  review: string;
  rating: string;
  avatar: string;
};

declare type ReviewInfoType = {
  name: string;
  review: string;
  rating: number;
  avatar: string;
};

declare type FormikPropsType = {
  field: {
    value: number;
  };
  form: {
    setFieldValue: (
      field: string,
      value: string | number,
      shouldValidate?: boolean
    ) => void;
    errors: ReviewErrorsType;
    touched: ReviewInfoCheckerType;
    values: ReviewInfoType;
  };
};

declare type UserType = {
  email: string;
  name: string;
  password: string;
  role: string;
  _id: string;
  avatar: string;
};
