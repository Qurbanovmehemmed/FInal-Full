import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { addToWishlist, updateWishlistStatus } from "../../../redux/features/WishlistSlice";
import "./Wishlistbutton.css";

const ButtonWishlist = ({ productId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); 
  const { wishlist } = useSelector((state) => state.wishlist); 
  const userId = user?.existUser?._id; 

  const [selectedStatus, setSelectedStatus] = useState(null); 

  const currentStatus = wishlist.find(item => item.product._id === productId)?.status || null;

  useEffect(() => {
    setSelectedStatus(currentStatus); 
  }, [currentStatus]);

  if (!userId) return null; 

  const handleStatusChange = (status) => {
    if (currentStatus && currentStatus === status) {
      toast.info("This book is already in your wishlist with the selected status.");
      return; 
    }

    if (currentStatus) {
      dispatch(updateWishlistStatus({ userId, productId, status }));
      toast.success("Wishlist status updated!");
    } else {
      dispatch(addToWishlist({ userId, productId, status }));
      toast.success("Book added to wishlist!");
    }

    setSelectedStatus(status); 
  };

  return (
    <div className="d-flex gap-2 flex-wrap">
      <button
        onClick={() => handleStatusChange("wantToRead")}
        className={`btn ${selectedStatus === "wantToRead" ? "btn-success" : "btn-outline-success"}`}
      >
        {selectedStatus === "wantToRead" ? "✅ Want to Read" : "Want to Read"}
      </button>

      <button
        onClick={() => handleStatusChange("alreadyRead")}
        className={`btn ${selectedStatus === "alreadyRead" ? "btn-success" : "btn-outline-success"}`}
      >
        {selectedStatus === "alreadyRead" ? "✅ Already Read" : "Already Read"}
      </button>
    </div>
  );
};

export default ButtonWishlist;
