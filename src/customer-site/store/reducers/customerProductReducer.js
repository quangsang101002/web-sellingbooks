const initState = {
  products: [],
  total: [],
  totalPricePay: [],
};
const customerProductReducer = (state = initState, action) => {
  let products = [];
  let totalPricePay = [];
  switch (action.type) {
    case 'ADD_TO_CART':
      let isExits = false;
      products = state.products.map((item) => {
        if (action.payload.id === item.id) {
          isExits = true;
          item.quantity = item.quantity + action.payload.quantity;
          item.subTotal = item.quantity * Number(item.price);
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
    case 'CHANGE_QUANTITY':
      products = state.products.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = action.payload.quantity;
          item.subTotal = item.price * item.quantity;
        }
        return item;
      });
      break;

    default:
      return state;
  }

  let total = 0;
  for (let item of products) {
    total = total + item.subTotal;
  }
  return {
    products: products,
    total: total,
    totalPricePay: totalPricePay,
  };
};
export default customerProductReducer;
