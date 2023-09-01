import api, { getHeaders } from './api';

const searchOrder = async () => {
  return await api
    .get('/order', { headers: getHeaders() })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('API Error', error);
      throw error;
    });
};
const addOrder = async (bodyOrder) => {
  console.log('>>>-??', bodyOrder);
  return await api
    .post('/order', bodyOrder, { headers: getHeaders() })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error('API Error', error);
      throw error;
    });
};
const updateStatus = async (id, statusValue) => {
  const formData = new FormData();
  formData.append('status', Number(statusValue));

  try {
    const response = await api.putForm(`/order/${Number(id)}`, formData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('API Error', error);
    throw error;
  }
};
const deleteOrder = (id) => {
  api
    .delete(`/order/${id}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('API Error', error);
      throw error;
    });
};
const productAPI = {
  searchOrder,
  addOrder,
  updateStatus,
  deleteOrder,
};
export default productAPI;
