import axios from 'axios';
import Api from './index';
import Cache from '../services/CacheService';
import createAuthRefreshToken from 'axios-auth-refresh';
//import { API_URL } from '@env';

const BASE_API_URL = 'http://localhost:8000/';

let refresh = '';

const refreshLogin = failedReq => axios.post(`${BASE_API_URL}auth/refresh/`, {refresh: refresh})
  .then(response => {
    const data = response.data;
    Cache.setItem('access_token', data.access_token);
    Cache.setItem('refresh_token', data.refresh_token);
    failedReq.response.config.headers['Authorization'] = `Bearer ${data.access_token}`
    // TODO: Remove this log added for development purpuses
    console.log('refreshing')
    return Promise.resolve();
  });

export const apiConfig = {
  returnRejectedPromiseOnError: true,
  withCredentials: true,
  timeout: 30000,
  baseURL: BASE_API_URL,
  headers: {
    common: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: false }),
}

class BaseService{

  client;
  constructor() {
    this.client = new Api(apiConfig);
    createAuthRefreshToken(this.client, refreshLogin);
  }

  get(url, config) {
    return this.client.get(url, config);
  }

  post (url, data, config) {
    return this.client.post(url, data, config);
  }
}

export { BaseService };
