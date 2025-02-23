import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

import Wishlist from "./pages/wishlist/Wishlist";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import ForgotPassword from "./pages/auth/forgotpassword/ForgotPassword";
import Resetpassword from "./pages/auth/resetpassword/Resetpassword";
import Profile from "./pages/Profile/Profile";
import Create from "./pages/Create/Create";
import ProtectAdmin from "./routes/protect/ProtectAdmin";
import UserProfile from "./pages/Profile/userProfile/UserProfile";
import Product from "./pages/Products/Product";
import Mystory from "./pages/MyStory/Mystory";
import ProtectedRoute from "./routes/ProtectRouter/ProtectedRoute";
import ProductDetail from "./pages/productdetail/ProductDetail";
import Alladmins from "./pages/Alladmins";
import ProtectLoginRegister from "./routes/ProtectLoginRegister";
import NotFoundPage from "./pages/notfoundPage/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allproduct",
        element: <Product />,
      },
   
      {
        path: "/productdetail/:id",
        element: <ProductDetail />,
      },

      {
        element: <ProtectAdmin />,
        children: [
          {
            path: "/admin",
            element: <Alladmins />,
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/wishlist",
            element: <Wishlist />,
          },
          {
            path: "/mystory",
            element: <Mystory />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/create",
            element: <Create />,
          },

          {
            path: "/userprofile",
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectLoginRegister />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },

  {
    path: "/resetpassword",
    element: <Resetpassword />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
