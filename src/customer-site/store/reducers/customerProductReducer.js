const initState = {
  products: [],
  total: [],
};
const customerProductReducer = (state = initState, action) => {
  console.log(action);
  let products = [];
  switch (action.type) {
    case 'ADD_TO_CART':
      let isExits = false;
      products = state.products.map((item) => {
        if (action.payload.id === item.id) {
          isExits = true;
          item.quanlity = item.quanlity + action.payload.quanlity;
          item.subTotal = item.quanlity * item.price;
        }
        return item;
      });

      if (!isExits) {
        products = [
          ...products,
          {
            ...action.payload,
            subTotal: action.payload.price * action.payload.quantity,
          },
        ];
      }
      break;
    case 'DELETE-PRODUCT_CART':
      products = state.products.filter(
        (product) => product.id !== action.payload.id,
      );
      break;
    default:
      return state;
  }
  return {
    products: products,
  };
};
export default customerProductReducer;
