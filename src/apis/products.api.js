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
const addProduct = async (bodyProduct) => {
  return await api
    .post('/product', bodyProduct, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('API Error', error);
      throw error;
    });
};
const getDetailProduct = () => {};

const deleteProduct = async (id) => {
  return await api
    .delete(`/product/${id}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('API Error', error);
      throw error;
    });
};
const updateProduct = () => {};

const productAPI = {
  searchProduct,
  addProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
};
export default productAPI;
