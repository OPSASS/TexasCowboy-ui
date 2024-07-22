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
