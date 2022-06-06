import axios from "axios";
const url = "http://54.87.232.33/api/v1/restaurants";

export const addRestaurant = async (restaurant: Restaurant) => {
  try {
    const token = window.localStorage.getItem("token") || "";

    const response = await axios.post(url, restaurant, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};
