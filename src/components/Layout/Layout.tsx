import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Footerlayout from './Footer'
import styles from './Layout.module.scss'
import Nav from './Navigation/Navigation'
type Props = {
  children?: React.ReactNode
  title?: string
  // user?: UserState
}

const LayoutComponent = (props: Props) => {
  const { title, children } = props

  if (title) {
    document.title = title + ' | Texas Cowboy'
  }

  return (
    <Layout>
      <Nav />
      <div className={styles.children}>
        {children}
        <Outlet />
      </div>
      <Footerlayout />
    </Layout>
  )
}

export default LayoutComponent
