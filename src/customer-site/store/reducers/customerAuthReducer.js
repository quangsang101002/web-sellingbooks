const initState = {
  totalPricePay: [],
  total: [],
};
const customerAuthReducer = (state = initState, action) => {
  let totalPricePay = [];
  switch (action.type) {
    case 'TOTAL_PAY':
      totalPricePay = action.payload;

      break;
    default:
      return state;
  }
  let total = 0;
  for (let item of totalPricePay) {
    total = total + item.subTotal;
  }
  return {
    totalPricePay: totalPricePay,
    total: total,
  };
};

export default customerAuthReducer;
