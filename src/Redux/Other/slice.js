import { createSlice } from "@reduxjs/toolkit";
import {
  runDate,
  showContent,
  userFinishDate,
  userStartDate,
} from "./operations";

const initialState = {
  showContent: false,
  // runDate: false,
  startDate: "",
  finishDate: "",
};

const slice = createSlice({
  name: "other",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(showContent.fulfilled, (state, { payload }) => {
        state.showContent = payload;
      })
      .addCase(runDate.fulfilled, (state, { payload }) => {
        state.runDate = payload;
      })
      // .addCase(userStartDate.fulfilled, (state, { payload }) => {
      //   state.startDate = payload;
      // })
      .addCase(userFinishDate.fulfilled, (state, { payload }) => {
        state.finishDate = payload;
      });
  },
});

export const otherReducer = slice.reducer;
