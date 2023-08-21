import api, { getHeaders } from './api';

const searchUsers = async (limit, page) => {
  const params = {
    limit: limit,
    page: page,
  };

  return await api

    .get('/users', { params, headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('API Error', error);
      throw error;
    });
};

const createUser = async (requestBody) => {
  return await api
    .postForm('/users', requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('API Error', error);
      throw error;
    });
};

const getUserByUserId = async (userId) => {
  return await api
    .get(`/users/${userId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('API Error', error);
      throw error;
    });
};

const updateUser = async (userId, requestBody) => {
  console.log('userId, requestBody', userId, requestBody);
  return await api
    .putForm(`/users/${userId}`, requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('API Error', error);
      throw error;
    });
};

const deleteUser = async (userId) => {
  console.log('userId', userId);
  return await api
    .delete(`/users/${userId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('API Error', error);
      throw error;
    });
};

const userAPI = {
  searchUsers,
  createUser,
  getUserByUserId,
  updateUser,
  deleteUser,
};
export default userAPI;
