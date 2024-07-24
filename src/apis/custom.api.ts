import { ENDPOINT } from '@/constants/endpoint'
import { BettingState } from '@/types/poker.type'
import http from '@/utils/http'

const customApi = {
  pokerBetting(body: BettingState) {
    return http.post<BettingState>(ENDPOINT.POKER_BETTING_PATH, body)
  }
}

export default customApi
