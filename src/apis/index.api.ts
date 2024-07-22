import { ENDPOINT } from '@/constants/endpoint'
import createApi from './config'

export const userApi = createApi<any>({
  endpoint: ENDPOINT.USERS_PATH,
  findEndpoint: ENDPOINT.FIND_USERS_PATH
})

export const walletApi = createApi<any>({
  endpoint: ENDPOINT.WALLET_PATH,
  findEndpoint: ENDPOINT.FIND_WALLET_PATH
})

export const pokerApi = createApi<any>({
  endpoint: ENDPOINT.POKER_PATH,
  findEndpoint: ENDPOINT.FIND_POKER_PATH
})

export const historyApi = createApi<any>({
  endpoint: ENDPOINT.HISTORY_PATH,
  findEndpoint: ENDPOINT.FIND_HISTORY_PATH
})
