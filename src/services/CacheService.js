import { Cache } from 'react-native-cache';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

class CacheServer {

  cache;

  constructor(){
    this.cache = new Cache({
      namespace: 'disigo',
      policy: {
        maxEntries: 500
      },
      backend: EncryptedStorage

    });
  }

  setItem(key, value){
    this.cache.set(key, value);
  }

  async setSecureItem(key, value) {
    try {
      console.log(value)
      this.cache.set(
          key,
          JSON.stringify(value)
      );
          // Congrats! You've just stored your first value!
    } catch (error) {
          // There was an error on the native side
    }
  }
  async getSecureItem(key) {
    try {
      const item = await this.cache.get(
          key
      );
      console.log(item)
      return JSON.parse(item);
          // Congrats! You've just stored your first value!
    } catch (error) {
          // There was an error on the native side
    }
  }

  async getItem(key) {
    const value = await this.cache.get(key);
    return value;
  }

  async removeItem(key) {
    await this.cache.remove(key);
  }
}

export default new CacheServer();
