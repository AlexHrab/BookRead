import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  refresh,
  logout,
  fetchLocation,
  addBook,
  greating,
} from "./operations";

const initialState = {
  userData: {
    name: "",
    email: "",
    id: "",
  },
  trainingBookList: [],
  currentlyReading: [],
  finishedReading: [],
  goingToRead: [],
  sid: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  location: "/",
  greating: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.id = payload.userData.id;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.userData.id = payload.userData.id;
        state.userData.name = payload.userData.name;
        state.userData.email = payload.userData.email;
        state.sid = payload.sid;
        state.refreshToken = payload.refreshToken;
        state.isLoggedIn = true;
        state.greating = true;
        state.currentlyReading = payload.userData.currentlyReading;
        state.finishedReading = payload.userData.finishedReading;
        state.goingToRead = payload.userData.goingToRead;
      })
      .addCase(logout.fulfilled, (state) => {
        state.sid = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.sid = payload.newSid;
        state.accessToken = payload.newAccessToken;
        state.refreshToken = payload.newRefreshToken;
      })

      .addCase(fetchLocation.fulfilled, (state, { payload }) => {
        state.location = payload;
      })
      .addCase(greating.fulfilled, (state, { payload }) => {
        state.greating = payload;
      })
      .addCase(addBook.fulfilled, (state, { payload }) => {
        state.goingToRead.push(payload);
      });
  },
  reducers: {
    trainingBookList: (state, { payload }) => {
      const bookExists = state.trainingBookList.find(
        (book) => book._id === payload
      );
      if (!bookExists || state.trainingBookList.length === 0) {
        const book = state.goingToRead.find((book) => book._id === payload);

        state.trainingBookList.push(book);
      }
    },
    trainingItemDelete: (state, { payload }) => {
      state.trainingBookList = state.trainingBookList.filter(
        (book) => book._id !== payload
      );
    },
  },
});

export const authReducer = slice.reducer;

export const { trainingBookList, trainingItemDelete } = slice.actions;
