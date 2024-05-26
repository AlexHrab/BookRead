import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config";

export const showContent = createAsyncThunk(
  "auth/showContent",
  async (value, thunkAPI) => {
    try {
      return value;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);
