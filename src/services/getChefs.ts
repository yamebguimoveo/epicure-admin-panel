import axios from "axios";
const url = "http://54.87.232.33/api/v1/chefs";

export const getChefs = async () => {
  try {
    const response = await axios.get(url);
    return response.data.data.chefs;
  } catch (err) {
    return err;
  }
};
