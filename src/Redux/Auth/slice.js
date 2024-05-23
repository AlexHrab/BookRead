import { createSlice } from "@reduxjs/toolkit";
import { register, login, refresh, logout, fetchLocation } from "./operations";

const initialState = {
  userData: {
    name: "",
    email: "",
    id: "",
  },
  sid: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  location: "/",
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
        state.isLoggedIn = true;
      })
      .addCase(fetchLocation.fulfilled, (state, { payload }) => {
        state.location = payload;
      });
  },
});

export const authReducer = slice.reducer;
