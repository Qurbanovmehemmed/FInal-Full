import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/features/userSlice";
import axios from "axios";
import "./UserProfile.css";
import "react-toastify/dist/ReactToastify.css"; // React Toastify stilini əlavə edin
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [updatedCategories, setUpdatedCategories] = useState(
    user?.existUser?.favCategories || []
  );
  const [allCategories, setAllCategories] = useState([
    "Fiction",
    "Fantasy",
    "Horror",
    "Drama",
    "Romance",
    "Mystery",
  ]); 

  useEffect(() => {
    if (user && user.existUser && user.existUser.favCategories) {
      setUpdatedCategories(user.existUser.favCategories);
    }
  }, [user]);

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/update-favorites",
        { favCategories: updatedCategories },
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        }
      );

      if (response.data && response.data.success) {
        const updatedUser = {
          ...user.existUser,
          favCategories: updatedCategories,
        };
        dispatch(setUser({ ...user, existUser: updatedUser }));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, existUser: updatedUser })
        );
        setShowModal(false);
        toast.success("Changes saved successfully");
      } else {
        toast.error(response.data.message || "Unknown error");
        console.error(
          "Backend failed to update favorites:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error(
        "Error saving changes:",
        error.response?.data || error.message
      );
    }
  };

  const handleSelectCategory = (category) => {
    if (updatedCategories.includes(category)) {
      setUpdatedCategories(updatedCategories.filter((cat) => cat !== category));
    } else {
      setUpdatedCategories([...updatedCategories, category]);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="user-profile-container ">
          <div className="d-flex  align-items-start justify-content-between">
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
            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = "/profile")}
            >
              Edit Profile
            </button>
          </div>

          <div className="profile-details">
            <h2>{user.name}</h2>
            <p>
              <strong>Username:</strong> {user?.existUser?.username}
            </p>
            <p>
              <strong>Name:</strong> {user?.existUser?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.existUser?.email}
            </p>
            <p>
              <strong>Joined at:</strong>{" "}
              {new Date(user?.existUser?.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>

            <div className="favorite-categories">
              <div className="d-flex gap-2">
                <h4>Fav Categories</h4>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-secondary"
                >
                  +
                </button>
              </div>

              <ul className="d-flex gap-3 mt-2 flex-wrap">
                {updatedCategories.map((cat, index) => (
                  <li key={index} className="category-item">
                    <Link to={`/allproduct?category=${cat}`} className="favBtn">{cat}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h5>Choose category</h5>
            <div className="category-list">
              {allCategories.map((cat, index) => (
                <div key={index} className="category-option">
                  <input
                    type="checkbox"
                    checked={updatedCategories.includes(cat)}
                    onChange={() => handleSelectCategory(cat)}
                  />
                  <label>{cat}</label>
                </div>
              ))}
            </div>
            <button
              onClick={handleSaveChanges}
              className="btn btn-success mt-2"
            >
              Save changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
