import authApi from '@/apis/auth.api'
import AuthLayout from '@/components/Layout/AuthLayout/AuthLayout'
import { AppContext } from '@/contexts/app.context'
import { localAction } from '@/utils/common'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

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
    }
  })

  const onFinish = (values: formData) => {
    loginMutation.mutate(values)
  }

  return (
    <AuthLayout>
      <Form form={form} onFinish={onFinish} autoComplete='on' size='large'>
        <Form.Item name='account' rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input placeholder='Email address' />
        </Form.Item>

        <Form.Item name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password placeholder='*******' />
        </Form.Item>

        <Button loading={loginMutation.isPending} type='primary' htmlType='submit'>
          Login
        </Button>
      </Form>
    </AuthLayout>
  )
}

export default Login
