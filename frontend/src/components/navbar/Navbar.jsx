import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import logoImg from "../../assets/images/logo.png.webp";
import { FaShoppingBasket } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLogout } from "../../redux/features/userSlice";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = () => {
  const baseUrl = "http://localhost:5000/auth";
  const { wishlist } = useSelector((state) => state.wishlist);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await axios.post(`${baseUrl}/logout`,{}, { withCredentials: true });

    dispatch(setLogout());

    if (res.status === 200) {
      alert("Logout successful");
    } else {
      alert("Logout failed");
    }
  };
  const isAdmin = user?.existUser?.email === "mahammadag-af106@code.edu.az";

  const totalWishlistCount = wishlist.length;
  return (
    <div className="navbar-section">
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <img src={logoImg} alt="" />
          </div>
          <ul className="navlist">
            <li className="navlist-item">
              <Link to="/">Home</Link>
            </li>
            <li className="navlist-item">
              <Link to="/category">Category</Link>
            </li>
            <li className="navlist-item">
              <Link to="/men">Men</Link>
            </li>
            <li className="navlist-item">
              <Link to="/women">Women</Link>
            </li>
            <li className="navlist-item">
              <Link to="/latest">Latest</Link>
            </li>
            {isAdmin ? (
              <li className="navlist-item">
                <Link to="/admin">Admin</Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          <div className="wrapper">
            <DropdownButton
              align="end"
              title="Write"
              id="dropdown-menu-align-end"
              variant="light"
            >
              <Dropdown.Item eventKey="1">
                <Link to="/create" className="d-flex gap-1">
                  <img
                    src="https://www.wattpad.com/wp-web-assets/images/icons/create-story.svg"
                    alt=""
                  />
                  Create a new story
                </Link>
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">
                <Link to="/create" className="d-flex gap-1">
                  
                  My stories
                </Link>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Helpful for writers</Dropdown.Item>
            </DropdownButton>
            <div className="heart">
              <Link to="/wishlist">
                <CiHeart />
                <sup>{totalWishlistCount}</sup>
              </Link>
            </div>

            <div className="dropdown">
              <button
                className="btn btn-light"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fa-solid fa-user"></i>
                {user ? (
                  <div>
                    <img
                      style={{ width: "30px", height: "30px" }}
                      src={`http://localhost:5000/${user?.existUser?.image}`}
                      alt=""
                    />
                    {user?.existUser?.username}
                  </div>
                ) : (
                  "Daxil ol"
                )}
              </button>
              <ul className="dropdown-menu">
                {user ? (
                  <>
                    <li onClick={handleLogout}>
                      <Link className="dropdown-item logout " to="/">
                        Logout
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item logout " to="/profile">
                        Manage Account
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item register" to="/register">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item login" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
