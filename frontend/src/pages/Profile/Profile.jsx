import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLogout, setUser } from "../../redux/features/userSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./Profile.scss";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.existUser?.name || "");
  const [username, setUsername] = useState(user?.existUser?.username || "");
  const [email, setEmail] = useState(user?.existUser?.email || "");
  const [image, setImage] = useState(null);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/api/user/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(setUser(res.data));
        setName(res.data.name);
        setUsername(res.data.username);
        setEmail(res.data.email);
        dispatch(setLogout()); // Clear user from Redux store
        navigate("/login");
        alert("Profile updated successfully");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  console.log("Redux-dan gələn user:", user);
  return (
    <div className="profile-container">
      <div className="profile-details">
        <div className="profile-info">
          <div className="profile-image">
            <img
              src={
                user?.existUser?.image
                  ? `http://localhost:5000/${user.existUser.image}`
                  : "/default-avatar.png"
              }
              alt={user?.existUser?.username}
            />
          </div>
          <div className="profile-text">
            <h3>Name: {user?.existUser?.name}</h3>
            <h3>Username: {user?.existUser?.username}</h3>
            <p>Email: {user?.existUser?.email}</p>
            <p>
              Joined:{" "}
              {new Date(user?.existUser?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="d-flex">
          <div>Password: </div>
          <div className="d-flex">
            <div>********</div>
          </div>
          <div className="password-reset">
            <button
            className="btn btn-primary"
              onClick={() => {
                navigate("/resetpassword");
              }}
            >
              Reset Password
            </button>
          </div>
        </div>

        <div className="profile-update">
          <h3>Update Profile</h3>
          <form onSubmit={handleUpdateProfile}>
            <div>
              <label>Profile Image:</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit">Update Profile</button>
          </form>
        </div>

        <div className="logout ">
          <button
          className="btn btn-danger"  
            onClick={() => {
              dispatch(setLogout());
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
