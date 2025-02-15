import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // React Toastify stilini əlavə edin
import { addToWishlist, updateWishlistStatus } from "../../../redux/features/WishlistSlice";
import "./Wishlistbutton.css";

const ButtonWishlist = ({ productId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // Redux-dan istifadəçi məlumatlarını alırıq
  const { wishlist } = useSelector((state) => state.wishlist); // Wishlist məlumatlarını alırıq
  const userId = user?.existUser?._id; // İstifadəçi ID-si

  const [selectedStatus, setSelectedStatus] = useState(null); // Seçilmiş status

  // Wishlist-də kitabın mövcud statusunu tapmaq (default olaraq null)
  const currentStatus = wishlist.find(item => item.product._id === productId)?.status || null;

  useEffect(() => {
    setSelectedStatus(currentStatus); // Başlanğıcda mövcud statusu göstər
  }, [currentStatus]);

  if (!userId) return null; // İstifadəçi yoxdursa, butonları göstərmirik

  const handleStatusChange = (status) => {
    if (currentStatus && currentStatus === status) {
      toast.info("This book is already in your wishlist with the selected status.");
      return; // Əgər artıq eyni statusdadırsa, heç bir əməliyyat etmirik
    }

    if (currentStatus) {
      dispatch(updateWishlistStatus({ userId, productId, status }));
      toast.success("Wishlist status updated!");
    } else {
      // Yeni əlavə etmə əməliyyatı
      dispatch(addToWishlist({ userId, productId, status }));
      toast.success("Book added to wishlist!");
    }

    setSelectedStatus(status); // Seçimi yadda saxla
  };

  return (
    <div className="d-flex gap-2 flex-wrap">
      {/* "Want to Read" status düyməsi */}
      <button
        onClick={() => handleStatusChange("wantToRead")}
        className={`btn ${selectedStatus === "wantToRead" ? "btn-success" : "btn-outline-success"}`}
      >
        {selectedStatus === "wantToRead" ? "✅ Want to Read" : "Want to Read"}
      </button>

      {/* "Already Read" status düyməsi */}
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
