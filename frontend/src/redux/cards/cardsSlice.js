import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/cards", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  }
);

export const createCard = createAsyncThunk(
  "cards/createCard",
  async (cardData, thunkAPI) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardData),
    });

    const data = await res.json();
    if (!res.ok) {
      return thunkAPI.rejectWithValue(data);
    }

    return data.card;
  }
);
  
export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/cards/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async ({ id, updatedCard }, thunkAPI) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/cards/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCard),
    });
    return await res.json();
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
        state.items = action.payload;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // Adauga cardul nou in lista
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
