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
  for (const order of bodyOrder) {
    try {
      const response = await api.post('/order', order, {
        headers: getHeaders(),
      });
      console.log('Success:', response);
      // Xử lý dữ liệu trả về nếu cần
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
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
