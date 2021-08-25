import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";

import {
  HeaderStyled,
  HeaderAvatarStyled,
  HeaderButtonsStyled,
  HeaderImgStyled,
  HeaderImgLinkStyled,
  HeaderNameStyled,
} from "./Header.styled";

import { useLogout } from "../../hooks";

const Header = () => {
  const { logout } = useLogout();
  const history = useHistory();
  const { token, user } = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  const isAuthenticated = !!token;

  const logoutHandler = (event: any) => {
    event.preventDefault();
    logout();
    history.push("/");
  };

  return (
    <HeaderStyled onClick={() => window.scroll(0, 0)}>
      <div>Movie-house</div>
      {!isAuthenticated && (
        <HeaderButtonsStyled>
          <Button>
            <Link to={`/login`}>Login</Link>
          </Button>
          <Button>
            <Link to={`/registration`}>Registration</Link>
          </Button>
        </HeaderButtonsStyled>
      )}
      {isAuthenticated && (
        <HeaderAvatarStyled>
          <HeaderImgLinkStyled to={`/profile/${user._id}`}>
            <HeaderImgStyled src={user.avatar} alt="avatar" />
          </HeaderImgLinkStyled>
          <HeaderNameStyled>{user.name}</HeaderNameStyled>
          <Button onClick={logoutHandler}>
            <Link to={`/`}>Logout</Link>
          </Button>
        </HeaderAvatarStyled>
      )}
    </HeaderStyled>
  );
};

export { Header };
