import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';

const getHeaders = () => {
  return {
    'X-API-key': window.localStorage.getItem('X-API-key'),
  };
};
export { getHeaders };
export default axios;
