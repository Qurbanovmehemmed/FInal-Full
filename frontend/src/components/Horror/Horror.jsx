import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/ProductSlice";
import Slider from "react-slick"; // React Slick kitabxanası
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Card from "../card/Card";

const Horror = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const HorrorProducts = products.filter((product) =>
    product.categories.includes("Horror")
  );

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6, // Masaüstü görünüşdə 6 məhsul göstər
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // Kiçik ekranlar (mobil)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-2">
        <h3>Horror</h3>
        <p>view all</p>
      </div>

      <Slider {...sliderSettings}>
        {HorrorProducts.map((product) => (
          <div key={product._id} className="col-2">
            <Card product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};



export default Horror;