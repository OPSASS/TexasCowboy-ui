import customApi from '@/apis/custom.api'
import { userApi } from '@/apis/index.api'
import { Notification } from '@/components/AppRedux/AppRedux'
import AvatarCustom from '@/components/AvatarCustom/AvatarCustom'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import Container from '@/components/Layout/Container/Container'
import { AppContext } from '@/contexts/app.context'
import useResponsive from '@/hooks/useResponsives'
import { UserState } from '@/types/user.type'
import { CheckoutState } from '@/types/wallet.type'
import { formatNumber, formatNumberToString } from '@/utils/common'
import { useMutation } from '@tanstack/react-query'
import { Button, Col, Descriptions, Divider, Flex, Form, Input, Radio, Row, Space, Typography } from 'antd'
import { useContext, useEffect, useState } from 'react'
import paypal from '../../assets/PNG/paypal.png'
import vnpay from '../../assets/PNG/vnpay.png'
import style from './styles.module.scss'

const { Text, Title } = Typography
const PublicRecharge = ({
  setUserId,
  setFriend,
  setUserData
}: {
  setUserId: React.Dispatch<React.SetStateAction<string>>
  setFriend: React.Dispatch<React.SetStateAction<boolean>>
  setUserData: React.Dispatch<React.SetStateAction<UserState | null>>
}) => {
  const { isAuthenticated } = useContext(AppContext)
  const findUserMutaition = useMutation({
    mutationFn: (body: UserState) => userApi.find(body),
    onSuccess(data) {
      if (data.data.totalDocs === 0) Notification('error', 'Email not found!')
      setUserData(data.data.docs[0])
      setUserId(data.data.docs[0]._id)
      setFriend(false)
    }
  })

  const onFinish = (value: UserState) => {
    if (value.email) findUserMutaition.mutate(value)
  }
  return (
    <div className={style.findEmail}>
      <Space size='large' direction='vertical'>
        <Flex vertical>
          <h1>Find email address</h1>
          <p>Find and choose account with email address</p>
        </Flex>
        <Form onFinish={onFinish} layout='vertical' size='large'>
          <Flex vertical>
            <Space.Compact>
              <Form.Item
                name='email'
                rules={[{ required: true, message: 'Please enter your email' }]}
                style={{ width: '100%' }}
              >
                <Input placeholder='Enter email address'></Input>
              </Form.Item>
              <Form.Item>
                <Button htmlType='submit' loading={findUserMutaition.isPending} type='primary'>
                  Find emails
                </Button>
              </Form.Item>
            </Space.Compact>
            {isAuthenticated && (
              <ButtonCustom onClick={() => setFriend(false)} size='middle'>
                Go back
              </ButtonCustom>
            )}
          </Flex>
        </Form>
      </Space>
    </div>
  )
}
const RechargePage = () => {
  const { profile, isAuthenticated } = useContext(AppContext)
  const [userId, setUserId] = useState<string>('')
  const [userData, setUserData] = useState<UserState | null>(null)
  const [coin, setCoin] = useState<number>(0)
  const paymetList = ['VNPay', 'PayPal']
  const [paymet, setPaymet] = useState<string>(paymetList[0])
  const [isFriend, setFriend] = useState<boolean>(false)
  const coinList = [1000, 3000, 5000, 10000, 15000, 50000, 100000, 500000]
  const { sm } = useResponsive()

  useEffect(() => {
    if (profile) setUserId(profile._id)
  }, [profile])

  const checkoutMutation = useMutation({
    mutationFn: (body: CheckoutState) => customApi.checkout(body),
    mutationKey: ['checkoutMutation'],
    onSuccess(data) {
      window.open(data.data.url, '_blank')
      window.close()
    }
  })

  const handleCheckout = () => {
    checkoutMutation.mutate({ userId, coin, targetModel: 'CHECKOUT', type: paymet })
  }

  return (
    <Container padding='70px 0' className={style.rechargeBody}>
      {(isAuthenticated || userId) && !isFriend ? (
        <Descriptions column={1} layout='vertical'>
          <Descriptions.Item label='User info'>
            <Space direction='vertical'>
              <Flex align='center' gap={10}>
                <AvatarCustom size={40} />
                <Flex vertical>
                  <h3>{userData ? userData.fullName : profile?.fullName}</h3>
                </Flex>
              </Flex>
              {isAuthenticated && (
                <ButtonCustom
                  onClick={() => {
                    if (userData) {
                      setUserData(null)
                      setUserId(profile._id)
                    } else setFriend(true)
                  }}
                  danger={Boolean(userData)}
                >
                  {userData ? 'Recharge for you' : 'Recharge with your friend'}
                </ButtonCustom>
              )}
            </Space>
          </Descriptions.Item>
          <Divider />
          <Descriptions.Item label='Packs'>
            <Row gutter={[24, 24]}>
              {coinList.map((i, id) => (
                <Col span={24} md={12} lg={8} xl={6}>
                  <ButtonCustom
                    justify='space-between'
                    key={id}
                    fullWidth
                    onClick={() => setCoin(i)}
                    type={coin === i ? 'primary' : 'default'}
                    className={style.button}
                  >
                    <Flex justify='space-between' align='center'>
                      <Flex gap={5}>
                        <h1>{formatNumber(i)}</h1>
                        <Flex vertical align='flex-start'>
                          <p>coin</p>
                          {id > 3 && <b className={style.bonus}>+{formatNumber((id * 5 * i) / 100)}</b>}
                        </Flex>
                      </Flex>

                      <div>{formatNumberToString(i * 25)} VNĐ</div>
                    </Flex>
                  </ButtonCustom>
                </Col>
              ))}
            </Row>
          </Descriptions.Item>
          <Descriptions.Item label='CHECKOUT option'>
            <Radio.Group>
              {paymetList.map((i, id) => (
                <Radio.Button
                  key={id}
                  onClick={() => setPaymet(i)}
                  type='default'
                  disabled={id !== 0}
                  className={style.button}
                >
                  <img style={{ height: 50, paddingTop: 5 }} src={i === 'VNPay' ? vnpay : paypal} alt={i} />
                </Radio.Button>
              ))}
            </Radio.Group>
          </Descriptions.Item>
          <Descriptions.Item>
            <Divider style={{ margin: 0 }} />
          </Descriptions.Item>
          <Descriptions.Item>
            <Row style={{ width: '100%' }}>
              <Col span={24} md={8}>
                <Space align='baseline' direction={sm ? 'vertical' : 'horizontal'}>
                  <Text type='secondary'>Selected package:</Text>
                  <Flex gap={5}>
                    <Title level={4}>{formatNumber(coin)}</Title>
                    <Flex vertical>
                      <p>coin</p>
                    </Flex>
                  </Flex>
                </Space>
              </Col>
              {coinList.indexOf(coin) > 3 && (
                <Col span={24} md={8}>
                  <Space align='baseline' direction={sm ? 'vertical' : 'horizontal'}>
                    <Text type='secondary'>Bonus:</Text>
                    <Title level={4}>{formatNumber((coin * 5 * coinList.indexOf(coin)) / 100)}</Title>
                  </Space>
                </Col>
              )}
              <Col span={24}>
                <Flex justify='space-between' vertical={sm}>
                  <Space direction={sm ? 'vertical' : 'horizontal'}>
                    <Text type='secondary'>Actual CHECKOUT: </Text>
                    <Title level={sm ? 3 : 1}>{formatNumberToString(coin * 25)} VNĐ</Title>
                  </Space>
                  <ButtonCustom
                    type='primary'
                    size='large'
                    disabled={!coin}
                    onClick={handleCheckout}
                    loading={checkoutMutation.isPending}
                  >
                    Pay
                  </ButtonCustom>
                </Flex>
              </Col>
            </Row>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <PublicRecharge setUserId={setUserId} setFriend={setFriend} setUserData={setUserData} />
      )}
    </Container>
  )
}

export default RechargePage
