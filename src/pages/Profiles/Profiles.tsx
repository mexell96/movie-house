import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Select, message, Button, Popconfirm } from "antd";

import { ProfileErrorStyled } from "./Profiles.style";

import useHttp from "../../hooks/http";
import { Loader } from "../../components";
import { UserName } from "./UserName";
import { UserEmail } from "./UserEmail";
import { getUsers, deleteUser, changeRole } from "../../api/user";

const Profiles = (): JSX.Element => {
  const { loading } = useHttp();
  const [users, setUsers] = useState<UserType[] | []>([]);
  const { token, user } = useSelector(
    ({ userReducer }: RootStateType) => userReducer
  );

  const getUsersFn = () => {
    (async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (e) {
        console.log(e, "Error profiles");
      }
    })();
  };

  const handleDelete = (id: string) => {
    (async () => {
      try {
        const response = await deleteUser(id, "root-");
        message.success(response.message);
        await getUsersFn();
      } catch (error) {
        message.error("You don't have access");
        console.log("Error - ", error);
      }
    })();
  };

  const changeRoleFn = (role: string, id: string): void => {
    (async () => {
      try {
        const response = await changeRole(id, role);
        message.success(response.message);
        (role === "SUPERADMIN" || role === "ADMIN") && (await getUsersFn());
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
        return (
          <UserName userName={userName} user={user} getUsersFn={getUsersFn} />
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (userEmail: string, user: UserType) => {
        return (
          <UserEmail
            userEmail={userEmail}
            user={user}
            getUsersFn={getUsersFn}
          />
        );
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
            onChange={(value) => changeRoleFn(value, user.id)}>
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
            onConfirm={() => handleDelete(user.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  useEffect(() => {
    (user.role === "ADMIN" || user.role === "SUPERADMIN") && getUsersFn();
  }, [token, user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && (user.role === "ADMIN" || user.role === "SUPERADMIN") && (
        <Table bordered columns={columns} dataSource={users} rowKey="id" />
      )}
      {!loading && user.role === "USER" && (
        <ProfileErrorStyled>You don't have access.</ProfileErrorStyled>
      )}
    </>
  );
};

export { Profiles };
