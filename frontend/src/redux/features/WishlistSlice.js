import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Birbaşa axios-u import edirik

// Axios konfiqurasiyası (credentials üçün)
axios.defaults.baseURL = "http://localhost:5000/api"; // Backend server URL
axios.defaults.withCredentials = true; // Cookies və session üçün

// 📌 Wishlist-ə kitab əlavə et
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, productId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/wishlist/add", { userId, productId, status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding to wishlist");
    }
  }
);

// 📌 İstifadəçinin wishlist kitablarını al
export const getUserWishlist = createAsyncThunk(
  "wishlist/getUserWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/wishlist/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching wishlist");
    }
  }
);

// 📌 Wishlist statusunu yenilə
export const updateWishlistStatus = createAsyncThunk(
  "wishlist/updateWishlistStatus",
  async ({ wishlistId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/wishlist/update", { wishlistId, status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating wishlist status");
    }
  }
);

// 📌 Wishlist-dən kitabı sil
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (wishlistId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/wishlist/remove/${wishlistId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error removing from wishlist");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 Wishlist-ə əlavə et
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist.push(action.payload.wishlistItem);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📌 Wishlist-i gətir
      .addCase(getUserWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📌 Wishlist statusunu yenilə
      .addCase(updateWishlistStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWishlistStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.wishlist.findIndex((item) => item._id === action.payload.wishlistItem._id);
        if (index !== -1) {
          state.wishlist[index] = action.payload.wishlistItem;
        }
      })
      .addCase(updateWishlistStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📌 Wishlist-dən kitabı sil
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = state.wishlist.filter((item) => item._id !== action.meta.arg);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice;
