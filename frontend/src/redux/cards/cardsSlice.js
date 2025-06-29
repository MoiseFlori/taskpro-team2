import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { setAuthToken } from "../../utils/axiosConfig";

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue("No token");

    setAuthToken(token); // sets the global header
    const res = await axios.get("/api/cards");
    return res.data;
    // const token = localStorage.getItem("token");
    // const res = await fetch("/api/cards", {
    //   headers: { Authorization: `Bearer ${token}` },
    //   credentials: "include",
    // });
    // return await res.json();
  }
);

export const createCard = createAsyncThunk(
  "cards/createCard",
  async (cardData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (!token) return thunkAPI.rejectWithValue("No token");

    setAuthToken(token);
    try {
        const res = await axios.post("/api/cards", cardData, { withCredentials: true });
        return res.data.card;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Error adding card");
    }
    // const token = localStorage.getItem("token");
    // const res = await fetch("/api/cards", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   credentials: "include",
    //   body: JSON.stringify(cardData),
    // });

    // const data = await res.json();
    // if (!res.ok) {
    //   return thunkAPI.rejectWithValue(data);
    // }

    // return data.card;
  }
);
  
export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (!token) return thunkAPI.rejectWithValue("No token");

    setAuthToken(token);  
    try {
        await axios.delete(`/api/cards/${id}`, { withCredentials: true });
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting card"
        );
    }
        
    // const token = localStorage.getItem("token");
    // await fetch(`/api/cards/${id}`, {
    //   method: "DELETE",
    //   headers: { Authorization: `Bearer ${token}` },
    //   credentials: "include",
    // });
    // return id;
  }
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async ({ id, updatedCard }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (!token) return thunkAPI.rejectWithValue("No token");
        
    setAuthToken(token);
    try {
      const res = await axios.patch(`/api/cards/${id}`, updatedCard, { withCredentials: true });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error updating card"
    );
    }
    // const token = localStorage.getItem("token");
    // const res = await fetch(`/api/cards/${id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   credentials: "include",
    //   body: JSON.stringify(updatedCard),
    // });
    // return await res.json();
  }
);

export const redirectCard = createAsyncThunk(
  "cards/redirectCard",
  async ({ cardId, targetColumnId }) => {
    const res = await axios.patch(`/api/cards/${cardId}`, { column: targetColumnId });
    return res.data;
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // Adds new card in list
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.items = state.items.filter((card) => card._id !== action.payload);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (card) => card._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(redirectCard.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (card) => card._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("cards/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});



export default cardsSlice.reducer;
