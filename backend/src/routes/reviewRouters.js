import express from "express";
import { createReview, deleteReview, getReviewsByBook, updateReview } from "../controllers/rewievController.js";
import verifyToken from "../middleware/protected/verifyToken.js";

const reviewRoutes = express.Router();

reviewRoutes.post("/", verifyToken, createReview);
reviewRoutes.get("/:bookId", getReviewsByBook);
reviewRoutes.put("/:reviewId", verifyToken, updateReview);
reviewRoutes.delete("/:reviewId", verifyToken, deleteReview);

export default reviewRoutes;
