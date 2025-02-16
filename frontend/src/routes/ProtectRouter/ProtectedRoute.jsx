import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.user);

  if (!user?.existUser?.isLogin) {
    toast.error("Please login first", { position: "top-right" });
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
