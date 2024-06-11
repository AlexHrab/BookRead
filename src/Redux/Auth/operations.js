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

export const startTraining = createAsyncThunk(
  "auth/startPlaning",
  async (values, thunkAPI) => {
    try {
      const data = await baseUrl.post("/planning", values);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);

export const sendPages = createAsyncThunk(
  "send/auth",
  async (values, thunkAPI) => {
    // const token = thunkAPI.getState().auth.accessToken;
    // if (!token) {
    //   return;
    // }
    // addAccessToken(token);

    try {
      const data = await baseUrl.patch("/planning", values);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);

export const getPlaning = createAsyncThunk(
  "getPlaning/auth",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.accessToken;
    addAccessToken(token);
    try {
      const data = await baseUrl.get("/planning");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);

export const deleteBook = createAsyncThunk(
  "auth/delete",
  async (_, thunkAPI) => {
    try {
      const data = await baseUrl.delete("/book/66616314f8a2fb16ecaf34bf");
      // addAccessToken(data.data.accessToken);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);

export const getAllBooks = createAsyncThunk(
  "auth/books",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.accessToken;
    if (!token) {
      return;
    }
    addAccessToken(token);
    try {
      const data = await baseUrl.get("/user/books");
      // addAccessToken(data.data.accessToken);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);

export const bookReview = createAsyncThunk(
  "auth/review",
  async (value, thunkAPI) => {
    // const token = thunkAPI.getState().auth.accessToken;
    // if (!token) {
    //   return;
    // }
    // addAccessToken(token);
    try {
      const data = await baseUrl.patch(`/book/review/${value.id}`, {
        rating: value.rating,
        feedback: value.feedback,
      });
      // addAccessToken(data.data.accessToken);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);
