import React, { useState } from "react";
import StarRatings from "react-star-ratings";

const RatingInput = ({ rating, setRating }) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="gold"
      changeRating={setRating}
      numberOfStars={5}
      name="rating"
      starDimension="30px"
      starSpacing="5px"
    />
  );
};
  {/* <div className="form-group">
            <label>Rating</label>
            <RatingInput rating={rating} setRating={setRating} />
          </div> */}
export default RatingInput;
