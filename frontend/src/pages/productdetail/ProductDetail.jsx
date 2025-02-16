import React, { useState, useEffect } from "react";
import "./ProductDetail.scss";
import { data, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiUser } from "react-icons/hi2";
import axios from "axios";
import RatingInput from "../../components/catSelect/RatingInput";
import WishlistButtons from "../wishlist/wishlistbutton/Wishlistbutton";
import WishlistCount from "../wishlist/wishlistbutton/WishlistCount";
import { MdNavigateNext } from "react-icons/md";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate =useNavigate()
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [editingReview, setEditingReview] = useState(null);
  const [editingComment, setEditingComment] = useState(null);

  const findProduct = products.find((product) => product._id === id);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reviews/${id}`, { withCredentials: true })
      .then((response) => {
        setReviews(response.data.reviews);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reviews/${id}`, { withCredentials: true })
      .then((response) => {
        const updatedReviews = response.data.reviews.map((review) => ({
          ...review,
          comments: review.comments || [], // Ensure comments is always an array
        }));
        setReviews(updatedReviews);
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
    const totalReviews = reviews.length;

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);

    return totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;
  };

  const averageRating = calculateAverageRating(reviews);

  const [commentText, setCommentText] = useState("");
  const [openCommentSection, setOpenCommentSection] = useState(null);

  const toggleComments = (reviewId) => {
    setOpenCommentSection(openCommentSection === reviewId ? null : reviewId);
  };

  const handleLikeReview = async (reviewId) => {
    try {
      // Like əməliyyatını serverə göndəririk
      const { data } = await axios.put(
        `http://localhost:5000/api/reviews/like/${reviewId}`,
        {},
        { withCredentials: true }
      );

      // Serverdən yenilənmiş like sayını alırıq
      const { data: reviewsData } = await axios.get(
        `http://localhost:5000/api/reviews/${id}`, // Müvafiq review'ların olduğu yeri almaq
        { withCredentials: true }
      );

      // Yenilənmiş review-ları set edirik
      setReviews(reviewsData.reviews);
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  const handleAddComment = async (reviewId) => {
    if (!commentText.trim()) return;

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/reviews/comment/${reviewId}`,
        { text: commentText },
        { withCredentials: true }
      );

      console.log("Server response:", data);

      if (data?.review?.comments) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId
              ? { ...review, comments: [...data.review.comments] }
              : review
          )
        );
      } else {
        console.error("No comment data received from the server.");
      }

      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
    window.location.reload();
  };

  // const handleEditComment = async (reviewId) => {
  //   // Şərh mətni boşsa və ya editingComment mövcud deyilsə, əməliyyat etməməliyik
  //   if (!editingComment?.text.trim() || !editingComment) return;

  //   // Cookies-dən tokeni alırıq
  //   const token = cookies.get('token');
  //   if (!token) {
  //     console.error("Token not found in cookies!");
  //     return;
  //   }

  //   try {
  //     // PUT sorğusunu göndəririk
  //     const response = await axios.put(
  //       `http://localhost:5000/api/reviews/comment/${reviewId}/${editingComment._id}`,
  //       { text: editingComment.text },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Tokeni header-da göndəririk
  //         },
  //         withCredentials: true, // Cookies göndərmək üçün bu seçimi saxlayırıq
  //       }
  //     );

  //     console.log("Response after editing comment:", response.data);

  //     // Yenilənmiş şərhləri tətbiq edirik
  //     setCommentText(""); // Şərh mətni təmizlənir
  //     setReviews((prevReviews) =>
  //       prevReviews.map((review) =>
  //         review._id === reviewId
  //           ? {
  //               ...review,
  //               comments: review.comments.map((c) =>
  //                 c._id === editingComment._id
  //                   ? { ...c, text: editingComment.text } // Redaktə olunmuş şərh
  //                   : c
  //               ),
  //             }
  //           : review
  //       )
  //     );

  //     setEditingComment(null); // Redaktə bitdi, resetləyirik
  //   } catch (error) {
  //     console.error("Error editing comment:", error);
  //   }

  //   // Konsol log ilə reviewId və editingComment._id-yi yoxlaya bilərsiniz
  //   console.log("Review ID:", reviewId);
  //   console.log("Comment ID:", editingComment?._id);
  // };

  useEffect(() => {}, [reviews]);

  const handleDeleteComment = async (reviewId, commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/reviews/comment/${reviewId}/${commentId}`,
        { withCredentials: true }
      );

      setReviews(
        reviews.map((r) =>
          r._id === reviewId
            ? { ...r, comments: r.comments.filter((c) => c._id !== commentId) }
            : r
        )
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const commentUser = (comment) => {
    const isUserComment = user?.existUser?._id === comment.userId;

    if (isUserComment) {
      return user.existUser.username;
    } else {
      return comment.userId !== user?.existUser?._id ? comment.username : "";
    }
  };
  const goBack = () => {
    navigate(-1); // Bu, istifadəçini əvvəlki səhifəyə qaytaracaq
  };

  return (
    <>
      <div className="container">
      
      </div>
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

                <WishlistButtons userId={user?.existUser?._id} productId={id} />
                <div className="d-flex mb-2 align-items-center gap-2">
          <div>
            <div className="backHover" onClick={goBack} style={{marginTop:"10px"}}>
              {" "}
              Back
            </div>
          </div>
          
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

                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-light"
                                onClick={() => handleLikeReview(review?._id)}
                              >
                                👍 {review?.likes?.length} Like
                              </button>
                              <button
                                className="btn btn-light"
                                onClick={() => toggleComments(review?._id)}
                              >
                                💬 Comments ({review?.comments?.length})
                              </button>
                            </div>
                            {openCommentSection === review?._id && (
                              <div className="comments mt-2">
                                {review.comments?.length > 0 &&
                                  review.comments.map((comment) => (
                                    <div key={comment._id} className="comment ">
                                      <div className="">
                                        <div className="d-flex gap-2 align-items-center">
                                          <div className="commentImg">
                                            <img
                                              src={`http://localhost:5000/${comment.image}`}
                                              alt=""
                                            />
                                          </div>
                                          <strong>{comment?.username}</strong>
                                        </div>
                                        <div className="commentContent">
                                          <div>{comment.text}</div>
                                        </div>
                                      </div>

                                      {user &&
                                      user.existUser?._id ===
                                        comment?.userId ? (
                                        <>
                                          <div className="deleteComment">
                                            <p
                                              onClick={() =>
                                                handleDeleteComment(
                                                  review._id,
                                                  comment._id
                                                )
                                              }
                                            >
                                              Delete
                                            </p>
                                          </div>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  ))}
                                <div className="add-comment mt-2">
                                  <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) =>
                                      setCommentText(e.target.value)
                                    }
                                    placeholder="Write a comment..."
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => handleAddComment(review._id)}
                                  >
                                    Add Comment
                                  </button>
                                </div>
                              </div>
                            )}
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
          <div
            className="col-md-3 shadow p-4 "
            style={{
              background: "#fff",
              borderRadius: "10px",
              maxHeight: "885px",
            }}
          >
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
                .slice(0, 5)
                .map((product) => (
                  <div key={product._id} className="similar-product-card  mt-4">
                    <div className="d-flex gap-2">
                      <div className=" similarImage">
                        <img
                          src={`http://localhost:5000/${product.image}`}
                          alt={product.title}
                          style={{
                            cursor:"pointer"
                          }}
                          onClick={() =>
                            navigate(`/productdetail/${product._id}`)
                          }
                        />
                      </div>
                      <div>
                        <h6
                          style={{
                            fontWeight: "700",
                            maxWidth: "180px",
                          }}
                        >
                          {product.title}
                        </h6>
                        <p className="similarDescription">
                          {product.description.slice(0, 110) + " ..."}
                        </p>
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
