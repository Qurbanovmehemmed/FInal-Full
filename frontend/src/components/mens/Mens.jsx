import React, { useEffect } from "react";
import "./Mens.scss";
import Title from "../title/Title";
import Card from "../card/Card";
import mensBg from "../../assets/images/men-bg.jpg.webp";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/ProductSlice";

const Mens = () => {
  const dispatch = useDispatch();
  
  const { products } = useSelector((state) => state.products);

  const mensProducts = products
    .filter((pro) => pro.category === "Food")
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
        <Title>
          <h2>New realeased Products for Men</h2>
          <p>Who are in extremely love with eco friendly system.</p>
        </Title>
        <div className="row">
          {mensProducts &&
            mensProducts.map((product) => {
              return <Card key={product._id} product={product} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default Mens;
