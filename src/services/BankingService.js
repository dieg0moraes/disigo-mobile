import { BaseService } from './BaseService';
import CacheService from '../services/CacheService';
import {
  GET_REGISTERED_ACCOUNT_ENDPOINT,
  GET_ACCOUNT_DETAIL,
  POST_BANK_LOGIN,
  GET_ACCOUNT_MOVEMENTS,
  POST_CREATE_ACCOUNT,
  GET_ACCOUNTS_PROVIDER,
  GET_BANK_LOGOUT,
  GET_PROVIDERS,
  POST_MAKE_TRANSFER,
  DELETE_ACCOUNT
} from './endpoints/BankingEndpoints';


class BankingService extends BaseService {
  constructor(){
    super();
  }

  deleteAccount = (data) => {
    const response = this.post(DELETE_ACCOUNT, data);
    return response;
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

  postLoginBank = (data) => {
    return this.post(POST_BANK_LOGIN, data);
  }

  getAccountsMovements = (account, currency, start_date, end_date) => {
    return this.get(GET_ACCOUNT_MOVEMENTS(account, currency, start_date, end_date));
  }

  addAccount = async (account) => {
    try {
      const response = await this.post(POST_CREATE_ACCOUNT, account);

      let data = await CacheService.getSecureItem('accounts')


      if(data == undefined) {
        CacheService.setSecureItem('accounts', []);
        data = [];
      }

      if (response.status == 201) {
        const accountsAdded = response.data['data'];

        accountsAdded.forEach((acc) => {
          const toAdd = {
            internalId: acc['id'],
            number: acc['number'],
            currency: acc['currency'],
            name: acc['name'],
            credentials: account
          }
          data.push(toAdd);

          data.filter((v,i,a)=>a.findIndex(v2=>['internalId'].every(k=>v2[k] ===v[k]))===i)

          CacheService.setSecureItem('accounts', data);
        })

      }


    } catch (e) {
      console.log('addAccount service');
      console.error(e);
    }
  }

  getProviders = () => {
    return this.get(GET_PROVIDERS);
  }

  getProviders = () => {
    return this.get(GET_PROVIDERS);
  }

  logout = () => {
    return this.get(GET_BANK_LOGOUT);
  }

  postMakeTransfer = async (data) => {
    const internalId = data['origin_internal_id'];
     try {

       const savedAccounts = await CacheService.getSecureItem('accounts');
       if(savedAccounts) {
         const account = savedAccounts.filter(acc => acc.internalId == internalId);
         if (account) {
            const responseLogin = await this.postLoginBank(account[0].credentials)
         }
       }

     } catch (error) {
       console.log(error)

     }
    const responseTrans = await this.post(POST_MAKE_TRANSFER, data);
    console.log(responseTrans)
  }
}

export default new BankingService();
