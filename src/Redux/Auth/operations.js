import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config";
import { addAccessToken, clearAccessToken } from "../../../config";

export const register = createAsyncThunk(
  "auth/register",
  async (values, thunkAPI) => {
    try {
      const data = await baseUrl.post("/auth/register", values);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (values, thunkAPI) => {
    try {
      const data = await baseUrl.post("/auth/login", values);
      addAccessToken(data.data.accessToken);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await baseUrl.post("/auth/logout");
    clearAccessToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(alert(error.message));
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const authSid = thunkAPI.getState().auth.sid;
  const token = thunkAPI.getState().auth.refreshToken;
  if (!token) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }
  addAccessToken(token);
  try {
    const data = await baseUrl.post("/auth/refresh", { sid: authSid });
    addAccessToken(data.data.newAccessToken);

    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(alert(error.message));
  }
});

export const fetchLocation = createAsyncThunk(
  "auth/location",
  async (value, thunkAPI) => {
    try {
      return value;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);

export const greating = createAsyncThunk(
  "auth/greating",
  async (value, thunkAPI) => {
    try {
      return value;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);

export const addBook = createAsyncThunk(
  "auth/add",
  async (values, thunkAPI) => {
    try {
      const data = await baseUrl.post("/book", values);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);
