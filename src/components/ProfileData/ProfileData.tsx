import { ProfileDataStyled } from "./Profile.style";

import { noPicture } from "../../consts";

type MaterialUIStyleType = {
  paper: string;
};

type ProfileDataPropsType = {
  user: any;
  classes: MaterialUIStyleType;
};

const ProfileData = ({ user, classes }: ProfileDataPropsType) => {
  return (
    <div className={classes.paper}>
      <h2>Profile</h2>
      <div>{user._id}</div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <ProfileDataStyled src={user.avatar || noPicture} alt="avatar" />
    </div>
  );
};

export { ProfileData };
