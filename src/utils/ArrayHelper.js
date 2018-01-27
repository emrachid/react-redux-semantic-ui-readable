export const removeItemFromArray = (array, id) => (
  array.filter((item) => (item.id !== id))
);
