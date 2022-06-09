import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../services/login";
export interface UserState {
  status: string;
  user: User | null;
}

export const loginFunc = createAsyncThunk(
  "user/login",
  async (user: { email: string; password: string }) => {
    try {
      let loggedUser = await login(user.email, user.password);
      return loggedUser;
    } catch (err) {
      return err;
    }
  }
);

const initialState: UserState = {
  status: "",
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginFunc.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(loginFunc.fulfilled, (state, action) => {
      state.status = "fulfilled";
      window.localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
    });
    builder.addCase(loginFunc.rejected, (state, action) => {
      state.status = "rejected";
      window.localStorage.removeItem("token");
    });
  },
});

export default userSlice.reducer;
