import authApi from '@/apis/auth.api'
import { historyApi, walletApi } from '@/apis/index.api'
import AvatarCustom from '@/components/AvatarCustom/AvatarCustom'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import PATH from '@/constants/path'
import { AppContext } from '@/contexts/app.context'
import useResponsive from '@/hooks/useResponsives'
import BetedHistoryModal from '@/pages/Game/TexasCowboyPage/Components/BetedHistoryModal'
import { clearLS } from '@/utils/auth'
import { formatNumber } from '@/utils/common'
import { MenuOutlined, PlusOutlined, SettingFilled } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Dropdown, Flex, MenuProps, Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from '../Container/Container'
import style from './Navigation.module.scss'

const Nav = () => {
  const { isAuthenticated, profile, userWallet, coinAdd, setUserWallet } = useContext(AppContext)
  const { sm } = useResponsive()
  const location = useLocation().pathname
  const [openHistory, setOpenHistory] = useState(false)
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(profile._id),
    onSuccess() {
      clearLS()
      window.location.reload()
    }
  })
  const { data } = useQuery({
    queryKey: ['userWallet'],
    queryFn: () => {
      return walletApi.detail(profile.walletId)
    }
  })

  const { data: gameHistory } = useQuery({
    queryKey: ['gameHistory'],
    queryFn: () => {
      return historyApi.find({ targetModel: 'BET', userId: profile._id }, { limit: 20, sort: { createdAt: -1 } })
    },
    enabled: openHistory
  })

  useEffect(() => {
    if (data?.data) {
      setUserWallet(data.data.coin)
    }
  }, [data])

  const items: MenuProps['items'] = [
    {
      label: <Link to={PATH.RECHARGE}>Recharge</Link>,
      key: '0'
    },
    {
      label: <Link to={PATH.TRANSACTION_HISTORY}>Transaction history</Link>,
      key: '1'
    }
  ]

  const menuProfile: MenuProps['items'] = [
    {
      label: (
        <Link to={PATH.HOME}>
          <h3>{profile?.fullName}</h3>
        </Link>
      ),
      key: 'fn'
    },
    {
      type: 'divider'
    },
    {
      label: <div onClick={() => logoutMutation.mutate()}>Log out</div>,
      key: 'out'
    }
  ]

  if (location === PATH.TEXAS_COWBOY)
    items.push({
      label: <div onClick={() => setOpenHistory(true)}>Game history</div>,
      key: '2'
    })

  const endPath = location.split('/').filter((item) => item !== '')

  const pathName = endPath
    ?.slice(-1)?.[0]
    .split('-')
    .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ')

  const gamePath = endPath.includes('games')
  return (
    <Container
      title={
        !gamePath ? (
          pathName
        ) : (
          <Space>
            <ButtonCustom icon={<MenuOutlined />} size='small' shape='circle'></ButtonCustom>
            <ButtonCustom icon={<SettingFilled />} size='small' shape='circle'></ButtonCustom>
          </Space>
        )
      }
      titleGoBack={!gamePath}
      titleSize={sm ? 16 : 24}
      titleHref={!gamePath ? '/' : undefined}
      className={style.navBody}
      style={{ position: gamePath ? 'fixed' : 'absolute' }}
      rightTitle={
        isAuthenticated && (
          <Flex gap={sm ? 3 : 10}>
            <div className={style.wallet}>
              <div className={style.coin}>
                <ButtonCustom
                  size='small'
                  shape='circle'
                  icon={<PlusOutlined style={{ fontSize: sm ? 12 : 14 }} />}
                  href={PATH.RECHARGE}
                ></ButtonCustom>
                <Dropdown menu={{ items }} trigger={['click']} arrow placement='bottomRight'>
                  <ButtonCustom type='link' size='small' fontSize={sm ? 12 : 16}>
                    <h3>${formatNumber(userWallet)}</h3>
                  </ButtonCustom>
                </Dropdown>
              </div>

              {(coinAdd > 0 || coinAdd < 0) && (
                <div className={`${style.addCoin} ${coinAdd > 0 ? style.add : style.minus}`}>
                  <h3>
                    {coinAdd > 0 && '+'}
                    {formatNumber(coinAdd)}
                  </h3>
                </div>
              )}
            </div>
            <Dropdown menu={{ items: menuProfile }} trigger={['click']} arrow placement='bottomRight'>
              <ButtonCustom type='text' size='small'>
                <AvatarCustom size={sm ? 30 : 40} />
              </ButtonCustom>
            </Dropdown>
          </Flex>
        )
      }
    >
      <BetedHistoryModal isOpen={openHistory} onClose={setOpenHistory} historyData={gameHistory?.data.docs} />
    </Container>
  )
}

export default Nav
