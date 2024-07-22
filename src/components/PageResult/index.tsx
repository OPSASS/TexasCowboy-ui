import { Button, Result } from 'antd'
import { ResultStatusType } from 'antd/lib/result'
import React from 'react'
import { useNavigate } from 'react-router-dom'
type Props = {
  code?: ResultStatusType
  title?: string | React.ReactNode
  desc?: string | React.ReactNode
  extra?: React.ReactNode
}

const PageResult = (props: Props) => {
  const navigate = useNavigate()
  const {
    code = 404,
    title,
    desc = '申し訳ありませんが、このページは存在しないか、削除されました',
    extra = (
      <Button type='primary' onClick={() => navigate('/')}>
        ホームページに戻る
      </Button>
    )
  } = props

  return <Result status={code} title={title ? title : code} subTitle={desc} extra={extra} />
}

export default PageResult
