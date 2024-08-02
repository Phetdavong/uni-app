import {HTTP5} from '@env';
import axios from 'axios';

const api = axios.create({
  baseURL: `${HTTP5}`,
});

export default api;
