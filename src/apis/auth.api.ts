import { ENDPOINT } from '@/constants/endpoint'
import { UserState } from '@/types/user.type'
import http from '@/utils/http'

const authApi = {
  login(body: { email: string; password: string }) {
    return http.post<UserState>(ENDPOINT.LOGIN, body)
  },

  signup(body: UserState) {
    return http.post<UserState>(ENDPOINT.REGISTER, body)
  },
  logout() {
    return http.post(ENDPOINT.LOGOUT)
  }
}

export default authApi
