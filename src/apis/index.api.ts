import { ENDPOINT } from '@/constants/endpoint'
import { HistoriesState } from '@/types/histories.type'
import { PokerState } from '@/types/poker.type'
import { UserState } from '@/types/user.type'
import { WalletState } from '@/types/wallet.type'
import createApi from './config'

export const userApi = createApi<UserState>({
  endpoint: ENDPOINT.USERS_PATH,
  findEndpoint: ENDPOINT.FIND_USERS_PATH
})

export const walletApi = createApi<WalletState>({
  endpoint: ENDPOINT.WALLET_PATH,
  findEndpoint: ENDPOINT.FIND_WALLET_PATH
})

export const pokerApi = createApi<PokerState>({
  endpoint: ENDPOINT.POKER_PATH,
  findEndpoint: ENDPOINT.FIND_POKER_PATH
})

export const historyApi = createApi<HistoriesState>({
  endpoint: ENDPOINT.HISTORY_PATH,
  findEndpoint: ENDPOINT.FIND_HISTORY_PATH
})
