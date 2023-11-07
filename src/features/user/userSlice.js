import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addUserToLocalStorage,
  customAxios,
  getUserFromLocalStorage,
} from "../../utils";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await customAxios.post("/auth/testingRegister", user);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        console.log("insider fulfilled state");
        const { user } = payload;
        state.user = user;
        state.loading = false;
        addUserToLocalStorage(user);
        toast.success("Successfully Registered");
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.loading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success("Logged in successfully");
      });
  },
});

export const selectLoading = (state) => state.user.loading;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
