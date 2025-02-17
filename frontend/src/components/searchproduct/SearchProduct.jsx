import React from "react";
import "./SearchProduct.scss";

const SeacrhProduct = ({ product }) => {
  return (
    <div className="col-3">
      <div className="searchproduct">
        <div className="image">
          <img src={product?.image} alt="" />
        </div>
        <div className="searchcontent">
          <a className="title">adsas</a>
          <p className="price">asdasd</p>
        </div>
      </div>
    </div>
  );
};

export default SeacrhProduct;
