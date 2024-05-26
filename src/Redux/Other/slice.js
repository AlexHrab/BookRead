import { createSlice } from "@reduxjs/toolkit";
import { showContent } from "./operations";

const initialState = {
  showContent: false,
};

const slice = createSlice({
  name: "other",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(showContent.fulfilled, (state, { payload }) => {
      state.showContent = payload;
    });
  },
});

export const otherReducer = slice.reducer;
