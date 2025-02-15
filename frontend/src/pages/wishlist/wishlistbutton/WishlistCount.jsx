import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WishlistCount = ({ productId }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const filteredWishlist = wishlist.filter((item) => item.product._id === productId);
    setCount(filteredWishlist.length);
  }, [wishlist, productId]);

  return (
    <div className="wishlist-count">
      <p>{count} people have added this book to their wishlist.</p>
    </div>
  );
};

export default WishlistCount;
