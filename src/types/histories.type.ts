export interface HistoriesState {
  _id: string
  _destroy: boolean
  targetModel: string
  createdAt: Date
  updatedAt: Date
  gameId: string
  gameHistory: GameHistory
  totalCoin: number
}

export interface GameHistory {
  playerHistory: PlayerHistory[]
  result: PlayerHistory[]
  highCardOrOnePair: boolean[]
  twoPair: boolean[]
  threeOfAKindOrStraightOrFlush: boolean[]
  fullHouse: boolean[]
  fourOfAKindOrStraightFlushOrRoyalFlush: boolean[]
  isAA: boolean[]
  isHasPair: boolean[]
  isFlush: boolean[]
  red: boolean[]
  draw: boolean[]
  blue: boolean[]
  countRed: number
  countDraw: number
  countBlue: number
  countHighCardOrOnePair: number
  countTwoPair: number
  countThreeOfAKindOrStraightOrFlush: number
  countFullHouse: number
  countFourOfAKindOrStraightFlushOrRoyalFlush: number
  countIsAA: number
  countIsHasPair: number
  countIsFlush: number
  jackpot: number
}

export interface PlayerHistory {
  playerIndex: string
  result: string
  rankString: string
}
