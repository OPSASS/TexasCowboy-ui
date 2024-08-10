export interface PokerState {
  _id?: string
  _destroy?: boolean
  dealer: number[]
  player1: number[]
  player2: number[]
  historyId?: string
  pack?: number[]
  createdAt?: string
  updatedAt?: string
}

export interface BettingDataState {
  key: string
  coin: number
}

export interface BettingState {
  userId: string
  gameId: string
  detailedHistory: BettingDataState[]
  totalCoin?: number
  oldCoin?: number
  createdAt?: string
  updatedAt?: string
}
