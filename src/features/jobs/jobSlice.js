import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customAxios, getUserFromLocalStorage } from "../../utils";
import { toast } from "react-toastify";
import { logout } from "../user/userSlice";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "intenship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJobThunk = createAsyncThunk(
  "jobs/createJob",
  async (job, thunkAPI) => {
    const user = thunkAPI.getState().user.user;
    try {
      const response = await customAxios.post(`/jobs`, job, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      thunkAPI.dispatch(clearState());
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue("Unauthorized! Logging out");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearState: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage().location?.location || "",
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createJobThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJobThunk.fulfilled, (state, payload) => {
        state.isLoading = false;
        toast.success(`job added successfully`);
        console.log(payload);
      })
      .addCase(createJobThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const selectJob = (state) => state.job;

export const { handleChange, clearState } = jobSlice.actions;
export default jobSlice.reducer;
