import customApi from '@/apis/custom.api'
import { Notification } from '@/components/AppRedux/AppRedux'
import { formatNumber } from '@/utils/common'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PaymetCallBackPage = () => {
  const navigate = useNavigate()
  const [sendReq, setSendReq] = useState(true)
  const location = useLocation()

  const getQueryParams = (search: string) => {
    const params = new URLSearchParams(search)
    const result = {} as any

    for (const [key, value] of params.entries()) {
      result[key] = value
    }
    return result
  }

  const queryParams = getQueryParams(location.search) || null

  useEffect(() => {
    if (queryParams) setSendReq(true)
  }, [queryParams])

  const { isSuccess, data } = useQuery({
    queryKey: ['historyData'],
    queryFn: () => {
      return customApi.transactionCallback(queryParams)
    },
    enabled: sendReq
  })

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
      Notification(
        data.data.status === 'SUCCESS' ? 'success' : 'error',
        data.data.status === 'SUCCESS' ? (
          <p>
            You have successfully paid <b>{formatNumber(data.data.coin)}</b> coins, transaction id:{' '}
            <b>{data.data.codeTransaction}</b>
          </p>
        ) : (
          <p>
            The transaction failed, transaction id: <b>{data.data.codeTransaction}</b>
          </p>
        ),
        `Payment ${data.data.status === 'SUCCESS' ? 'successful' : 'failed'}`
      )
    }
  }, [isSuccess])

  return <></>
}

export default PaymetCallBackPage
