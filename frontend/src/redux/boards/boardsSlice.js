import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";

// Fetch all boards
export const fetchBoardsThunk = createAsyncThunk(
  "boards/fetchBoards",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/boards");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create new board
export const createBoardThunk = createAsyncThunk(
  "boards/createBoard",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/boards", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Edit board
export const editBoardThunk = createAsyncThunk(
  "boards/editBoard",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/api/boards/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete board
export const deleteBoardThunk = createAsyncThunk(
  "boards/deleteBoard",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/boards/${id}`);
      return id; // Return the deleted board's id for removal in the reducer
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch boards
      .addCase(fetchBoardsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoardsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create board
      .addCase(createBoardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = [action.payload, ...state.boards];
      })
      .addCase(createBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit board
      .addCase(editBoardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.boards.findIndex((b) => b._id === action.payload._id);
        if (idx !== -1) {
          state.boards = [
            ...state.boards.slice(0, idx),
            action.payload,
            ...state.boards.slice(idx + 1),
          ];
        }
      })
      .addCase(editBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete board
      .addCase(deleteBoardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted board from the state by id
        state.boards = state.boards.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBoardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default boardsSlice.reducer;
