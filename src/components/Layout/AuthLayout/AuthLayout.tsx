import PATH from '@/constants/path'
import { Flex, Space } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import style from './AuthLayout.module.scss'
type Props = { children: React.ReactNode }

const AuthLayout = (props: Props) => {
  const { children } = props
  const location = useLocation().pathname

  return (
    <Flex justify='center' align='center' className={style.authMain}>
      <Flex gap={24} vertical className={style.children}>
        <h1>Texas Cowboy</h1>
        {children}
        <Space>
          <Link to={location === PATH.REGISTER || location === PATH.FORGOT_PASSWORD ? PATH.LOGIN : PATH.REGISTER}>
            {location === PATH.REGISTER || location === PATH.FORGOT_PASSWORD ? 'Login' : 'Register'}
          </Link>
          or
          <Link className={'link'} to={PATH.FORGOT_PASSWORD}>
            forgot your password
          </Link>
        </Space>
      </Flex>
    </Flex>
  )
}

export default AuthLayout
