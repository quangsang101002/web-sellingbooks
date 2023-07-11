export const addProduct = (product, quanlity) => {
  return {
    type: 'ADD_TO_CART',
    payload: {
      ...product,
      quanlity,
    },
  };
};
export const deleteProduct = (product) => {
  return {
    type: 'DELETE-PRODUCT_CART',
    payload: product,
  };
};
