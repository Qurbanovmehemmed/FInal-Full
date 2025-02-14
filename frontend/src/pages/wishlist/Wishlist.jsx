import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, getUserWishlist, removeFromWishlist, updateWishlistStatus } from "../../redux/features/WishlistSlice";
import UserWishlist from "./wishlistbutton/UserWishlist";

const Wishlist = ({ userId, productId }) => {
  const dispatch = useDispatch();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);
  
  const [status, setStatus] = useState("wantToRead");

  // Wishlist-i yükləmək
  useEffect(() => {
    if (userId) {
      dispatch(getUserWishlist(userId));
    }
  }, [dispatch, userId]);

  // Wishlist-ə kitab əlavə etmək
  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ userId, productId, status }));
  };

  // Wishlist-dən kitab silmək
  const handleRemoveFromWishlist = (wishlistId) => {
    dispatch(removeFromWishlist(wishlistId));
  };

  // Wishlist statusunu yeniləmək
  const handleUpdateStatus = (wishlistId, newStatus) => {
    dispatch(updateWishlistStatus({ wishlistId, status: newStatus }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Your Wishlist</h2>
      <UserWishlist />
      
      {/* Wishlist-də kitabların göstərilməsi */}
      {wishlist.length > 0 ? (
        <ul>
          {wishlist.map((item) => (
            <li key={item._id}>
              <p>{item.user}</p>
              <h3>{item.product.title}</h3>
              <p>Status: {item.status}</p>

              {/* Statusu yeniləmək */}
              <button onClick={() => handleUpdateStatus(item._id, "wantToRead")}>
                Want to Read
              </button>
              <button onClick={() => handleUpdateStatus(item._id, "alreadyRead")}>
                Already Read
              </button>

              {/* Wishlist-dən kitabı silmək */}
              <button onClick={() => handleRemoveFromWishlist(item._id)}>
                Remove from Wishlist
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your wishlist is empty.</p>
      )}

      {/* Kitab əlavə etmək üçün form */}
      {/* <div>
        <h3>Add to Wishlist</h3>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="wantToRead">Want to Read</option>
          <option value="alreadyRead">Already Read</option>
        </select>
        <button onClick={handleAddToWishlist}>Add to Wishlist</button>
      </div> */}
    </div>
  );
};

export default Wishlist;
