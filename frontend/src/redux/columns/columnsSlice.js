import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";

// FETCH columns by boardId
export const fetchColumnsThunk = createAsyncThunk(
  "columns/fetchColumns",
  async (boardId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/boards/${boardId}/columns`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ADD column
export const addColumnThunk = createAsyncThunk(
  "columns/addColumn",
  async ({ title, boardId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/columns`, { title, boardId });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// EDIT column
export const editColumnThunk = createAsyncThunk(
  "columns/editColumn",
  async ({ id, title }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/api/columns/${id}`, { title });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE column
export const deleteColumnThunk = createAsyncThunk(
  "columns/deleteColumn",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/columns/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const columnsSlice = createSlice({
  name: "columns",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumnsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColumnsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchColumnsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addColumnThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(editColumnThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })

      .addCase(deleteColumnThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      });
  },
});

export default columnsSlice.reducer;
