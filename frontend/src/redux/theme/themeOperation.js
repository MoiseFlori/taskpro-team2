import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";

export const getTheme = createAsyncThunk(
  "users/getTheme",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/users/current");
      return { theme: data.user.theme };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateTheme = createAsyncThunk(
  "users/updateTheme",
  async (theme, thunkAPI) => {
    try {
      const { data } = await axios.patch("users/current/theme", { theme });
      console.log("🧪 Răspuns din backend updateTheme:", data); // Asta trebuie să apară
      return { theme: data.theme };
    } catch (error) {
      console.log(
        "❌ Eroare updateTheme:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
