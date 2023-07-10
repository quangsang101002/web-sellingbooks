import { createAction, createReducer } from '@reduxjs/toolkit';

const addProduct = createAction('ADD_PRODUCT', (product, inceaseProduct) => {
  return { payload: { product, inceaseProduct } };
});

const customerProductReducer = createReducer(
  { products: [], chung: [] }, // Thêm một mảng chung với sản phẩm
  {
    [addProduct]: (state, action) => {
      console.log('new', action.payload);
      const { product, inceaseProduct } = action.payload;

      // Thêm inceaseProduct vào mảng chung
      const chungUpdated = [...state.chung, inceaseProduct];

      return {
        ...state,
        products: [...state.products, product],
        chung: chungUpdated, // Cập nhật mảng chung với inceaseProduct mới
      };
    },
  },
);

export default customerProductReducer;
