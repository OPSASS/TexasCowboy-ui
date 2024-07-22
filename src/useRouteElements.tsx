/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import LayoutComponent from './components/Layout/Layout'
import PageResult from './components/PageResult'
import PATH from './constants/path'
import { AppContext } from './contexts/app.context'
import Login from './pages/AuthPage/Login/Login'
import BusinessAndStrategy from './pages/Game/BusinessAndStrategy'
import TexasCowboyPage from './pages/Game/TexasCowboyPage'
import HomePage from './pages/HomePage/HomePage'

const checkAuth = () => {
  const { isAuthenticated } = useContext(AppContext)

  if (!isAuthenticated) return <Outlet />
}

const AdminRole = () => {
  const { isAuthenticated, profile } = useContext(AppContext)

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  const userRole = profile.role[0]

  if (userRole === 2) {
    return <Outlet />
  }
  return <Navigate to='/403' />
}

const UserRole = () => {
  const { isAuthenticated, profile } = useContext(AppContext)

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  const userRole = profile.role[0]

  if (userRole === 0) {
    return <Outlet />
  } else return <Navigate to={`dashboard`} />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    // =================================PRIVATE=================================
    // Admin
    {
      path: '/dashboard',
      element: AdminRole(),
      children: [
        {
          path: '',
          index: true,
          element: <Navigate to={`/dashboard`} replace />
        }
      ]
    },

    // User
    {
      path: '',
      element: UserRole(),
      children: [
        {
          path: PATH.HOME,
          index: true,
          element: <HomePage />
        },
        {
          path: PATH.TEXAS_COWBOY,
          element: (
            <LayoutComponent>
              <TexasCowboyPage />
            </LayoutComponent>
          )
        },
        {
          path: PATH.BUSINESS_AND_STRATEGY,
          element: <BusinessAndStrategy />
        }
      ]
    },
    // =================================PUBLIC=================================
    {
      element: checkAuth(),
      children: [
        {
          path: PATH.LOGIN,
          element: <Login />
        }
      ]
    },
    {
      children: [
        { path: '/404', element: <PageResult code={404} /> },
        { path: '/403', element: <PageResult code={403} desc='このページにアクセスできません' /> },
        { path: '*', element: <PageResult code={404} /> }
      ]
    }
  ])

  return routeElements
}
