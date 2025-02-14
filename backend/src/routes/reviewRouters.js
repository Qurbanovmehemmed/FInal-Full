import express from "express";
import { addComment, createReview, deleteComment, deleteReview, editComment, getReviewsByBook, toggleLikeReview, updateReview } from "../controllers/rewievController.js";
import verifyToken from "../middleware/protected/verifyToken.js";

const reviewRoutes = express.Router();

reviewRoutes.post("/", verifyToken, createReview);
reviewRoutes.get("/:bookId", getReviewsByBook);
reviewRoutes.put("/:reviewId", verifyToken, updateReview);
reviewRoutes.delete("/:reviewId", verifyToken, deleteReview);

// Like API
reviewRoutes.put("/like/:reviewId", verifyToken, toggleLikeReview);

// Comment API-ləri
reviewRoutes.post("/comment/:reviewId", verifyToken, addComment);
reviewRoutes.put("/comment/:reviewId/:commentId", verifyToken, editComment);
reviewRoutes.delete("/comment/:reviewId/:commentId", verifyToken, deleteComment);

export default reviewRoutes;
