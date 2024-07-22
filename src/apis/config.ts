import { FilterQuery, Options, SuccessResponse } from '@/types/action.type'
import http from '@/utils/http'

interface ApiConfig {
  endpoint: string
  findEndpoint: string
}

const createApi = <DataType>({ endpoint, findEndpoint }: ApiConfig) => {
  return {
    find(filterQuery?: FilterQuery, options?: Options, body?: any) {
      const option = {
        pagination: false,
        sort: { createdAt: -1 }
      }

      const payload = {
        filterQuery,
        options: options || option
      }

      return http.post<SuccessResponse<DataType>>(findEndpoint, body || payload)
    },
    create(body: any) {
      return http.post<DataType>(endpoint, body)
    },
    update(body: any, id: string) {
      return http.put<DataType>(endpoint + id, body)
    },
    delete(id: string) {
      return http.delete<DataType>(endpoint + id)
    },
    detail(id: string) {
      return http.get<DataType>(endpoint + id)
    }
  }
}

export default createApi
