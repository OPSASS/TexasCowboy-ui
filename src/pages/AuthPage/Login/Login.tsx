import authApi from '@/apis/auth.api'
import { Notification } from '@/components/AppRedux/AppRedux'
import { AppContext } from '@/contexts/app.context'
import { localAction } from '@/utils/common'
import { useMutation } from '@tanstack/react-query'
import { Button, Flex, Form, Input, Space } from 'antd'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './Login.module.scss'

type formData = {
  account: string
  password: string
}

const Login = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const [form] = Form.useForm()
  const navitage = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (body: any) => authApi.login(body),

    onSuccess: (data) => {
      navitage('/')
      setIsAuthenticated(true)
      setProfile(data.data)
      localAction('profile', data.data, 'add')
      localAction('accdfw2qyb13a4', data.data.accessToken, 'add')
      localAction('rff636edtg7rf1', data.data.refreshToken, 'add')
    },
    onError: () => {
      Notification(
        'error',
        '「パスワードを認識できませんでした。もう一度試すか、パスワードをリセットしてください。」',
        'エラー'
      )
    }
  })

  const onFinish = (values: formData) => {
    loginMutation.mutate(values)
  }

  return (
    <Flex justify='space-evenly' align='center'>
      <Form form={form} onFinish={onFinish} autoComplete='on' className={style.loginMain} size='large'>
        <Space direction='vertical' size='large'>
          <h3 className={style.title}>GPDアカウントにログイン</h3>

          <Form.Item name='account' rules={[{ required: true, message: 'メールを記入してください。' }]} noStyle>
            <Input placeholder='メールアドレス' className={style.formInput} />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'パスワードを記入してください。' }]} noStyle>
            <Input.Password placeholder='*******' className={style.formInput} />
          </Form.Item>

          <Button loading={loginMutation.isPending} type='primary' htmlType='submit'>
            ログイン
          </Button>

          <p className={style.content}>
            または、
            <Link className={'link'} to='/user/forgot-password'>
              パスワードを忘れた場合
            </Link>
          </p>
        </Space>
      </Form>
    </Flex>
  )
}

export default Login
