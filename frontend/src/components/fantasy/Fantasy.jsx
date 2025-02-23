import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/ProductSlice";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Card from "../card/Card";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

const Fantasy = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const FantasyProducts = products.filter((product) =>
    product.categories.includes("Fantasy")
  );

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5, 
    slidesToScroll: 3,
    responsive: [
   
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-2">
        <h3>Fantasy</h3>
        <Link to={"/allproduct"} className="d-flex align-items-center  ">
          view all
          <MdNavigateNext />
        </Link>
      </div>

      <Slider {...sliderSettings}>
        {FantasyProducts.map((product) => (
          <div key={product._id} >
            <Card product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};



export default Fantasy;