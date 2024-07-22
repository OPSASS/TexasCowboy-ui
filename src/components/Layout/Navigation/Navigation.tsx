import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import { AppContext } from '@/contexts/app.context'
import { MenuOutlined, SettingFilled } from '@ant-design/icons'
import { Flex, Space } from 'antd'
import { useContext } from 'react'
import Container from '../Container/Container'
import style from './Navigation.module.scss'

const Nav = () => {
  const { profile } = useContext(AppContext)
  return (
    <Container size='lg' className={style.navBody}>
      <nav className={style.navMain}>
        <Flex justify='space-between' align='center'>
          <Space>
            <ButtonCustom icon={<MenuOutlined />}></ButtonCustom>
            <ButtonCustom icon={<SettingFilled />}></ButtonCustom>
          </Space>
          <Space direction='vertical' align='center'>
            <p>Jackpot</p>
            <h2>3.454.112</h2>
          </Space>
          <h3>$3333M +</h3>
        </Flex>
      </nav>
    </Container>
  )
}

export default Nav
