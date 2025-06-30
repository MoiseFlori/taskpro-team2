import { createSlice } from "@reduxjs/toolkit";
import {
  registerThunk,
  loginThunk,
  logoutThunk,
  refreshUserThunk,
} from "./authThunk";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUserThunk.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      });
  },
});
export const { setToken, setUser, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
