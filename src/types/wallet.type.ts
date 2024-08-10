export interface WalletState {
  _id: string
  _destroy: boolean
  userId: string
  coin: number
  createdAt: string
  updatedAt: string
}

export interface CheckoutState {
  coin: number
  targetModel: string
  userId: string
  url?: string
  type?: string
}
