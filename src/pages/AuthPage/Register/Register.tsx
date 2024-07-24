import authApi from '@/apis/auth.api'
import { Notification } from '@/components/AppRedux/AppRedux'
import AuthLayout from '@/components/Layout/AuthLayout/AuthLayout'
import PATH from '@/constants/path'
import { useMutation } from '@tanstack/react-query'
import { Button, DatePicker, Form, Input, Radio } from 'antd'
import { useNavigate } from 'react-router-dom'

type formData = {
  fullName: string
  lastName: string
  firstName: string
  gender: string
  email: string
  password: string
  confirmPassword: string
  birthday: Date
}

const Register = () => {
  const [form] = Form.useForm()
  const navitage = useNavigate()

  const registerMutation = useMutation({
    mutationFn: (body: any) => authApi.signup(body),

    onSuccess: () => {
      Notification('success', 'Account registration successful, please log in', 'Success')
      setTimeout(() => {
        navitage(PATH.LOGIN)
      }, 3000)
    }
  })

  const onFinish = (values: formData) => {
    registerMutation.mutate({ ...values, fullName: values.firstName + ' ' + values.lastName })
  }

  return (
    <AuthLayout>
      <Form form={form} onFinish={onFinish} autoComplete='on' size='large'>
        <Form.Item name='firstName' rules={[{ required: true, message: 'Please enter your first name' }]}>
          <Input placeholder='First name' />
        </Form.Item>
        <Form.Item name='lastName' rules={[{ required: true, message: 'Please enter your last name' }]}>
          <Input placeholder='Last name' />
        </Form.Item>
        <Form.Item name='birthday' rules={[{ required: true, message: 'Please enter your password' }]}>
          <DatePicker placeholder='Birthday' style={{ width: '100%' }} format={'DD/MM/YYYY'} />
        </Form.Item>
        <Form.Item name='gender' rules={[{ required: true, message: 'Please enter your password' }]}>
          <Radio.Group
            options={[
              { label: 'Male', value: 'MALE' },
              { label: 'Female', value: 'FEMALE' },
              { label: 'Other', value: 'OTHER' }
            ]}
            optionType='button'
          />
        </Form.Item>
        <Form.Item name='email' rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input placeholder='Email address' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password placeholder='*******' />
        </Form.Item>
        <Form.Item name='confirmPassword' rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password placeholder='*******' />
        </Form.Item>

        <Button loading={registerMutation.isPending} type='primary' htmlType='submit'>
          Register
        </Button>
      </Form>
    </AuthLayout>
  )
}

export default Register
