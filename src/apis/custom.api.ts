import { ENDPOINT } from '@/constants/endpoint'
import { HistoriesState } from '@/types/histories.type'
import { BettingState } from '@/types/poker.type'
import { CheckoutState } from '@/types/wallet.type'
import http from '@/utils/http'

const customApi = {
  pokerBetting(body: BettingState) {
    return http.post<BettingState>(ENDPOINT.POKER_BETTING_PATH, body)
  },
  checkout(body: CheckoutState) {
    return http.post<CheckoutState>(ENDPOINT.CHECKOUT_PATH, body)
  },
  transactionCallback(body: any) {
    return http.post<any>(ENDPOINT.CALLBACK_PATH, body)
  },
  reExecuteTransaction(id: string) {
    return http.get<any>(ENDPOINT.RE_EXECUTE_TRANSACTION_PATH + id)
  },
  findPrevHistory(body: any) {
    return http.post<HistoriesState>(ENDPOINT.FIND_PREV_HISTORY_PATH, body)
  },
  findNowPoker() {
    return http.post<any>(ENDPOINT.FIND_NOW_POKER_PATH)
  }
}

export default customApi
