import axios from "axios";
const url = "http://54.87.232.33/api/v1/user/login";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(url, { email, password });
    console.log(response);

    return response.data;
  } catch (err) {
    return err;
  }
};
