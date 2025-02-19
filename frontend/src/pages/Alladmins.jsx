import React, { useState } from "react";
import Admin from "./admin/Admin";
import UsersAdmin from "./usersAdmin/UsersAdmin";

const Alladmins = () => {
  const [selectedTab, setSelectedTab] = useState("books");

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-2">
          <div className="d-flex flex-column gap-2 justidy-content-center align-items-center">
            <h3>Admin Panel</h3>
            <div
              className={`tab-button ${
                selectedTab === "books" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("books")}
            >
              Books
            </div>
            <div
              className={`tab-button ${
                selectedTab === "users" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("users")}
            >
              Users
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content col-md-10">
          {selectedTab === "books" ? <Admin /> : <UsersAdmin />}
        </div>
      </div>
    </div>
  );
};

export default Alladmins;
