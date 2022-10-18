export const GET_ACCOUNT_DETAIL = 'banking/account-details/';
export const GET_ACCOUNT_MOVEMENTS = (
  acc_number,
  currency,
  start_date,
  end_date
) => `banking/movement/?acc_number=${acc_number}&currency=${currency}&start=${start_date}&end=${end_date}`;
export const POST_BANK_LOGIN = 'banking/login/';
export const GET_BANK_LOGOUT = 'banking/logout/';
export const POST_CREATE_ACCOUNT = 'banking/add-account/';
export const GET_ACCOUNTS_PROVIDER = (provider) => `banking/provider/${provider}/accounts`;
export const GET_REGISTERED_ACCOUNT_ENDPOINT = GET_ACCOUNTS_PROVIDER('all');
export const GET_PROVIDERS = `banking/provider/`
export const POST_ADD_ACCOUNT = 'banking/add-account';
export const POST_MAKE_TRANSFER = 'banking/process-transfer/';
export const DELETE_ACCOUNT = 'banking/delete-account/';
