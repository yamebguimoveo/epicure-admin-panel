import axios, { AxiosError } from "axios";
const url = "http://54.87.232.33/api/v1/restaurants";

interface Update {
  name: string;
  chef: string;
  imageSrc: string;
}
export const updateRestaurant = async (id: string, updatedData: Update) => {
  try {
    const token = window.localStorage.getItem("token") || "";

    const response = await axios.patch(
      `${url}/${id}`,
      {
        name: updatedData.name,
        chef: updatedData.chef,
        imageSrc: updatedData.imageSrc,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return response;
  } catch (err: any) {
    return err.response;
  }
};
