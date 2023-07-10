import { createAction } from '@reduxjs/toolkit';

const addProduct = createAction('ADD_PRODUCT');
const addCart = createAction('ADD_CART');

export { addProduct, addCart };
