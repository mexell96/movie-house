import { useCallback, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Select, message } from "antd";

import { ProfileErrorStyled } from "./Profiles.style";

import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../../components";

const { Option } = Select;

const Profiles = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
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

  const changeRole = (role: string, id: string) => {
    (async () => {
      try {
        const response = await request(
          `/api/profile-role/${id}`,
          "PATCH",
          { role },
          { Authorization: `Bearer ${token}` }
        );
        message.success(response.message);
        getUsers();
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
            <Option value="ADMIN">ADMIN</Option>
            <Option value="USER">USER</Option>
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
      {!loading && users.length !== 0 && (
        <Table bordered columns={columns} dataSource={users} rowKey="_id" />
      )}
      {!loading && userReducer.role !== "ADMIN" && (
        <ProfileErrorStyled>You don't have access.</ProfileErrorStyled>
      )}
    </>
  );
};

export { Profiles };
