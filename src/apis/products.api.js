import api, { getHeaders } from './api';

const searchProduct = async (name, limit, page) => {
  const params = {
    limit: limit,
    page: page,
    name: name,
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
const updateProduct = async (id, bodyUpdate) => {
  return await api
    .put(`/product/${id}`, bodyUpdate, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('API Error', error);
      throw error;
    });
};

const productAPI = {
  searchProduct,
  addProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
};
export default productAPI;
