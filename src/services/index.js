import { Axios } from './axios';
import Cache from './CacheService';

class Api extends Axios   {

  token;

  constructor(conf) {
    super(conf);
    this.token = '';
    this.interceptors.request.use( async (param) => {
        const token = await this.getToken();
        if(token != null) {
          console.log(token)
          param.headers.common.Authorization = `Bearer ${token}`
        }
        return {
            ...param,
        }
    });
  }

  getToken = async () => {
    const token = await Cache.getItem('access_token');
    if(token == null)
          return null;
    return token;
  }

  setToken = (token) => {
    this.token = token;
  }

  getUri = (config) => {
      return this.getUri(config);
  }

  request(config) {
    return this.request(config);
  }

  get(url, config) {
    return this.get(url, config);
  }

  post(url, data, config) {
    return this.post (url, data, config);
  }

  delete(url, data, config) {
    return this.post (url, data, config);
  }
}

export default Api;
