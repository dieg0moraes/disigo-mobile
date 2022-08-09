
import { BaseService } from './BaseService'; import { AxiosResponse } from 'axios';
import {
  GET_REGISTERED_ACCOUNT_ENDPOINT,
  GET_ACCOUNT_DETAIL,
  POST_BANK_LOGIN,
  GET_ACCOUNT_MOVEMENTS,
  POST_CREATE_ACCOUNT,
  GET_ACCOUNTS_PROVIDER,
  GET_BANK_LOGOUT,
  GET_PROVIDERS
} from './endpoints/BankingEndpoints';


class BankingService extends BaseService {
  constructor(){
    super();
  }

  getUserAccounts = () => {
    const response = this.get(GET_REGISTERED_ACCOUNT_ENDPOINT);
    return response;
  }

  getUserProviderRegisteredAccounts(provider) {
    return this.get(GET_ACCOUNTS_PROVIDER(provider));
  }

  getAccountDetail = () => {
    return this.get(GET_ACCOUNT_DETAIL);
  }

  postLoginBank = () => {
    return this.post(POST_BANK_LOGIN, request);
  }

 getAccountsMovements = (account, currency, start_date, end_date) => {
    return this.get(GET_ACCOUNT_MOVEMENTS(account, currency, start_date, end_date));
  }

  addAccount = (account) => {
    return this.post(POST_CREATE_ACCOUNT, account);
  }

  getProviders = () => {
    return this.get(GET_PROVIDERS);
  }

  logout = () => {
    return this.get(GET_BANK_LOGOUT);
  }
}

export default new BankingService();
