import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";

export const sendHelpThunk = createAsyncThunk(
  "help/sendHelp",
  async ({ email, comment }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/help", { email, comment });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const helpSlice = createSlice({
  name: "help",
  initialState: { loading: false, error: null, success: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendHelpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendHelpThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendHelpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default helpSlice.reducer;
