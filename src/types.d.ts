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
  avatar: string;
  movie: string;
  movieId: string;
  name: string;
  rating: number;
  review: string;
  uid: string;
  owner: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
};
declare type UserReducerPropsType = {
  type: string;
  payload: SetUserPropsType;
};
declare type RootStateType = {
  appReducer: AppReducerType;
  previousSearches: PreviousSearchesType;
  resultsMovie: ResultsMovieType;
  resultsMovies: ResultsMoviesType;
  tabsReducer: TabsType;
  urlReducer: SearchInfoType;
  userReducer: SetUserPropsType;
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
  role: string;
  _id: string;
  avatar: string;
  theme: string;
  createdAt: string;
  updatedAt: string;
};

declare type DataLSType = {
  userId: string;
  token: string;
};

declare type ReviewPropsType = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  getReviewsFromDB: () => Promise<void>;
  title: string;
};

declare type ReviewActionsType = {
  setSubmitting: (isSubmitting: boolean) => void;
};

declare type LoginDataPropsType = {
  token: string;
  message: string;
  user: UserType;
};

declare type SetUserPropsType = {
  user: any;
  token: string;
  isAuth: boolean;
};
