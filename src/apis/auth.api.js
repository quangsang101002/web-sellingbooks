import api, { getHeaders } from './api';

const login = async (username, password, type = 'customer') => {
  const requestBody = {
    username: username,
    password: password,
    type: type,
  };

  try {
    const response = await api.post('/login', requestBody);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};

const getAuth = async () => {
  return await api
    .get('/auth', { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const logout = async () => {
  return await api
    .post('/logout', {}, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const register = async (requestBody) => {
  return await api
    .post('/register', requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const authAPI = {
  login,
  getAuth,
  logout,
  register,
};

export default authAPI;
