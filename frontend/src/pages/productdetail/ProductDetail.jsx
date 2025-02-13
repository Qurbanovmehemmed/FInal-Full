import React, { useState, useEffect } from "react";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiUser } from "react-icons/hi2";
import axios from "axios";
import RatingInput from "../../components/catSelect/RatingInput";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [editingReview, setEditingReview] = useState(null);

  const findProduct = products.find((product) => product._id === id);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reviews/${id}`, { withCredentials: true })
      .then((response) => {
        setReviews(response.data.reviews);
      });
  }, [id]);

  const handleAddReview = async () => {
    if (!reviewText.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/reviews",
        { bookId: id, content: reviewText, rating },
        { withCredentials: true }
      );

      const { data } = await axios.get(
        `http://localhost:5000/api/reviews/${id}`,
        { withCredentials: true }
      );

      setReviews(data.reviews);
      setReviewText("");
      setRating(5);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleEditReview = async () => {
    if (!reviewText.trim() || !editingReview) return;

    try {
      await axios.put(
        `http://localhost:5000/api/reviews/${editingReview._id}`,
        { content: reviewText, rating },
        { withCredentials: true }
      );

      const { data } = await axios.get(
        `http://localhost:5000/api/reviews/${id}`,
        { withCredentials: true }
      );

      setReviews(data.reviews);
      setReviewText("");
      setRating(5);
      setEditingReview(null);
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
        withCredentials: true,
      });

      const { data } = await axios.get(
        `http://localhost:5000/api/reviews/${id}`,
        { withCredentials: true }
      );

      setReviews(data.reviews);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const calculateAverageRating = (reviews) => {
    // Rəylərin ümumi sayını tapmaq
    const totalReviews = reviews.length;

    // Bütün rəylərin cəmindən rating-ləri toplamaq
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);

    // Orta qiymətləndirməni tapmaq
    return totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0; // 1 ondalıklı dəqiqlik ilə göstərmək
  };

  // Misal olaraq istifadə
  const averageRating = calculateAverageRating(reviews);
  console.log(`Ortalama Rating: ${averageRating}`);

  return (
    <>
      <div className="shadow bg-body">
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center flex-wrap gap-5">
              <div className="detail-image">
                <img
                  src={`http://localhost:5000/${findProduct?.image}`}
                  alt=""
                />
              </div>
              <div className="detail-content">
                <span>Wattpad Original</span>
                <h2>{findProduct?.title}</h2>
                <div className="categories d-flex gap-2">
                  {findProduct?.categories?.map((category, index) => (
                    <span key={index} className="category-badge">
                      {category}
                    </span>
                  ))}
                </div>

                <div className="ratArea">
                  <div
                    className="d-flex  align-items-center justify-content-center gap-2"
                    style={{
                      color: "#777",
                    }}
                  >
                    <i className="fa-regular fa-star"></i>
                    <p style={{ marginBottom: "0px" }}> rating</p>
                  </div>
                  <p>{averageRating}</p>
                </div>

                <div>
                  <button className="btn btn-success customGreenBtn">
                    I want to read
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-4">
          <div className="col-md-9">
            <div className="tabs">
              <button
                className={`tab-button ${
                  selectedTab === "description" ? "active" : ""
                }`}
                onClick={() => setSelectedTab("description")}
              >
                Story line By Author
              </button>
              <button
                className={`tab-button ${
                  selectedTab === "reviews" ? "active" : ""
                }`}
                onClick={() => setSelectedTab("reviews")}
              >
                Reviews ({reviews.length})
              </button>
            </div>

            {selectedTab === "description" ? (
              <div className="detail-description mt-3">
                <div className="d-flex gap-3 align-items-center">
                  <div className="user">
                    <HiUser />
                  </div>
                  <h4>{findProduct?.author}</h4>
                </div>
                <p>{findProduct?.description}</p>
              </div>
            ) : (
              <div className="tab-content">
                <div className="reviews-section mt-3">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review._id} className="review">
                        <div className="d-flex gap-3">
                          <div className="userRew">
                            {review.userId?.image ? (
                              <img
                                src={`http://localhost:5000/${review.userId.image}`}
                                alt="User"
                                className="review-user-image"
                              />
                            ) : (
                              <HiUser />
                            )}
                          </div>
                          <div>
                            <div className="d-flex gap-1 ">
                              <h5>{review.userId?.username || "Anonymous"}</h5>
                              <div className="stars">
                                {[...Array(5)].map((_, index) => (
                                  <i
                                    key={index}
                                    className={`fa-star rewievStar ${
                                      index < review.rating
                                        ? "fa-solid"
                                        : "fa-regular"
                                    }`}
                                    style={{ color: "#FFDD45" }}
                                  ></i>
                                ))}
                              </div>
                            </div>
                            <div className="review-actions">
                              <p className="text-muted">
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </div>

                            <p className="rewContent">{review.content}</p>
                          </div>
                        </div>

                        <div className="review-actions">
                          {user &&
                            user.existUser?._id === review?.userId?._id && ( // Check if the logged-in user is the author of the review
                              <>
                                <div className="d-flex gap-1">
                                  <button
                                    className="btn btn-sm btn-warning"
                                    onClick={() => {
                                      setEditingReview(review);
                                      setReviewText(review.content);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                      handleDeleteReview(review._id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}

                  {user && (
                    <div className="add-review mt-3">
                      <textarea
                        className="form-control"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write a review..."
                      />
                      <RatingInput rating={rating} setRating={setRating} />
                      <button
                        className="btn btn-success mt-2 mx-2"
                        onClick={
                          editingReview ? handleEditReview : handleAddReview
                        }
                      >
                        {editingReview ? "Update Review" : "Add Review"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="col-md-3 shadow p-4 " style={{background:"#fff" ,borderRadius:"10px"}}>
            <h5>You may also like</h5>
            <div className="similar-products ">
              {products
                .filter(
                  (product) =>
                    product._id !== id &&
                    product.categories.some((category) =>
                      findProduct?.categories.includes(category)
                    )
                )
                .slice(0, 5 )
                .map((product) => (
                  <div key={product._id} className="similar-product-card  mt-4">
                    <div className="d-flex gap-2">
                    <div className=" similarImage">
                      <img
                        src={`http://localhost:5000/${product.image}`}
                        alt={product.title}
                      />
                    </div>
                    <div>
                    <h6 style={{
                      fontWeight: "700",
                      maxWidth:"180px"
                    }}>{product.title}</h6>
                    <p className="similarDescription">{product.description.slice(0,110)+ " ..."}</p>
                    </div>
                    
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
