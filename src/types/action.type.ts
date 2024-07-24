export type SuccessResponse<Data> = {
  docs: Data[]
  totalDocs: number
  limit: number
  hasPrevPage: boolean
  hasNextPage: boolean
  page: number
  totalPages: number
  offset: number
  prevPage: number
  nextPage: number
  pagingCounter: number
  meta: object
}

export interface ErrorResponse {
  statusCode: number | string
  message: string
  error: string
}

export type FilterQuery = any

export type Options = {
  select?: object | string
  collation?: object
  sort?: object | string
  populate?: any[] | object | string
  projection?: string | object
  lean?: boolean
  leanWithId?: boolean
  offset?: number
  page?: number
  limit?: number
  customLabels?: object
  pagination?: boolean
  useEstimatedCount?: boolean
  useCustomCountFn?: boolean
  forceCountFn?: boolean
  customFind?: string
  allowDiskUse?: boolean
  read?: object
}
