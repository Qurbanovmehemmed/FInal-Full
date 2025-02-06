import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../../redux/features/userSlice';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [username, setUsername] = useState(user?.existUser?.username || '');
  const [email, setEmail] = useState(user?.existUser?.email || '');
  const [image, setImage] = useState(null);

  // If no user is found, redirect to login page
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await axios.put('/api/user/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.status === 200) {
        dispatch(setUser(res.data));
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  return (
    <div className="container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="profile-info">
          <div className="profile-image">
            {/* Display profile image */}
            <img
              src={`http://localhost:5000/${user?.existUser?.image}`}
              alt={user?.existUser?.username}
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          </div>
          <div className="profile-text">
            <h3>{user?.existUser?.username}</h3>
            <p>Email: {user?.existUser?.email}</p>
            <p>Joined: {new Date(user?.existUser?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="profile-update">
          <h3>Update Profile</h3>
          <form onSubmit={handleUpdateProfile}>
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
            <div>
              <label>Profile Image:</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;