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
      return customApi.VNPCallback(queryParams)
    },
    enabled: sendReq
  })

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
      Notification(
        'success',
        <p>
          You have successfully paid <b>{formatNumber(data.data.coin)}</b> coins, transaction id: <b>{data.data._id}</b>
        </p>,
        'Payment successful'
      )
    }
  }, [isSuccess])

  return <></>
}

export default PaymetCallBackPage
