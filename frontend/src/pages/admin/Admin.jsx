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
      updateProduct, // ✅ Update üçün əlavə olundu
    } from "../../redux/features/ProductSlice";
    import CategorySelect from "../../components/catSelect/CategorySelect";
    import Table from "react-bootstrap/Table";
    import "./Admin.scss";

    const Admin = () => {
      const { products } = useSelector((state) => state.products);
      const dispatch = useDispatch();
      const [selectedCategories, setSelectedCategories] = useState([]);
      const [open, setOpen] = useState(false);
      const [editProduct, setEditProduct] = useState(null); // ✅ Redaktə olunan məhsulun məlumatlarını saxlayırıq

      useEffect(() => {
        dispatch(getProducts());
      }, [dispatch]);

      const formik = useFormik({
        initialValues: {
          id: "", // _id ilə başlayır
          image: null,
          title: "",
          description: "",
          author: "",
          categories: [],
        },
        onSubmit: async (values, { resetForm }) => {
          console.log("📩 Form dəyərləri:", values);
          const formData = new FormData();
          formData.append("id", values._id);
          formData.append("image", values.image);
          formData.append("title", values.title);
          formData.append("description", values.description);
          formData.append("author", values.author);
          selectedCategories.forEach((cat) => {
            formData.append("categories[]", cat.value);
          });
      console.log(values)

      
          try {
            if (editProduct) {
              // Yeniləmə əməliyyatı
              const response = await dispatch(updateProduct({ id: values.id, updatedData: formData }));
              console.log("✅ Update cavabı:", response);
            } else {
              // Yeni məhsul əlavə etmək
              const response = await dispatch(addProduct(formData));
              console.log("✅ Add cavabı:", response);
            }
            resetForm();
            setOpen(false);
            setEditProduct(null);
          } catch (error) {
            console.error("❌ Error:", error);
          }
        },
      });
      

      const handleEdit = (product) => {
        setEditProduct(product);
        setOpen(true);
      
        formik.setValues({
          id: product._id, // _id-ni formaya daxil edin
          title: product.title,
          description: product.description,
          author: product.author,
          categories: product.categories || [],
          image: product.image || null,
        });
      
        setSelectedCategories(product.categories?.map((cat) => ({ label: cat, value: cat })) || []);
      };
      

      return (
        <div className="container">
          {open && (
            <form encType="multipart/form-data" className="form" onSubmit={formik.handleSubmit}>
              <h3>{editProduct ? "Edit Product" : "Create Product"}</h3>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])}
                />
                {editProduct && <p>Current Image: {editProduct.image}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.author}
                />
              </div>
              <div className="form-group">
                <label htmlFor="categories">Categories</label>
                <CategorySelect
                  categories={["Romance", "Fantasy", "Horror", "Mystery"]}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {editProduct ? "Update" : "Add"}
              </button>
            </form>
          )}
          <h2 className="text-center my-3">Admin Panel</h2>
          <div className="mb-2 d-flex justify-content-between">
            <button className="btn btn-success" onClick={() => setOpen(!open)}>
              Create
            </button>
            <input type="text" onChange={(e) => dispatch(searchProduct(e.target.value))} />
            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={() => dispatch(sortProductLowest())}>
                Low
              </button>
              <button className="btn btn-primary" onClick={() => dispatch(sortProductHigest())}>
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
                <th>Author</th>
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
                    <td>{item._id}</td>
                    <td>
                      {item.categories?.map((cat, index) => (
                        <button className="d-flex" key={index}>
                          {cat}
                        </button>
                      ))}
                    </td>
                    <td>{item.author}</td>
                    <td>{item.description}</td>
                    <td>
                      <button className="btn btn-warning mx-2" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => dispatch(deleteProduct(item._id))}>
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
