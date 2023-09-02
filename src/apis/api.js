import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';

const getHeaders = () => {
  return {
    'X-API-Key': window.localStorage.getItem('X-API-Key'),
  };
};
const getHeadersCustomers = () => {
  return {
    'X-API-Key-customers': window.localStorage.getItem('X-API-Key-customers'),
  };
};

export { getHeaders, getHeadersCustomers };
export default axios;
