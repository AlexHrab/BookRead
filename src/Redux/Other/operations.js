import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config";

export const showContent = createAsyncThunk(
  "other/showContent",
  async (value, thunkAPI) => {
    try {
      return value;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);

export const runDate = createAsyncThunk(
  "other/runDate",
  async (value, thunkAPI) => {
    try {
      return value;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);

export const userStartDate = createAsyncThunk(
  "other/startDate",
  async (value, thunkAPI) => {
    try {
      return value;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);

export const userFinishDate = createAsyncThunk(
  "other/finish",
  async (value, thunkAPI) => {
    try {
      return value;
    } catch (error) {
      return thunkAPI.rejectWithValue(alert(error.message));
    }
  }
);
