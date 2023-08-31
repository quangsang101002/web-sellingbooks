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
  const formData = new FormData();
  // Thêm các trường dữ liệu sản phẩm vào formData
  formData.append('sku', bodyProduct.sku);
  formData.append('name', bodyProduct.name);
  formData.append('category', bodyProduct.category);
  formData.append('description', bodyProduct.description);
  formData.append('unit_price', bodyProduct.unit_price);
  // Thêm hình ảnh avatar và gallery vào formData
  formData.append('avatar', bodyProduct.avatar);
  formData.append('gallery', bodyProduct.gallery);

  try {
    const response = await api.post('/product', formData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
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
