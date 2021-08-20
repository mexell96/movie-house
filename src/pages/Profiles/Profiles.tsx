import { useCallback, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Select, message } from "antd";

import { ProfileErrorStyled } from "./Profiles.style";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../../components";
import { useAuth } from "../../hooks/auth.hook";

const Profiles = (): JSX.Element => {
  const { token }: AuthContextType = useContext(AuthContext);
  const { request, loading } = useHttp();
  const { getUser } = useAuth();
  const [users, setUsers] = useState<UserType[] | []>([]);
  const userReducer = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

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
        role === "ADMIN" && (await getUsers());
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
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string, user: any) => {
        return (
          <Select
            value={role}
            style={{ width: 120 }}
            onChange={(value) => changeRole(value, user._id)}>
            <Select.Option value="ADMIN">ADMIN</Select.Option>
            <Select.Option value="USER">USER</Select.Option>
          </Select>
        );
      },
    },
  ];

  useEffect(() => {
    userReducer.role === "ADMIN" && getUsers();
  }, [getUsers, userReducer]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && userReducer.role === "ADMIN" && (
        <Table bordered columns={columns} dataSource={users} rowKey="_id" />
      )}
      {!loading && userReducer.role !== "ADMIN" && (
        <ProfileErrorStyled>You don't have access.</ProfileErrorStyled>
      )}
    </>
  );
};

export { Profiles };
