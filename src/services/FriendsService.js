import { BaseService } from './BaseService';
import CacheService from '../services/CacheService'


import {
  GET_FIND_FRIEND_BY_PHONE
} from './endpoints/FriendsEndpoints';


class FriendsService extends BaseService {
  constructor(){
    super();
  }

  findFriendByPhone = async (number) => {
    return this.get(GET_FIND_FRIEND_BY_PHONE(number));
  }
}

export default new FriendsService();
