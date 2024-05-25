import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config";

export const addBook = createAsyncThunk(
  "book/add",
  async (values, thunkAPI) => {
    try {
      const data = await baseUrl.post("/book", values);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);
