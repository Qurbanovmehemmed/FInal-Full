import Product from "../models/productModel.js";
import user from "../models/userModel.js";
import Wishlist from "../models/wishlistModel.js";

// 📌 Wishlist-ə kitab əlavə etmək
export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId, status } = req.body;

    // Check if required fields are missing
    if (!userId || !productId) {
      return res.status(400).json({ message: "userId və productId tələb olunur" });
    }

    // Fetch user and product data
    const foundUser = await user.findById(userId); // `user` model search
    const product = await Product.findById(productId);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a new Wishlist item with product details
    const wishlistItem = new Wishlist({
      user: userId,
      product: {
        _id: product._id, // Add the product's ID from the Product model
        image: product.image, // Get the image from the product data
        title: product.title, // Get the title from the product data
        description: product.description, // Get the description from the product data
        author: product.author, // Get the author from the product data
        price: product.price, // Get the price from the product data
        categories: product.categories, // Get categories from the product data
        rating: product.rating, // Get the rating from the product data
      },
      status: status || 'wantToRead', // Default to 'wantToRead' if no status provided
      addedAt: new Date()
    });

    await wishlistItem.save();
    res.status(201).json({ message: "Book added to wishlist", wishlistItem });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 İstifadəçinin Wishlist-də olan bütün kitablarını almaq
export const getUserWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlistItems = await Wishlist.find({ user: userId }).populate("product").exec();

    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error("Xəta baş verdi:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Wishlist-də kitab statusunu dəyişmək
export const updateWishlistStatus = async (req, res) => {
  try {
    const { wishlistId, status } = req.body;

    const wishlistItem = await Wishlist.findById(wishlistId);

    if (!wishlistItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    wishlistItem.status = status;
    await wishlistItem.save();

    res.status(200).json({ message: "Wishlist status updated", wishlistItem });
  } catch (error) {
    console.error("Xəta baş verdi:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Wishlist-dən kitabı silmək
export const removeFromWishlist = async (req, res) => {
  try {
    const { wishlistId } = req.params;

    const wishlistItem = await Wishlist.findById(wishlistId);

    if (!wishlistItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    await wishlistItem.deleteOne();

    res.status(200).json({ message: "Book removed from wishlist" });
  } catch (error) {
    console.error("Xəta baş verdi:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
