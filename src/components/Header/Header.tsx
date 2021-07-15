import { HeaderStyle } from "./Header.styled";

const Header = () => {
  return (
    <HeaderStyle onClick={() => window.scroll(0, 0)}>Movie-house</HeaderStyle>
  );
};

export { Header };
