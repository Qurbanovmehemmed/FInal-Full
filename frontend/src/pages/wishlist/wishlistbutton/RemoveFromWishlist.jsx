import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateWishlistStatus } from "../../../redux/features/WishlistSlice";

const RemoveFromWishlistButton = ({ productId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId); // Redux store-dan istifadəçi ID-sini alırıq

  const handleRemoveFromWishlist = async () => {
    if (!userId) {
      console.log("İstifadəçi login olunmayıb.");
      return;
    }

    try {
      const response = await axios.delete(`/wishlist/remove/${productId}`, {
        data: { userId }, // İstifadəçi ID-sini göndəririk
      });
      console.log("Wishlist-dən silindi:", response.data);
      dispatch(updateWishlistStatus(response.data)); // Wishlist-i yeniləyirik (Redux)
    } catch (error) {
      console.log("Wishlist-dən silərkən xəta:", error.message);
    }
  };

  return (
    <button onClick={handleRemoveFromWishlist}>
      Wishlist-dən sil
    </button>
  );
};

export default RemoveFromWishlistButton;
