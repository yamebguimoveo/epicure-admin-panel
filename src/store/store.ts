import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import restaurantReducer from "./slices/restaurantSlice";
import chefReducer from "./slices/chefSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    restaurants: restaurantReducer,
    chefs: chefReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
