import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  getProducts,
  deleteProduct,
  searchProduct,
  sortProductLowest,
  sortProductHigest,
  addProduct,
} from "../../redux/features/ProductSlice";
import CategorySelect from "../../components/catSelect/CategorySelect";
import RatingInput from "../../components/catSelect/RatingInput";
import { productSchema } from "../../schema/ProductCreateSchema";
import Table from "react-bootstrap/Table";
import "./Admin.scss";

const Admin = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const {
    values,
    handleChange,
    setFieldValue,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      image: null,
      title: "",
      description: "",
      author: "",
      categories: [],
      price: "",
      rating: 0,
    },
    validationSchema: productSchema,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("🟢 Form Submit oldu!");

    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("author", values.author);
    // formData.append("categories", selectedCategories.map(cat => cat.value));
    selectedCategories.forEach(cat => {
      formData.append("categories[]", cat.value);
    });
    formData.append("price", values.price);
    formData.append("rating", rating);

    console.log("📩 Göndərilən FormData:", Object.fromEntries(formData));

    try {
      const response = await dispatch(addProduct(formData));
      console.log("✅ Product əlavə edildi:", response);
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className="container">
      {open && (
        <form encType="multipart/form-data" className="form" onSubmit={handleFormSubmit}>
          <h3>Create Product</h3>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <div className="text-danger">{errors.image}</div>
            <input
              type="file"
              id="image"
              className="form-control"
              onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <div className="text-danger">{errors.title}</div>
            <input
              type="text"
              id="title"
              className="form-control"
              onChange={handleChange}
              value={values.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <div className="text-danger">{errors.description}</div>
            <textarea
              id="description"
              className="form-control"
              onChange={handleChange}
              value={values.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <div className="text-danger">{errors.author}</div>
            <input
              type="text"
              id="author"
              className="form-control"
              onChange={handleChange}
              value={values.author}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categories">Categories</label>
            <div className="text-danger">{errors.category}</div>
            <CategorySelect
              categories={["Romance", "Fantasy", "Horror","Mystery"]}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <div className="text-danger">{errors.price}</div>
            <input
              type="text"
              id="price"
              className="form-control"
              onChange={handleChange}
              value={values.price}
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <RatingInput rating={rating} setRating={setRating} />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      )}
      <h2 className="text-center my-3">Admin Panel</h2>
      <div className="mb-2 d-flex justify-content-between">
        <button className="btn btn-success" onClick={() => setOpen(!open)}>
          Create
        </button>
        <input
          type="text"
          onChange={(e) => dispatch(searchProduct(e.target.value))}
        />
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => dispatch(sortProductLowest())}
          >
            Low
          </button>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(sortProductHigest())}
          >
            High
          </button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Description</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={`http://localhost:5000/${item.image}`}
                    alt=""
                  />
                </td>
                <td>{item.title}</td>
                <td>
                  {item.categories?.map((cat, index) => (
                    <button className="d-flex " key={index}>
                      {cat}
                    </button>
                  ))}
                </td>
                <td>{item.price}</td>
                <td>{item.rating}</td>
                <td>{item.description}</td>
                <td>{item.author}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(deleteProduct(item._id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Admin;
