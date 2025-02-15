import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Axios konfiqurasiyası
axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ productId, status }, { rejectWithValue, getState }) => {
    try {
      const userId = getState().user.user?.existUser?._id;
      if (!userId) throw new Error("User not logged in");

      // Wishlist-də mövcud olan məhsulu tapmaq
      const existingItem = getState().wishlist.wishlist.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        // Əgər kitab artıq wishlist-dədirsə və eyni statusda deyilsə, yenilə və ya sil
        if (existingItem.status === status) {
          // Əgər artıq eyni statusdadırsa, silmək
          await axios.delete(`/wishlist/remove/${existingItem._id}`);
          return { productId, status: "removed" }; // Silinmiş məhsulun məlumatı
        } else {
          // Əgər status fərqlidirsə, statusu yenilə
          await axios.put("/wishlist/update", {
            userId,
            productId: existingItem.productId, // Burada existingItem.productId olmalıdır
            status,
          });
          return { productId, status: "updated" }; // Yenilənmiş məhsulun məlumatı
        }
      } else {
        // Əgər məhsul wishlist-də yoxdursa, yeni məhsul əlavə et
        const response = await axios.post("/wishlist/add", {
          userId,
          productId,
          status,
        });
        return response.data; // Yeni məhsul əlavə ediləcək
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error adding to wishlist"
      );
    }
  }
);


// 📌 İstifadəçinin wishlist kitablarını al
export const getUserWishlist = createAsyncThunk(
  "wishlist/getUserWishlist",
  async (_, { rejectWithValue, getState }) => {
    try {
      const userId = getState().user.user?.existUser?._id;
      if (!userId) throw new Error("User not logged in");

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
  async ({ userId, productId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/wishlist/update", {
        userId,
        productId, // Burada productId istifadə olunur
        status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error updating wishlist status"
      );
    }
  }
);


// 📌 Wishlist-dən kitabı sil
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (wishlistId, { rejectWithValue }) => {
    try {
      await axios.delete(`/wishlist/remove/${wishlistId}`);
      return wishlistId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error removing from wishlist"
      );
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
  reducers: {
    clearWishlist: (state) => {
      state.wishlist = []; // Wishlist təmizlənir
    },
  },
  extraReducers: (builder) => {
    builder
      // 📌 Wishlist-ə əlavə et
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist.push(action.payload.wishlistItem); // Əlavə olunan kitab wishlist-ə əlavə olunur
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
        const index = state.wishlist.findIndex(
          (item) => item._id === action.payload.wishlistItem._id
        );
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
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice;
