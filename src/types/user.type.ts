export interface UserState {
  _id: string
  _destroy: boolean
  fullName: string
  avatarUrl: string
  coverUrl: string
  email: string
  birthday: string
  phoneNumber: string
  referralCode: string
  accountStatus: string
  emailStatus: string
  phoneStatus: string
  isMentor: boolean
  role: number[]
  mentorStatus: string
  createdAt: string
  updatedAt: string
  refreshToken: string
  updatedById: string
  descriptions: string
  gender: 'MALE' | 'FAMALE' | 'OTHER'
  videoInfoUrl: string
  socials: Social[]
  firstName: string
  lastName: string
  accessToken: string
}

interface Social {
  type: string
  url: string
}
