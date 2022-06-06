import axios from "axios";
const url = "http://54.87.232.33/api/v1/restaurants";

export const getRestaurants = async () => {
  try {
      const response = await axios.get(url);
    return response.data.data.restaurants;
  } catch (err) {
    return err;
  }
};
