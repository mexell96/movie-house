import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { ProfileImgStyled } from "./Profile.style";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    margin: "10px",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const data = JSON.parse(localStorage.getItem("Users") || "null");
  const user = data[id];

  return (
    <div className={classes.paper}>
      <h2>Profile</h2>
      <div>{user.name}</div>
      {/* <ProfileImgStyled src={user.avatar} alt="avatar" /> */}
      <div>{user.email}</div>
    </div>
  );
};

export { Profile };
