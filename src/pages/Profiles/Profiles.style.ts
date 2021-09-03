import styled from "styled-components";

export const ProfileErrorStyled = styled.div`
  text-align: center;
  font-size: 3vw;
  color: red;
`;

export const ProfileEditStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileEditIconStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: lightgrey;
  }
`;

export const ProfileChangeIconStyled = styled.div`
  display: flex;
`;

export const UserAvatarContainerStyled = styled.div`
  display: flex;
  width: 5vw;
  height: 5vw;
  margin: 0 auto;
`;

export const UserAvatarStyled = styled.img`
  height: 5vw;
  width: 5vw;
  border-radius: 50%;
  margin-bottom: 5vw;
`;
