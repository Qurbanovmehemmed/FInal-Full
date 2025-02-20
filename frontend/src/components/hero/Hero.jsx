import React, { useState } from "react";
import { Carousel } from "react-bootstrap"; // Importing Bootstrap Carousel component
import "./Hero.scss";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate =useNavigate()
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="hero-section">
      <Carousel activeIndex={index} onSelect={handleSelect} fade>
        <Carousel.Item>
          <img
            className="d-block "
            src="	https://ma.wattpad.com/tacm_hfc_desktop_v4.jpg"
            alt="First slide"
            style={{
              width: "100%",
            }}
            onClick={() => navigate(`/productdetail/67acc58eb6e1b30939755717`)}
          />
          <Carousel.Caption>
            <h3>Explore New Books</h3>
            <p>
              Discover great books and share your thoughts with the community!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block "
            src="https://ma.wattpad.com/crash__hfc_desktop_v4.png"
            alt="Second slide"
            style={{
              width: "100%",
            }}
            onClick={() => navigate(`/productdetail/67b35641dd84935e2b96a495`)}
          />
          <Carousel.Caption>
            <h3>Join the Book Community</h3>
            <p>Read, review, and recommend your favorite books to others.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block "
            src="https://ma.wattpad.com/drive_hfc_desktop_v4.png"
            alt="Third slide"
            style={{
              width: "100%",
            }}
            onClick={() => navigate(`/productdetail/67b736ffd7397e80a84b8b23`)}
          />
          <Carousel.Caption>
            <h3>Your Next Favorite Book Awaits</h3>
            <p>
              Get personalized recommendations based on your reading
              preferences.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Hero;
