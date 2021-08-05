import { useParams } from "react-router";

const Profile = () => {
  const { id } = useParams<{ id: string }>();

  const data = JSON.parse(localStorage.getItem("Users") || "null");
  const user = data[id];
  console.log(user, "user");

  return (
    <div>
      <h2>Profile</h2>
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
  );
};

export { Profile };
