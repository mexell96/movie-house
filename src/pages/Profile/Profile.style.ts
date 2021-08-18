import styled from "styled-components";
import { Button } from "antd";

export const ProfileTableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  border-style: hidden;
  box-shadow: 0 0 0 1px rgba(40, 44, 52, 0.7);
  overflow: hidden;
`;

export const ProfileTbodyStyled = styled.tbody``;

export const ProfileAvatarWrapperStyled = styled.div`
  margin: 10px 0;
`;

export const ProfileButtonAccountStyled = styled(Button)`
  margin: 10px;
`;

export const ProfileModalButtonsWrapperStyled = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ProfileWrapperStyled = styled.div`
  width: 100%;
  margin: 10px 0;
  background-color: ${(props) => props.theme.body};
  border: 1px solid #282c34;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
  padding: 5px;
`;

export const ProfileCardWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 835px) {
    justify-content: center;
  }
`;
