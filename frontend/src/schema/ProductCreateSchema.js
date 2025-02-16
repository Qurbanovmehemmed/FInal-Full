import * as yup from "yup";

export const productSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup.mixed().required("Category is required"),
  image: yup.mixed().required("Image is required"),
});
