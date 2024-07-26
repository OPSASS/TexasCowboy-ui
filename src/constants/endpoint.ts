export const ENDPOINT = {
  // :::::::::::::::::::: AUTH PATH :::::::::::::::::::::
  LOGIN: '/auth/signin',
  REGISTER: '/auth/signup',
  LOGOUT: '/auth/logout?id=',

  // :::::::::::::::::::: USER PATH :::::::::::::::::::::
  USERS_PATH: '/users/',
  FIND_USERS_PATH: '/users/find',

  // :::::::::::::::::::: POKER PATH :::::::::::::::::::::
  POKER_PATH: '/poker/',
  FIND_POKER_PATH: '/poker/find',
  POKER_BETTING_PATH: '/poker/betting',

  // :::::::::::::::::::: WALLET PATH :::::::::::::::::::::
  WALLET_PATH: '/wallet/',
  FIND_WALLET_PATH: '/wallet/find',

  // :::::::::::::::::::: CHECKOUT PATH :::::::::::::::::::::
  CHECKOUT_PATH: '/vnpay/checkout',
  VNP_CALLBACK_PATH: '/vnpay/payment-callback',

  // :::::::::::::::::::: HISTORY PATH :::::::::::::::::::::
  HISTORY_PATH: '/history/',
  FIND_HISTORY_PATH: '/history/find'
}
