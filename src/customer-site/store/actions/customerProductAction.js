export const addProduct = (product, quantity) => {
  return {
    type: 'ADD_TO_CART',
    payload: {
      ...product,
      quantity,
    },
  };
};
export const deleteProduct = (product) => {
  return {
    type: 'DELETE-PRODUCT_CART',
    payload: product,
  };
};
export const changeQuantity = (quantity, id) => {
  return {
    type: 'CHANGE_QUANTITY',
    payload: {
      id,
      quantity,
    },
  };
};
export const totalPay = (product) => {
  return {
    type: 'TOTAL_PAY',
    payload: product,
  };
};
export const deleteQuatity = (product, id) => {
  return {
    type: 'DELETE_QUATITY',
    payload: {
      product,
      id,
    },
  };
};
