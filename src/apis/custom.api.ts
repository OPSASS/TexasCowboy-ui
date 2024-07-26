import { ENDPOINT } from '@/constants/endpoint'
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
  VNPCallback(body: any) {
    return http.post<any>(ENDPOINT.VNP_CALLBACK_PATH, body)
  }
}

export default customApi
