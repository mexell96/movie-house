import { useCallback, useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

import { ProfileImgStyled } from "./Profile.style";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../../components";
import { noPicture } from "../../consts";

type MaterialUIStyleType = {
  paper: string;
};

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
const body = (data: any, classes: MaterialUIStyleType) => {
  return (
    <div className={classes.paper}>
      <h2>Profile</h2>
      <div>{data._id}</div>
      <div>{data.name}</div>
      <div>{data.email}</div>
      <ProfileImgStyled src={data.avatar || noPicture} alt="avatar" />
    </div>
  );
};

const Profile = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [data, setData] = useState({});
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const getName = useCallback(async () => {
    try {
      const user = await request(`/api/profile/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setData(user);
    } catch (e) {
      console.log(e, "Error profile");
    }
  }, [token, id, request]);

  useEffect(() => {
    getName();
  }, [getName]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && id && body(data, classes)}</>;
};

export { Profile };
