import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  //   const products = useSelector((state) => state.customerProductReducer);
  const products = useSelector((state) => state.customerProductReducer);

  console.log('product', products);
  return <div>Cart</div>;
};

export default Cart;
