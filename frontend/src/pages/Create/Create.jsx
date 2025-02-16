import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProducts } from "../../redux/features/ProductSlice";
import { useFormik } from "formik";
import { productSchema } from "../../schema/ProductCreateSchema";
import CategorySelect from "../../components/catSelect/CategorySelect";
import RatingInput from "../../components/catSelect/RatingInput";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./Create.scss";

const Create = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // Yeni state

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setFieldValue("image", file);
      setPreviewImage(URL.createObjectURL(file)); // Önizləmə üçün URL yaradılır
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { values, handleChange, setFieldValue, errors, resetForm } = useFormik({
    initialValues: {
      image: null,
      title: "",
      description: "",
      author: user?.existUser?.name || "",
      categories: [],
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
    selectedCategories.forEach((cat) => {
      formData.append("categories[]", cat.value);
    });
    formData.append("rating", rating);

    console.log("📩 Göndərilən FormData:", Object.fromEntries(formData));

    try {
      const response = await dispatch(addProduct(formData));
      console.log("✅ Product əlavə edildi:", response);
      resetForm();
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className="container">
      <form
        encType="multipart/form-data"
        className=""
        onSubmit={handleFormSubmit}
      >
        <div className="row">
          <div className="col-md-3 mt-3">
            <div className="form-group">
                <div className="text-danger">{errors.image}</div>

              <div className="image-upload-wrapper position-relative d-inline-block" style={{ width: "100%", height: "400px" }}>
                <input
                  type="file"
                  id="image"
                  className="d-none"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                <label
                  htmlFor="image"
                  className="btn btn-primary d-flex flex-column align-items-center justify-content-center"
                  style={{
                    width: "100%",
                    height: "400px",
                    background: "#eee",
                    color: "#333",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  <FaCloudUploadAlt size={30} />
                  <span>Add Cover</span>
                </label>

                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="position-absolute top-0 start-0 w-100 h-100 rounded"
                    style={{ objectFit: "cover", zIndex: 1 }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-9 mt-3">
            <div className="shadow">
              <div className="storyStart">
                <h4>Story Details</h4>

                <div className="line"></div>
              </div>
              <div className="form-groupCreate">
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
              <div className="form-groupCreate">
                <label htmlFor="description">Description</label>
                <div className="text-danger">{errors.description}</div>
                <textarea
                  id="description"
                  className="form-control"
                  onChange={handleChange}
                  value={values.description}
                />
              </div>
              <div className="form-groupCreate">
                <label htmlFor="author">Author</label>
                <div className="text-danger">{errors.author}</div>
                <input
                  type="text"
                  id="author"
                  className="form-control"
                  onChange={handleChange}
                  value={values.author}
                  readOnly
                />
              </div>
              <div className="form-groupCreate">
                <label htmlFor="categories">Categories</label>
                <div className="text-danger">{errors.category}</div>
                <CategorySelect
                  categories={["Romance", "Horror", "Fantasy","Mystery"]}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />
              </div>
              
            
              <div
                className="form-groupCreate "
                style={{ marginTop: "20px", paddingBottom: "20px" }}
              >
                <button type="submit" className="btn btn-success">
                  Create a story
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
