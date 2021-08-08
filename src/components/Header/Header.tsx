import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";

import {
  HeaderStyled,
  HeaderAvatarStyled,
  HeaderImgStyled,
  HeaderImgLinkStyled,
} from "./Header.styled";

import { noPicture } from "../../consts";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const auth: any = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (event: any) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <HeaderStyled onClick={() => window.scroll(0, 0)}>
      <div>Movie-house</div>
      <HeaderAvatarStyled>
        {!auth.isAuthenticated && (
          <Button>
            <Link to={`/auth`}>Login</Link>
          </Button>
        )}
        {auth.isAuthenticated && (
          <>
            <HeaderImgLinkStyled to={`/profile/${auth.userId}`}>
              <HeaderImgStyled src={noPicture} alt="avatar" />
            </HeaderImgLinkStyled>
            <Button onClick={logoutHandler}>
              <Link to={`/`}>Logout</Link>
            </Button>
          </>
        )}
      </HeaderAvatarStyled>
    </HeaderStyled>
  );
};

export { Header };
