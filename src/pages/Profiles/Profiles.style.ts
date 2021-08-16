import styled from "styled-components";

export const ProfileImgStyled = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

export const ProfileWrapperStyled = styled.div`
  width: 100%;
  margin: 10px;
  background-color: ${(props) => props.theme.body};
  border: 1px solid #282c34;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
  padding: 5px;
`;
