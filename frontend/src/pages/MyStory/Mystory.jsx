import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteProduct } from "../../redux/features/ProductSlice";

const Mystory = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products); // Access products from Redux state
  const [reviews, setReviews] = useState({});
  const navigate = useNavigate();

  const myStoryProducts = products.filter(
    (product) => product.author === user.existUser.name
  );

  useEffect(() => {
    myStoryProducts.forEach(async (product) => {
      try {
        const reviewResponse = await axios.get(
          `http://localhost:5000/api/reviews/${product._id}`,
          { withCredentials: true }
        );
        const reviewData = reviewResponse.data;

        const averageRating =
          reviewData.reviews && reviewData.reviews.length > 0
            ? reviewData.reviews.reduce(
                (acc, review) => acc + review.rating,
                0
              ) / reviewData.reviews.length
            : 0;

        setReviews((prevReviews) => ({
          ...prevReviews,
          [product._id]: {
            rating: averageRating,
            reviewCount: reviewData.reviews.length,
          },
        }));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    });
  }, [myStoryProducts]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h2>My Story</h2>
          {myStoryProducts.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "30px" }}>
              No books found 😢
            </p>
          ) : (
            <div className="wishlist-items d-flex flex-column gap-3">
              {myStoryProducts.map((product) => (
                <div key={product._id} className="wishlist-item row p-3">
                  <div className="col-sm-2">
                    <img
                      style={{
                        width: "100%",
                        cursor: "pointer",
                      }}
                      src={`http://localhost:5000/${product.image}`}
                      alt={product.title}
                      className="wishlist-img"
                      onClick={() => navigate(`/productdetail/${product._id}`)}
                    />
                  </div>
                  <div className="col-sm-10 d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between ">
                      <h3 style={{ fontWeight: "bold" }}>{product.title}</h3>
                    </div>
                    <p>Author: {product.author}</p>

                    {/* Rating */}
                    <div className="d-flex gap-1 align-items-center ">
                      Rating:{" "}
                      {reviews[product._id] ? (
                        <>
                          <div className="d-flex gap-1 align-items-center ">
                            <StarRatings
                              rating={reviews[product._id].rating}
                              starRatedColor="gold"
                              numberOfStars={5}
                              starDimension="20px"
                              starSpacing="1px"
                            />
                            <div>
                              ({reviews[product._id].rating.toFixed(1)})
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="d-flex gap-1 align-items-center ">
                            <StarRatings
                              starRatedColor="gold"
                              numberOfStars={5}
                              starDimension="20px"
                              starSpacing="1px"
                            />
                            <div>(0.0)</div>
                          </div>
                        </>
                      )}
                    </div>

                    <p style={{ color: "#595959", marginTop: "5px" }}>
                      {product.description.length > 300
                        ? product.description.slice(0, 300) + "..."
                        : product.description}
                    </p>

                    <div
                      className="d-flex gap-2 justify-content-between"
                      style={{ color: "#595959" }}
                    >
                      <p className="d-flex gap-1">
                        Categories:
                        {product?.categories.map((cat, index) => (
                          <span key={index}>{cat}</span>
                        ))}
                      </p>
                    </div>

                    <div className="d-flex gap-2 justify-content-end">
                      <button
                        className="btn btn-danger"
                        onClick={() => dispatch(deleteProduct(product._id))}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mystory;
