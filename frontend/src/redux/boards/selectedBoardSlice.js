import { createSlice } from "@reduxjs/toolkit";

const selectedBoardSlice = createSlice({
  name: "selectedBoard",
  initialState: null,
  reducers: {
    setSelectedBoard: (_, action) => action.payload,
  },
});

export const { setSelectedBoard } = selectedBoardSlice.actions;
export default selectedBoardSlice.reducer;
