import axios from 'axios';

const restcountries = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});

restcountries.interceptors.request.use(config => {
  if (localStorage.getItem('access_token')) {
    config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`;
  }
  return config;
}, error => {
});

export default restcountries;
