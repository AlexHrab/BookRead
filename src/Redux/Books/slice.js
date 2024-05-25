import { createSlice } from "@reduxjs/toolkit";
import { login } from "../Auth/operations";
import { addBook } from "./operations";

const initialState = {
  currentlyReading: [],
  finishedReading: [],
  goingToRead: [],
};

const slice = createSlice({
  name: "books",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.currentlyReading = payload.userData.currentlyReading;
        state.finishedReading = payload.userData.finishedReading;
        state.goingToRead = payload.userData.goingToRead;
      })
      .addCase(addBook.fulfilled, (state, { payload }) => {
        state.goingToRead.push(payload);
      });
  },
});

export const booksReducer = slice.reducer;
