import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import useAuth from "../../hooks/auth";

import {
  HeaderStyled,
  HeaderAvatarStyled,
  HeaderButtonsStyled,
  HeaderImgStyled,
  HeaderImgLinkStyled,
  HeaderNameStyled,
} from "./Header.styled";

const Header = () => {
  const { logout } = useAuth();
  const history = useHistory();
  const { user, isAuth } = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  const logoutHandler = (event: any) => {
    event.preventDefault();
    logout();
    history.push("/");
  };

  return (
    <HeaderStyled onClick={() => window.scroll(0, 0)}>
      <div>Movie-house</div>
      {!isAuth && (
        <HeaderButtonsStyled>
          <Button>
            <Link to={`/login`}>Login</Link>
          </Button>
          <Button>
            <Link to={`/registration`}>Registration</Link>
          </Button>
        </HeaderButtonsStyled>
      )}
      {isAuth && (
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
