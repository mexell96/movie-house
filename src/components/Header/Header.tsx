import {
  HeaderStyled,
  HeaderAvatarStyled,
  HeaderImgStyled,
} from "./Header.styled";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { noPicture } from "../../consts";

const Header = () => {
  return (
    <HeaderStyled onClick={() => window.scroll(0, 0)}>
      <div>Movie-house</div>
      <HeaderAvatarStyled>
        {/* {isAuth && (
          <Button>
            <Link to={`/auth`}>Login</Link>
          </Button>
        )} */}
        {/* {!isAuth && (
          <>
            <HeaderImgStyled src={noPicture} alt="avatar" />
            <Button>
              <Link to={`/auth`}>Logout</Link>
            </Button>
          </>
        )} */}
      </HeaderAvatarStyled>
    </HeaderStyled>
  );
};

export { Header };
