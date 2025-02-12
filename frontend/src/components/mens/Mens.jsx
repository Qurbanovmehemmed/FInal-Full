import React, { useEffect } from "react";
import "./Mens.scss";
import Card from "../card/Card";
import mensBg from "../../assets/images/men-bg.jpg.webp";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/ProductSlice";

const Mens = () => {
  const dispatch = useDispatch();
  
  const { products } = useSelector((state) => state.products);

  const mensProducts = products
    .filter((pro) => pro.categories.map  === "idris")
    .slice(0, 4);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section
      className="mens-section"
      style={{ backgroundImage: `url(${mensBg})` }}
    >
      <div className="overlay"></div>
      <div className="container">
       
        <div className="row">
          {products &&
            products.map((product) => {
              return <Card key={product._id} product={product} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default Mens;
