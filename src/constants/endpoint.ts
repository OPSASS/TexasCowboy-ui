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
  FIND_NOW_POKER_PATH: '/poker/find-now',
  POKER_BETTING_PATH: '/poker/betting',

  // :::::::::::::::::::: WALLET PATH :::::::::::::::::::::
  WALLET_PATH: '/wallet/',
  FIND_WALLET_PATH: '/wallet/find',

  // :::::::::::::::::::: TRANSACTION PATH :::::::::::::::::::::
  TRANSACTION_PATH: '/transaction/',
  FIND_TRANSACTION_PATH: '/transaction/find',
  CHECKOUT_PATH: '/transaction/checkout',
  CALLBACK_PATH: '/transaction/payment-callback',
  RE_EXECUTE_TRANSACTION_PATH: '/transaction/re-execute/',

  // :::::::::::::::::::: HISTORY PATH :::::::::::::::::::::
  HISTORY_PATH: '/history/',
  FIND_HISTORY_PATH: '/history/find',
  FIND_PREV_HISTORY_PATH: '/history/find-prev'
}
