import { Cache } from 'react-native-cache';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CacheServer {

  cache;

  constructor(){
    this.cache = new Cache({
      namespace: 'disigo',
      policy: {
        maxEntries: 500
      },
      backend: AsyncStorage

    });
  }

  setItem(key, value){

    console.log(`CACHE: -> SET item ${key} - ${value}`)
    this.cache.set(key, value);
  }

  async getItem(key) {
    console.log('CACHE: -> getting item')
    const value = await this.cache.get(key);
    console.log('CACHE: -> getting item', value)
    return value;
  }

  async removeItem(key) {
    await this.cache.remove(key);
  }
}

export default new CacheServer();
