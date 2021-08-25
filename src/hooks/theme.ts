import { useSelector } from "react-redux";

import { lightTheme, darkTheme } from "../themes";

const useTheme = () => {
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  const theme = () =>
    userReducer.user.theme === "light" ? lightTheme : darkTheme;

  return { theme };
};

export { useTheme };
