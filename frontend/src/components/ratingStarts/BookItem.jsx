import React from "react";
import RatingStars from "./RatingStars"; // Bu komponenti daha əvvəl yaratdığınız RatingStars komponenti ilə əvəzləyin

const BookItem = ({ item, reviews }) => {
  // Orta qiymətini və ulduzları göstərmək üçün
  const rating = reviews[item.product._id]
    ? reviews[item.product._id].rating
    : null;

  return (
    <div className="book-item">
      <h3>{item.product.title}</h3>
      
      {/* Qiymətləndirməni yoxlayıb, ya ulduzları ya da "N/A" göstəririk */}
      <div>
        {rating ? (
          <>
            <RatingStars rating={rating} /> {/* Ulduzları göstərir */}
            <p>{rating.toFixed(1)} / 5</p> {/* Orta qiymət */}
          </>
        ) : (
          <p>N/A</p>
        )}
      </div>
    </div>
  );
};

export default BookItem;
