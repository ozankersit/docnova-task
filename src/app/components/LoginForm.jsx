import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequest } from '../services/auth-service'
import { loginSuccess } from '../slices/auth-slice'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error } = useSelector((state) => state.auth)

  const onFinish = async (values) => {
    try {
      const data = await loginRequest(values.email, values.password)
      dispatch(loginSuccess(data))
      navigate('/invoice')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!'}]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form.Item>

      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      )}
    </Form>
  )
}
