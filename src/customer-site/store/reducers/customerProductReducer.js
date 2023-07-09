import { createReducer } from '@reduxjs/toolkit';

const customerProductReducer = createReducer(
  { products: [] },
  {
    ADD_PRODUCT: (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    },
  },
);

export default customerProductReducer;
