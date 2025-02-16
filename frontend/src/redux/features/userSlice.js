import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: storedUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLogout: (state) => {
      state.user = null;

      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setLogout } = userSlice.actions;
export default userSlice;
