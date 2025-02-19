import product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const { title, description, author,   rating } = req.body;

    const imageUrl = `images/${req.file.filename}`.replace(/\\/g, "/");

    const categories = req.body.categories
  ? (Array.isArray(req.body.categories) ? req.body.categories : [req.body.categories])
  : [];

    const newProduct = new product({
      title,
      description,
      author,
      categories,
      
      rating,
      image: imageUrl,
    });

    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await product.find();

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedproduct = await product.findByIdAndDelete(id);

    if (!deletedproduct) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchProduct = async (req, res) => {
  const { title } = req.params;

  try {
    const products = await product.find({
      title: { $regex: title, $options: "i" },
    });

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Get the productId from the URL params
    const { title, description, author, rating } = req.body;

    // Retrieve the current product to get its existing image (if it has one)
    const existingProduct = await product.findById(productId); // Make sure you're using 'product' here

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If a new image is uploaded, use it. Otherwise, keep the existing image.
    let imageUrl = existingProduct.image; // Use the image from the existing product
    if (req.file) {
      imageUrl = `images/${req.file.filename}`.replace(/\\/g, "/");
    }

    // Handle categories - make sure it's an array
    const categories = req.body.categories
      ? (Array.isArray(req.body.categories) ? req.body.categories : [req.body.categories])
      : [];

    // Update the product with the new data
    const updatedProduct = await product.findByIdAndUpdate( // Again, use 'product' here
      productId,
      {
        title,
        description,
        author,
        categories,
        rating,
        image: imageUrl,
      },
      { new: true } // This will return the updated product
    );

    return res.status(200).json(updatedProduct); // Send the updated product
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
  




