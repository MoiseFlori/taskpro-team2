import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { setAuthToken } from "../../utils/axiosConfig";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/users/register", data);
      setAuthToken(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", data);
      const { accessToken, user } = res.data;

      setAuthToken(accessToken);
      return { user, token: accessToken }; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.get("/users/logout");
      setAuthToken(null);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (!token) return thunkAPI.rejectWithValue("No token");

    try {
      setAuthToken(token);
      const res = await axios.get("/users/current");

      const { user, token: newToken } = res.data;

      setAuthToken(newToken);
      return { user, token: newToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to refresh user"
      );
    }
  }
);
