import { BaseService } from './BaseService';
import { LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  REFRESH_ENDPOINT,
  CONTEXT_ENDPOINT,
} from './endpoints/AuthEndpoints';

class AuthService extends BaseService {

    constructor(){
      super();
    }

    userLogin(credentials) {
      return this.post(LOGIN_ENDPOINT, credentials);
    }

    refreshLogin(credentials){
      return this.post(REFRESH_ENDPOINT, credentials);
    }

    userRegister(registerData) {
      return this.post(REGISTER_ENDPOINT, registerData);
    }

    getContext() {
      return this.get(CONTEXT_ENDPOINT);
    }

}

export default new AuthService();

