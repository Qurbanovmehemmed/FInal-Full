import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist, removeFromWishlist, updateWishlistStatus } from "../../redux/features/WishlistSlice";
import WishlistButtons from "./wishlistbutton/Wishlistbutton";
import ButtonWishlist from "./wishlistbutton/ButtonWishlist";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getUserWishlist()); // Wishlist məlumatlarını çəkirik
  }, [dispatch]);

  const handleStatusChange = (productId, status) => {
    dispatch(updateWishlistStatus({ productId, status }));
  };

  const handleRemove = (wishlistId) => {
    dispatch(removeFromWishlist(wishlistId)); // Wishlist-dən silirik
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No books in your wishlist.</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li key={item._id}>
              <h3>{item.product.title}</h3>
              <p>Status: {item.status}</p>
              <ButtonWishlist productId={item.product._id} />
              <button onClick={() => handleStatusChange(item.product._id, "wantToRead")}>Want to Read</button>
              <button onClick={() => handleStatusChange(item.product._id, "alreadyRead")}>Already Read</button>
              <button onClick={() => handleRemove(item._id)}>Remove from Wishlist</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
