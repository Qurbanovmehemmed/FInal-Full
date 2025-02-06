import React, { useEffect } from "react";
import "./Womens.scss";
import Title from "../title/Title";
import Card from "../card/Card";
import { getProducts } from "../../redux/features/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

const Womens = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const womensProducts = products
    .filter((pro) => pro.category === "Womens")
    .slice(0, 4);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <section className="womens-section">
      <div className="container">
        <Title>
          <h2>New realeased Products for Women</h2>
          <p>Who are in extremely love with eco friendly system.</p>
        </Title>
        <div className="row">
          {womensProducts &&
            womensProducts.map((product) => {
              return <Card key={product._id} product={product} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default Womens;
