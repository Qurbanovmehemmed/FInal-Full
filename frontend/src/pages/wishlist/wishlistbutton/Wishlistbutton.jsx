import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../../redux/features/WishlistSlice";

const WishlistButtons = ({ userId, productId }) => {
  const [status, setStatus] = useState("wantToRead");
  const dispatch = useDispatch();

  // Wishlist-ə kitab əlavə etmək funksiyası
  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ userId, productId, status }));
  };

  return (
    <div className="d-flex gap-2 flex-wrap">
      <button
        className="btn btn-success customGreenBtn"
        onClick={() => {
          setStatus("wantToRead");
          handleAddToWishlist(); // Buton basıldığında wishlist-ə kitabı əlavə et
        }}
      >
        I want to read
      </button>
      <button
        className="btn btn-secondary customGreenBtn"
        onClick={() => {
          setStatus("alreadyRead");
          handleAddToWishlist(); // Buton basıldığında wishlist-ə kitabı əlavə et
        }}
      >
        Already read this book
      </button>
    </div>
  );
};

export default WishlistButtons;
