import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateWishlistStatus } from "../../../redux/features/WishlistSlice";

const AddToWishlistButton = ({ productId, status }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId); // Redux store-dan istifadəçi ID-sini alırıq

  const handleAddToWishlist = async () => {
    if (!userId) {
      console.log("İstifadəçi login olunmayıb.");
      return;
    }

    try {
      const response = await axios.post("/wishlist/add", {
        userId, // İstifadəçi ID-sini göndəririk
        productId,
        status,
      });
      console.log("Wishlist-ə əlavə edildi:", response.data);
      dispatch(updateWishlistStatus(response.data)); // Wishlist-i yeniləyirik (Redux)
    } catch (error) {
      console.log("Wishlist-a əlavə edərkən xəta:", error.message);
    }
  };

  return (
    <button onClick={handleAddToWishlist}>
      Wishlist-ə əlavə et
    </button>
  );
};

export default AddToWishlistButton;
