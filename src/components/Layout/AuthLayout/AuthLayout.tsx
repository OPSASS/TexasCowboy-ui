import { Flex } from 'antd'
import Nav from '../Navigation/Navigation'
import style from './AuthLayout.module.scss'

type Props = { children: React.ReactNode }

const AuthLayout = (props: Props) => {
  const { children } = props

  return (
    <div className={style.authMain}>
      <Nav />
      <Flex justify='center' className={style.children}>
        {children}
      </Flex>
    </div>
  )
}

export default AuthLayout
