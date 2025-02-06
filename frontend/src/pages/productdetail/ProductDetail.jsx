import React from "react";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBasket } from "../../redux/features/BasketSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const findProduct = products.find((product) => product._id === id);
  return (
    <div className=" container ">
      <div className="row">
        <div className="col-6">
          <div className="detail-image">
            <img src={findProduct?.image} alt="" />
          </div>
        </div>
        <div className="col-6">
          <div className="detail-content">
            <div className="detail-title">{findProduct?.title}</div>
            <div className="detail-category">{findProduct?.category}</div>
            <div className="detail-price">{findProduct?.price}</div>
            <button
              className="btn btn-primary mybtn"
              onClick={() => dispatch(addBasket(findProduct))}
            >
              Add to Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
