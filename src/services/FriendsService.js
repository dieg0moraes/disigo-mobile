import { BaseService } from './BaseService';
import CacheService from '../services/CacheService'


import {
  GET_FIND_FRIEND_BY_PHONE,
  GET_USER_GROUPS,
  POST_CREATE_USER_GROUP,
  GET_GROUP_EXPENSES
} from './endpoints/FriendsEndpoints';


class FriendsService extends BaseService {
  constructor(){
    super();
  }

  findFriendByPhone = async (number) => {
    return this.get(GET_FIND_FRIEND_BY_PHONE(number));
  }

  getUserGroups = async () => {
    return this.get(GET_USER_GROUPS);
  }

  postCreateGroup = async (data) => {
    return this.post(POST_CREATE_USER_GROUP, data);
  }

  getGroupExpenses = async (id) => {
    return this.get(GET_GROUP_EXPENSES(id));
  }
}

export default new FriendsService();
