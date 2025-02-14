import express from "express";
import { addToWishlist, getUserWishlist, removeFromWishlist, updateWishlistStatus } from "../controllers/wishlistController.js";


const wishlistRouter = express.Router();

// Kitab əlavə etmək (POST)
wishlistRouter.post("/add", addToWishlist);

wishlistRouter.get("/:userId", getUserWishlist);

// Kitab statusunu yeniləmək (PUT)
wishlistRouter.put("/update", updateWishlistStatus);

// Wishlist-dən kitab silmək (DELETE)
wishlistRouter.delete("/remove/:wishlistId", removeFromWishlist);

export default wishlistRouter;
