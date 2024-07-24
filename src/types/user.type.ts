export interface UserState {
  _id: string
  _destroy: boolean
  fullName: string
  lastName: string
  firstName: string
  gender: string
  avatarUrl: string
  email: string
  password: string
  birthday: string
  accountStatus: string
  emailStatus: string
  phoneStatus: string
  role: number[]
  createdAt: string
  updatedAt: string
  walletId: string
  refreshToken: string
  accessToken: string
}
