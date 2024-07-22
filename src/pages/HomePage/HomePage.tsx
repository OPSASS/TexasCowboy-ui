import PATH from '@/constants/path'
import { Space } from 'antd'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <p>
      <h1>Home</h1>
      <Space>
        <Link to={PATH.TEXAS_COWBOY}>Texas Cowboy</Link>
        <Link to={PATH.BUSINESS_AND_STRATEGY}>Business & Strategy</Link>
      </Space>
    </p>
  )
}
