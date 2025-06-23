import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";

// Send help request (from the Need Help modal)
export const sendHelpRequest = createAsyncThunk(
  "help/sendHelpRequest",
  async (helpData, thunkAPI) => {
    try {
      const { data } = await axios.post("/help", helpData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
