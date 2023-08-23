import api, { getHeaders } from './api';

const searchProduct = async (limit, page) => {
  const params = {
    limit: limit,
    page: page,
  };
  return await api
    .get('/product', { params, headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('API Error', error);
      throw error;
    });
};
const addProduct = () => {};
const getDetailProduct = () => {};
const deleteProduct = () => {};
const updateProduct = () => {};

const productAPI = {
  searchProduct,
  addProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
};
export default productAPI;
