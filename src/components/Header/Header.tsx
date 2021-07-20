import { HeaderStyled } from "./Header.styled";

const Header = () => {
  return (
    <HeaderStyled onClick={() => window.scroll(0, 0)}>Movie-house</HeaderStyled>
  );
};

export { Header };
