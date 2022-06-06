import axios from "axios";
const url = "http://54.87.232.33/api/v1/user/signup";

export const signup = async (signupUser: {
  password: string;
  email: string;
  name: string;
}) => {
  try {
    if (!signupUser.password) throw "Password missing";
    const response = await axios.post(url, signupUser);
    return response;
  } catch (err) {
    return err;
  }
};
