import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChefs } from "../../services/getChefs";

export interface ChefState {
  status: string;
  chefs: Chef[] | null;
}

export const getChefsThunk = createAsyncThunk("get/chefs", async () => {
  try {
    let response = await getChefs();
    return response;
  } catch (err) {
  }
});

const initialState: ChefState = {
  status: "",
  chefs: null,
};

export const chefSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChefsThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getChefsThunk.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.chefs = action.payload;
    });
    builder.addCase(getChefsThunk.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export default chefSlice.reducer;
