import { useCallback, useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { Loader, ProfileData, ProfileDataForm } from "../../components";

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
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const getUser = useCallback(async () => {
    try {
      const user = await request(`/api/profile/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setUser(user);
    } catch (e) {
      console.log(e, "Error profile");
    }
  }, [token, id, request]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Button variant="contained" onClick={() => setEditMode(!editMode)}>
        Edit mode
      </Button>
      {!loading && id && !editMode && (
        <ProfileData user={user} classes={classes} />
      )}
      {!loading && id && editMode && (
        <ProfileDataForm
          user={user}
          classes={classes}
          setEditMode={setEditMode}
          getUser={getUser}
          token={token}
        />
      )}
    </>
  );
};

export { Profile };
