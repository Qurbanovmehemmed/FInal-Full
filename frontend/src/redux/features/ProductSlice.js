import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/api/products";
const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || [], // localStorage-dan məhsul məlumatlarını yükləyirik
  allProducts: [], 
};

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/update/${id}`, updatedData);
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Xəta baş verdi!");
    }
  }
);

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const { data } = await axios.get(baseURL);
  return data;
});

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(baseURL, product, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Xəta baş verdi");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    await axios.delete(`${baseURL}/${id}`);
    return id;
  }
);

export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async (search, { getState }) => {
    if (search === "") {
      return getState().products.allProducts;
    }
    const { data } = await axios.get(`${baseURL}/search/${search}`);
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    sortProductLowest: (state) => {
      state.products = state.products.sort((a, b) => a.price - b.price);
    },
    sortProductHigest: (state) => {
      state.products = state.products.sort((a, b) => b.price - a.price);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.allProducts = action.payload;
      localStorage.setItem("products", JSON.stringify(state.products)); // `localStorage`-a yazılır
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.products)); // `localStorage`-a yazılır
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("products", JSON.stringify(state.products)); // `localStorage`-a yazılır
    });
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const updatedProduct = action.payload;
      console.log(action.payload)
      state.products = state.products.map((product) =>
        product._id === updatedProduct.id ? updatedProduct : product
      );
      localStorage.setItem("products", JSON.stringify(state.products)); // `localStorage`-a yazılır
    });
  },
});

export const { sortProductHigest, sortProductLowest } = productSlice.actions;

export default productSlice.reducer;
