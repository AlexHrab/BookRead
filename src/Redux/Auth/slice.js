import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  refresh,
  logout,
  fetchLocation,
  addBook,
  greating,
  getAllBooks,
} from "./operations";

const initialState = {
  userData: {
    name: "",
    email: "",
    id: "",
  },
  runDate: false,
  startDate: "",
  finishDate: "",
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
        // state.currentlyReading = payload.userData.currentlyReading;
        // state.finishedReading = payload.userData.finishedReading;
        // state.goingToRead = payload.userData.goingToRead;
      })
      .addCase(logout.fulfilled, (state) => {
        state.sid = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.startDate = "";
        state.finishDate = "";
        state.trainingBookList = [];
        state.runDate = false;
      })
      .addCase(getAllBooks.fulfilled, (state, { payload }) => {
        state.currentlyReading = payload.currentlyReading;
        state.finishedReading = payload.finishedReading;
        state.goingToRead = payload.goingToRead;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.sid = payload.newSid;
        state.accessToken = payload.newAccessToken;
        state.refreshToken = payload.newRefreshToken;
        state.isRefreshing = false;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
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
    userStartDate: (state, { payload }) => {
      state.startDate = payload;
    },
    userFinishDate: (state, { payload }) => {
      state.finishDate = payload;
    },
    runDate: (state, { payload }) => {
      state.runDate = payload;
    },
  },
});

export const authReducer = slice.reducer;

export const {
  trainingBookList,
  trainingItemDelete,
  userStartDate,
  userFinishDate,
  runDate,
} = slice.actions;
