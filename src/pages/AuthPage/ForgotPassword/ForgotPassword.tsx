import AuthLayout from '@/components/Layout/AuthLayout/AuthLayout'
import { Button, Form, Input } from 'antd'

type formData = {
  account: string
}

const ForgotPassword = () => {
  const [form] = Form.useForm()

  const onFinish = (values: formData) => {
    console.log(values)
  }

  return (
    <AuthLayout>
      <Form form={form} onFinish={onFinish} autoComplete='on' size='large'>
        <Form.Item name='account' rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input placeholder='Email address' />
        </Form.Item>

        <Button type='primary' htmlType='submit'>
          Send Requet
        </Button>
      </Form>
    </AuthLayout>
  )
}

export default ForgotPassword
