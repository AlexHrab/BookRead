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
  sendPages,
  getPlaning,
  startTraining,
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
  stats: [],
  sid: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  location: "/",
  greating: false,
  BooksPageSum: null,
  onlyRead: null,
  isLoading: false,
  error: null,

  booksLeft: [],
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
        // state = initialState;
        state.sid = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.startDate = "";
        state.finishDate = "";
        state.trainingBookList = [];
        state.runDate = false;
        state.stats = [];
        state.currentlyReading = [];
        state.finishedReading = [];
        state.goingToRead = [];
        state.BooksPageSum = null;
        state.onlyRead = null;
      })
      .addCase(getAllBooks.fulfilled, (state, { payload }) => {
        state.currentlyReading = payload.currentlyReading;
        state.finishedReading = payload.finishedReading;
        state.goingToRead = payload.goingToRead;
        state.isLoading = false;

        const List = state.trainingBookList.map((item1) => {
          const isReading = state.finishedReading.find(
            (item2) => item2._id === item1._id
          );
          if (isReading) {
            return { ...item1, isChecked: true };
          }
          return { ...item1, isChecked: false };
        });
        // console.log(List);

        state.trainingBookList = List;
        // state.trainingBookList = [];
      })
      .addCase(getAllBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBooks.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
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
      })
      .addCase(sendPages.fulfilled, (state, { payload }) => {
        const totalPages = payload.planning.stats.reduce(
          (sum, book) => sum + book.pagesCount,
          0
        );
        state.onlyRead = totalPages;
        if (state.onlyRead >= state.BooksPageSum) {
          // console.log(totalPages);
          state.stats = payload.planning.stats;
          // state.runDate = false;
          // state.startDate = "";
          // state.finishDate = "";
          // state.stats = [];
          // state.trainingBookList = [];
        } else {
          state.stats = payload.planning.stats;
        }
      })
      .addCase(getPlaning.fulfilled, (state, { payload }) => {
        state.stats = payload.planning.stats;
      })
      .addCase(startTraining.fulfilled, (state, { payload }) => {
        state.stats = [];
        // state.trainingBookList = [];
      });
  },
  reducers: {
    trainingBookList: (state, { payload }) => {
      const bookExists = state.trainingBookList.find(
        (book) => book._id === payload
      );
      if (
        !bookExists
        //  || state.trainingBookList.length === 0
      ) {
        const book = state.goingToRead.find((book) => book._id === payload);

        const bookWithChecked = { ...book, isChecked: false };
        state.trainingBookList.push(bookWithChecked);
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
    BooksPageSum: (state) => {
      const totalPages = state.trainingBookList.reduce(
        (sum, book) => sum + book.pagesTotal,
        0
      );
      state.BooksPageSum = totalPages;
    },
    NewTraining: (state) => {
      state.runDate = false;
      state.startDate = "";
      state.finishDate = "";
      state.stats = [];
      state.trainingBookList = [];
      state.BooksPageSum = null;
      state.onlyRead = null;
    },
    setBooksLeft: (state) => {
      state.booksLeft = state.trainingBookList.filter(
        (book) => !book.isChecked
      );
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
  BooksPageSum,
  NewTraining,
  setBooksLeft,
} = slice.actions;
