import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import jobSlice from "./features/jobs/jobSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
  },
});

export default store;
