import { UserAvatarContainerStyled, UserAvatarStyled } from "./Profiles.style";

const UserAvatar = ({ userAvatar }: any) => {
  return (
    <UserAvatarContainerStyled>
      <UserAvatarStyled src={userAvatar} alt="avatar" />
    </UserAvatarContainerStyled>
  );
};

export { UserAvatar };
