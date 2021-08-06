import {
  HeaderStyled,
  HeaderAvatarStyled,
  HeaderImgStyled,
  HeaderImgLinkStyled,
} from "./Header.styled";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { noPicture } from "../../consts";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";

const Header = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector(({ authReducer }: any) => authReducer);

  return (
    <HeaderStyled onClick={() => window.scroll(0, 0)}>
      <div>Movie-house</div>
      <HeaderAvatarStyled>
        {!authReducer.isAuth && (
          <Button>
            <Link to={`/auth`}>Login</Link>
          </Button>
        )}
        {authReducer.isAuth && (
          <>
            <HeaderImgLinkStyled to={`/profile/${authReducer.user.uid}`}>
              <HeaderImgStyled src={noPicture} alt="avatar" />
            </HeaderImgLinkStyled>
            <Button onClick={() => dispatch(logout())}>
              <Link to={`/`}>Logout</Link>
            </Button>
          </>
        )}
      </HeaderAvatarStyled>
    </HeaderStyled>
  );
};

export { Header };
