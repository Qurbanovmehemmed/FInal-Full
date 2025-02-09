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
  const [open, setOpen] = useState(false);

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
      <div className="container">
        <div className="profile-details">
          {/* <div className="profile-info">
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
          </div> */}
         

          <div className="profile-update">
            <h3 className="text-center">Profile</h3>
            <form onSubmit={handleUpdateProfile}>
              <div className="profileDeatils">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    justifyContent: "center",
                  }}
                >
                  <label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
                    <img
                      src={
                        user?.existUser?.image
                          ? `http://localhost:5000/${user.existUser.image}`
                          : "/default-avatar.png"
                      }
                      alt={user?.existUser?.username}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  </label>

                  <input
                    type="file"
                    id="fileUpload"
                    style={{ display: "none" }}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                 
                </div>
                <div className="d-flex gap-2 justify-content-center">
                <div onClick={()=>setOpen(!open)} style={{color:"blue ",cursor:"pointer",textAlign:"center"}}>Change Image</div>
                {open ? (<div>click image</div>) : ("")}
                </div>
              </div>
              <div>
                <div className="profilText">Name</div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="profilInput"
                />
              </div>
              <div>
                <div className="profilText">Username</div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="profilInput"
                />
              </div>
              <div>
                <div className="profilText">Email</div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="profilInput"
                />
              </div>

              <button type="submit">Update Profile</button>
            </form>
          </div>


        <div className="d-flex gap-2 justify-content-between align-items-center mt-2">
        <div style={{}}>
           
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
      </div>
    </div>
  );
};

export default Profile;
