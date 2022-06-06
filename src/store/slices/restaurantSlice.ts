import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addRestaurant } from "../../services/addRestaurant";
import { deleteRestaurant } from "../../services/deleteRestaurant";
import { getRestaurants } from "../../services/getRestaurants";
import { updateRestaurant } from "../../services/updateRestaurant";
import { filterArray, switchRestaurant } from "../../utils";

export interface RestaurantState {
  status: string;
  restaurants: Restaurant[] | null;
}

export const getRestaurantsThunk = createAsyncThunk(
  "get/restaurants",
  async () => {
    try {
      let response = await getRestaurants();
      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const addRestaurantThunk = createAsyncThunk(
  "add/restaurant",
  async (restaurant: any) => {
    try {
      let response = await addRestaurant(restaurant);

      if (response.status > 399) {
        throw "error update restaurant";
      }
      return response.data.data;
    } catch (err) {
      throw err;
    }
  }
);

export const updateRestaurantThunk = createAsyncThunk(
  "update/restaurant/id",
  async (update: Update) => {
    try {
      let response = await updateRestaurant(update._id, update);
      if (response.status > 399) {
        throw "error update restaurant";
      }
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const deleteRestaurantThunk = createAsyncThunk(
  "delete/restaurant/:id",
  async (id: string) => {
    try {
      let response = await deleteRestaurant(id);
      if (response.status > 399) {
        throw "error delete restaurant";
      }
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: RestaurantState = {
  status: "",
  restaurants: null,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRestaurantsThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getRestaurantsThunk.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.restaurants = action.payload;
    });
    builder.addCase(getRestaurantsThunk.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(deleteRestaurantThunk.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(deleteRestaurantThunk.fulfilled, (state, action) => {
      console.log(action.payload);

      state.status = "fulfilled";
      state.restaurants = filterArray(
        state.restaurants!,
        action.payload.data.restaurant
      );
    });
    builder.addCase(deleteRestaurantThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateRestaurantThunk.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(updateRestaurantThunk.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.restaurants = switchRestaurant(
        state.restaurants!,
        action.payload.data.restaurant
      );
    });
    builder.addCase(updateRestaurantThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addRestaurantThunk.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(addRestaurantThunk.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.restaurants = [...state.restaurants!, action.payload.restaurant];
    });
    builder.addCase(addRestaurantThunk.pending, (state) => {
      state.status = "pending";
    });
  },
});

export default restaurantSlice.reducer;
