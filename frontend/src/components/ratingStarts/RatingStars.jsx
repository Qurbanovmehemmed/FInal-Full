import React from "react";
import "./RatingStars.css"

const RatingStars = ({ rating }) => {
  // Ulduz sayını yuvarlayın
  const fullStars = Math.floor(rating); // Tam ulduzlar
  const halfStar = rating % 1 >= 0.5; // Yarı ulduz
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Boş ulduzlar

  return (
    <div className="rating-stars">
      {[...Array(fullStars)].map((_, index) => (
        <span key={index} className="star full">★</span>
      ))}
      
      {/* Yarı ulduzu göstər */}
      {halfStar && <span className="star half">★</span>}
      
      {/* Boş ulduzları göstər */}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className="star empty">☆</span>
      ))}
    </div>
  );
};

export default RatingStars;
