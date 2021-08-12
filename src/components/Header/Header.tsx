import { useContext } from "react";
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

import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const auth: any = useContext(AuthContext);
  const history = useHistory();
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  const logoutHandler = (event: any) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <HeaderStyled onClick={() => window.scroll(0, 0)}>
      <div>Movie-house</div>
      <>
        {!auth.isAuthenticated && (
          <HeaderButtonsStyled>
            <Button>
              <Link to={`/login`}>Login</Link>
            </Button>
            <Button>
              <Link to={`/registration`}>Registration</Link>
            </Button>
          </HeaderButtonsStyled>
        )}
        {auth.isAuthenticated && (
          <HeaderAvatarStyled>
            <HeaderImgLinkStyled to={`/profile/${auth.userId}`}>
              <HeaderImgStyled src={userReducer.avatar} alt="avatar" />
            </HeaderImgLinkStyled>
            <HeaderNameStyled>{userReducer.name}</HeaderNameStyled>
            <Button onClick={logoutHandler}>
              <Link to={`/`}>Logout</Link>
            </Button>
          </HeaderAvatarStyled>
        )}
      </>
    </HeaderStyled>
  );
};

export { Header };
