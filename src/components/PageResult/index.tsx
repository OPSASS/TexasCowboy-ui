import PATH from '@/constants/path'
import { Result } from 'antd'
import { ResultStatusType } from 'antd/lib/result'
import React from 'react'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
type Props = {
  code?: ResultStatusType
  title?: string | React.ReactNode
  desc?: string | React.ReactNode
  extra?: React.ReactNode
}

const PageResult = (props: Props) => {
  const {
    code = 404,
    title,
    desc = 'Sorry, this page no longer exists or has been deleted',
    extra = (
      <ButtonCustom type='primary' href={PATH.HOME}>
        Go to homepage
      </ButtonCustom>
    )
  } = props

  return <Result status={code} title={title ? title : code} subTitle={desc} extra={extra} />
}

export default PageResult
