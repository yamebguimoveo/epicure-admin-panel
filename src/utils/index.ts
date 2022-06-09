export const filterArray = (array: Array<Restaurant>, id: string) => {
  const newArray = array.filter((item) => item._id !== id);
  return newArray;
};

export const switchRestaurant = (
  array: Array<Restaurant>,
  restaurant: Restaurant
) => {
  const newArray = array.map((item) => {
    if (item._id !== restaurant._id) {
      return item;
    } else {
      return restaurant;
    }
  });

  return newArray;
};
