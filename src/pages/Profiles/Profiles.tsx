import { useCallback, useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { ProfileImgStyled } from "./Profiles.style";

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
  if (data.length > 0) {
    return (
      <>
        {data.map((user: any) => (
          <div className={classes.paper} key={user._id}>
            <h2>Profile</h2>
            <div>{user._id}</div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <ProfileImgStyled src={user.avatar || noPicture} alt="avatar" />
          </div>
        ))}
      </>
    );
  }
};

const Profiles = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [data, setData] = useState([]);
  const classes = useStyles();

  const getName = useCallback(async () => {
    try {
      const users = await request(`/api/profiles`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setData(users);
    } catch (e) {
      console.log(e, "Error profiles");
    }
  }, [token, request]);

  useEffect(() => {
    getName();
  }, [getName]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && body(data, classes)}</>;
};

export { Profiles };
