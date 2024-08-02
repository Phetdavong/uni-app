import {HTTP8000} from '@env';
import axios from 'axios';

const Api = axios.create({
  baseURL: `${HTTP8000}`,
});

export default Api;