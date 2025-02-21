import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/features/userSlice";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { RxHamburgerMenu } from "react-icons/rx";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [show, setShow] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      const filteredResults = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setShow(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResultClick = (productId) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/productdetail/${productId}`);
  };

  const handleLogout = async () => {
    dispatch(setLogout());
    toast.success("Logout successful");
  };

  const toggle = () => {
    setShow(!show);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="navbar-section">
      <div className="container">
        <div className="navbar">
          <div className="d-flex gap-3">
            <Link to="/">
              <div className="logo d-flex align-items-center justify-content-between">
                <img
                  src="https://www.wattpad.com/wp-web-assets/images/wattpad-logo.svg"
                  alt=""
                />
                <div className="atpad">atpadd </div>
              </div>
            </Link>

            <div className="navlist d-flex flex-wrap navNone">
              <div className="navlist-item">
                <Link to="/wishlist" className="hovTextShadow">
                  My Shelf
                </Link>
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  variant=""
                  id="dropdown-custom-components"
                  className="hovTextShadow"
                >
                  Browse
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/allproduct">
                    All
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/allproduct?category=Romance">
                    Romance
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/allproduct?category=Horror">
                    Horror
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/allproduct?category=Fantasy">
                    Fantasy
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/allproduct?category=Mystery">
                    Mystery
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {user?.existUser?.isAdmin ? (
                  <div className="navlist-item">
                    <Link to="/admin">Admin</Link>
                  </div>
                ) : (
                  ""
                )}
            </div>
          </div>

          <div className="navInput navNone">
            <input
              type="text"
              placeholder="Search Book"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((result) => (
                  <div
                    key={result._id}
                    className="search-item d-flex gap-1"
                    onClick={() => handleResultClick(result._id)}
                  >
                    <img
                      src={`http://localhost:5000/${result.image}`}
                      alt=""
                      style={{
                        width: "50px",
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        {result.title}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                        }}
                      >
                        {result.description.slice(0, 90)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="wrapper navNone">
            <DropdownButton
              align="end"
              title="Write"
              id="dropdown-menu-align-end"
              variant="transparent"
            >
              <Dropdown.Item eventKey="1">
                <div
                  className="d-flex gap-1"
                  onClick={() => handleNavigate("/create")}
                >
                  <img
                    src="https://www.wattpad.com/wp-web-assets/images/icons/create-story.svg"
                    alt=""
                  />
                  Create a new story
                </div>
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">
                <div
                  className="d-flex gap-1"
                  onClick={() => handleNavigate("/mystory")}
                >
                  My stories
                </div>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item
                eventKey="4"
                href="https://janeyburton.com/writing-advice-from-great-authors/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Helpful for writers
              </Dropdown.Item>
            </DropdownButton>
            <div className="dropdown">
              <button
                className="btn btn-transparent"
                type="button"
                data-bs-toggle="dropdown"
              >
                {user ? (
                  <div className="d-flex align-items-center gap-1 ">
                    <img
                      style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                      src={`http://localhost:5000/${user?.existUser?.image}`}
                    />
                    {user?.existUser?.username}
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <i className="fa-solid fa-user"></i>
                    <div>Sign In</div>
                  </div>
                )}
              </button>
              <ul className="dropdown-menu">
                {user ? (
                  <>
                    <li>
                      <Link className="dropdown-item logout " to="/userprofile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item logout " to="/profile">
                        Manage Account
                      </Link>
                    </li>
                    <li onClick={handleLogout}>
                      <Link className="dropdown-item logout " to="/">
                        Logout
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
          <RxHamburgerMenu onClick={toggle} className="burger" />
        </div>
        <div className="burger-menu">
          {show ? (
            <>
              <div className="wrapper d-flex flex-column justify-content-start">
                <div className="dropdown">
                  <button
                    className="btn btn-transparent"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    {user ? (
                      <div className="d-flex align-items-center gap-1 ">
                      <img
                        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                          src={`http://localhost:5000/${user?.existUser?.image}`}
                          alt=""
                        />
                        {user?.existUser?.username}
                      </div>
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        <i className="fa-solid fa-user"></i>
                        <div>Sign In</div>
                      </div>
                    )}
                  </button>
                  <ul className="dropdown-menu">
                    {user ? (
                      <>
                        <li>
                          <Link
                            className="dropdown-item logout "
                            to="/userprofile"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item logout " to="/profile">
                            Manage Account
                          </Link>
                        </li>
                        <li onClick={handleLogout}>
                          <Link className="dropdown-item logout " to="/">
                            Logout
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            className="dropdown-item register"
                            to="/register"
                          >
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
                <DropdownButton
                  align="end"
                  title="Write"
                  id="dropdown-menu-align-end"
                  variant="transparent"
                >
                  <Dropdown.Item eventKey="1">
                    <div
                      className="d-flex gap-1"
                      onClick={() => handleNavigate("/create")}
                    >
                      <img
                        src="https://www.wattpad.com/wp-web-assets/images/icons/create-story.svg"
                        alt=""
                      />
                      Create a new story
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2">
                    <div
                      className="d-flex gap-1"
                      onClick={() => handleNavigate("/mystory")}
                    >
                      My stories
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Divider />
                  <Dropdown.Item
                    eventKey="4"
                    href="https://janeyburton.com/writing-advice-from-great-authors/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Helpful for writers
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              <div className="navlist d-flex flex-column mb-2">
                <Dropdown>
                  <Dropdown.Toggle variant="" id="dropdown-custom-components">
                    Browse
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/allproduct">
                      All
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/allproduct?category=Romance">
                      Romance
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/allproduct?category=Horror">
                      Horror
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/allproduct?category=Fantasy">
                      Fantasy
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/allproduct?category=Mystery">
                      Mystery
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <div className="navlist-item">
                  <Link to="/wishlist">My Shelf</Link>
                </div>

                {user?.existUser?.isAdmin ? (
                  <div className="navlist-item">
                    <Link to="/admin">Admin</Link>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="navInput">
                <input
                  type="text"
                  placeholder="Search Book"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchResults.length > 0 && (
                  <div className="search-results">
                    {searchResults.map((result) => (
                      <div
                        key={result._id}
                        className="search-item d-flex gap-1"
                        onClick={() => handleResultClick(result._id)}
                      >
                        <img
                          src={`http://localhost:5000/${result.image}`}
                          alt=""
                          style={{
                            width: "50px",
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {result.title}
                          </div>
                          <div
                            style={{
                              fontSize: "10px",
                            }}
                          >
                            {result.description.slice(0, 90)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
