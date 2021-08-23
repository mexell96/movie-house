import { useCallback, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Select, message, Button, Popconfirm } from "antd";

import { ProfileErrorStyled } from "./Profiles.style";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../../components";
import { useAuth } from "../../hooks/auth.hook";
import { UserName } from "./UserName";
import { UserEmail } from "./UserEmail";

const Profiles = (): JSX.Element => {
  const { token }: AuthContextType = useContext(AuthContext);
  const { request, loading } = useHttp();
  const { getUser } = useAuth();
  const [users, setUsers] = useState<UserType[] | []>([]);
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  const handleDelete = (id: string) => {
    (async () => {
      try {
        const response = await request(
          `/api/root-delete-user/${id}`,
          "DELETE",
          null,
          { Authorization: `Bearer ${token}` }
        );
        console.log(response, "response 7777");
        message.success(response.message);
        await getUsers();
      } catch (error) {
        message.error("You don't have access");
        console.log("Error - ", error);
      }
    })();
  };

  const getUsers = useCallback(async () => {
    try {
      const users = await request(`/api/profiles`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setUsers(users);
    } catch (e) {
      console.log(e, "Error profiles");
    }
  }, [token, request]);

  const changeRole = (role: string, id: string): void => {
    (async () => {
      try {
        const response = await request(
          `/api/profile-role/${id}`,
          "PATCH",
          { role },
          { Authorization: `Bearer ${token}` }
        );
        message.success(response.message);
        await getUser();
        (role === "SUPERADMIN" || role === "ADMIN") && (await getUsers());
      } catch (e) {
        console.log(e, "E message createUserPage");
      }
    })();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (userName: string, user: UserType) => {
        return <UserName userName={userName} user={user} />;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (userEmail: string, user: UserType) => {
        return <UserEmail userEmail={userEmail} user={user} />;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string, user: any) => {
        return (
          <Select
            value={role}
            style={{ width: "100%" }}
            onChange={(value) => changeRole(value, user._id)}>
            <Select.Option value="SUPERADMIN">SUPERADMIN</Select.Option>
            <Select.Option value="ADMIN">ADMIN</Select.Option>
            <Select.Option value="USER">USER</Select.Option>
          </Select>
        );
      },
    },
    {
      title: "Delete user",
      dataIndex: "deleteUser",
      key: "deleteUser",
      render: (_: any, user: UserType) =>
        users.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(user._id)}>
            <Button>Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  useEffect(() => {
    (userReducer.role === "ADMIN" || userReducer.role === "SUPERADMIN") &&
      getUsers();
  }, [getUsers, userReducer]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading &&
        (userReducer.role === "ADMIN" || userReducer.role === "SUPERADMIN") && (
          <Table bordered columns={columns} dataSource={users} rowKey="_id" />
        )}
      {!loading && userReducer.role === "USER" && (
        <ProfileErrorStyled>You don't have access.</ProfileErrorStyled>
      )}
    </>
  );
};

export { Profiles };
