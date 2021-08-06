import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderStyled = styled.div`
  width: 100%;
  cursor: pointer;
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-transform: uppercase;
  background-color: #39445a;
  font-family: "Montserrat", sans-serif;
  font-size: 5vw;
  padding: 10px;
  box-shadow: 0px 1px 5px black;
  color: white;
  z-index: 100;

  @media (max-width: 1000px) {
    padding-top: 15px;
    font-size: 6.4vw;
  }
`;

export const HeaderAvatarStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: green;
  cursor: auto;
`;

export const HeaderImgLinkStyled = styled(Link)`
  height: 5vw;
  margin-right: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0);
  }
`;

export const HeaderImgStyled = styled.img`
  height: 5vw;
  width: 5vw;
  border-radius: 50%;
  margin-bottom: 5vw;

  @media (max-width: 1000px) {
    margin-bottom: 6.4vw;
  }
`;
