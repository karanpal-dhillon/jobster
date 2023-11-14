import { createSlice } from "@reduxjs/toolkit";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils";
import { toast } from "react-toastify";
import { loginUser, registerUser, updateUser } from "./userThunk";

const initialState = {
  loading: false,
  user: getUserFromLocalStorage(),
  isSidebarOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logout: (state) => {
      removeUserFromLocalStorage();
      state.isSidebarOpen = false;
      state.user = null;
    },
  },

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
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.loading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success("user updated successfully");
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export const selectLoading = (state) => state.user.loading;
export const selectUser = (state) => state.user.user;
export const selectIsSidebarOpen = (state) => state.user.isSidebarOpen;
export const { toggleSidebar, logout } = userSlice.actions;
export default userSlice.reducer;
