import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteBasket } from "./BasketSlice";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, action) => {
      const existProduct = state.wishlist.find(
        (item) => item._id === action.payload._id
      );

      if (!existProduct) {
        state.wishlist.push(action.payload);
      } else {
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload._id
        );
      }
    },
    // deleteWishlist: (state, action) => {
    //   state.wishlist = state.wishlist.filter(
    //     (item) => item._id !== action.payload
    //   );
    // },
  },
});

export const { addWishlist, deleteWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
