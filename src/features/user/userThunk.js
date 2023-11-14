import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./userSlice";
import { customAxios } from "../../utils";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await customAxios.post("/auth/register", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const response = await customAxios.post("/auth/login", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const response = await customAxios.patch(`/auth/updateUser`, user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue("Unauthorized! logging out");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);
