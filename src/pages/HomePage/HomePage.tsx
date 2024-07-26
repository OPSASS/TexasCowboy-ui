import PATH from '@/constants/path'
import { Navigate } from 'react-router-dom'

type Props = {}

const HomePage = (props: Props) => {
  return <Navigate to={PATH.TEXAS_COWBOY} />
  // return (
  //   <p>
  //     <h1>Home</h1>
  //     <Space>
  //       <Link to={PATH.TEXAS_COWBOY}>Texas Cowboy</Link>
  //       <Link to={PATH.BUSINESS_AND_STRATEGY}>Business & Strategy</Link>
  //     </Space>
  //   </p>
  // )
}

export default HomePage
