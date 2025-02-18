import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/features/userSlice";
import Table from "react-bootstrap/Table";

const UsersAdmin = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const allUser = users.users;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  console.log(users);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {allUser &&
            allUser.map((user, index) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>Admin {user.isAdmin ? ("true"):("false")}</td>
                <td>

                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersAdmin;
