import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  setAdmin,
  deleteUser,
} from "../../redux/features/userSlice";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "react-toastify/dist/ReactToastify.css"; // React Toastify stilini əlavə edin
import { toast } from "react-toastify";



const UsersAdmin = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const allUser = users.users;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSetAdmin = (userId) => {
    dispatch(setAdmin(userId));
    toast.success("User role change succesfuly!")
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
    toast.success("User deleted succesfuly!")
  };

  return (
    <div
      className="container "
      style={{
        minHeight: "100vh",
      }}
    >
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUser &&
            allUser.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "Not Admin"}</td>
                <td>
                  {/* Admin statusunu dəyişdirmək */}
                  <Button
                    variant={user.isAdmin ? "warning" : "success"}
                    onClick={() => handleSetAdmin(user._id)}
                  >
                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
                  </Button>

                  {/* İstifadəçini silmək */}
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersAdmin;
