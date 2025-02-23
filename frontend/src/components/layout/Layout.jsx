import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Chat from "../../pages/chat/Chat";
import { useSelector } from "react-redux";

const Layout = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  // Bu səhifələrdə <Chat/> görünməyəcək
  const hiddenRoutes = ["/register", "/login", "/resetpassword", "/forgotpassword", "/admin"];

  // Chat yalnız login olmuş istifadəçi üçün görünsün
  const isUserLoggedIn = user && user?.existUser?.isLogin;

  return (
    <div>
      <Header />
      <Outlet />
      {/* Check if the user is logged in and if the route is not in hiddenRoutes */}
      {!hiddenRoutes.includes(location.pathname) && isUserLoggedIn && <Chat />}
      <Footer />
    </div>
  );
};

export default Layout;
