import React, { useEffect, useState } from "react";
import "./Card.scss";
import { FaHeart } from "react-icons/fa6";
import { addBasket } from "../../redux/features/BasketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWishlist } from "../../redux/features/WishlistSlice";

const Card = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.wishlist);

  const [color, setColor] = useState(false);

  const findProduct = wishlist.find((item) => item._id === product._id);

  useEffect(() => {
    setColor(!!findProduct);
  }, [wishlist, color]);

  return (
    <div className="col-3">
      <div
        className="cards"
        onClick={() => navigate(`/productdetail/${product._id}`)}
      >
        <div className="heart-icon">
          <FaHeart
            style={{ color: color ? "red" : "black" }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addWishlist(product));
            }}
          />
        </div>
        <div className="image">
          <img src={`http://localhost:5000/${product.image}`} alt="" />
        </div>
        <div className="content">
          <div className="card-title">{product?.title}</div>
          <div className="card-price">${product?.price}</div>
          <button
            className="btn btn-primary mybtn"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addBasket(product));
            }}
          >
            Add to Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
