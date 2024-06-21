import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectLocation = (state) => state.auth.location;
export const selectUserName = (state) => state.auth.userData.name;
export const selectGreating = (state) => state.auth.greating;
export const selectGoingToRead = (state) => state.auth.goingToRead;
export const selectCurrentlyReading = (state) => state.auth.currentlyReading;
export const selectTrainingBookList = (state) => state.auth.trainingBookList;
export const selectUserStartDate = (state) => state.auth.startDate;
export const selectUserFinishDate = (state) => state.auth.finishDate;
export const selectRunDate = (state) => state.auth.runDate;
export const selectRefresh = (state) => state.auth.isRefreshing;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectFinishedReading = (state) => state.auth.finishedReading;
export const selectStats = (state) => state.auth.stats;
export const selectSum = (state) => state.auth.BooksPageSum;
export const selectOnlyRead = (state) => state.auth.onlyRead;
export const selectBooksLeft = (state) => state.auth.booksLeft;
export const selectDurationPlan = (state) => state.auth.durationPlan;
export const selectPagesPerDay = (state) => state.auth.pagesPerDay;

export const selectInitialValue = (state) => state.auth.initialValue;
export const selectInitialValuePlan = (state) => state.auth.initialValuePlan;

export const selectShowContent = (state) => state.auth.showContent;

export const selectIsLoading = (state) => state.auth.isLoading;
export const selectGoalsInterval = (state) => state.auth.GoalsInterval;
export const selectYearInterval = (state) => state.auth.YearInterval;
