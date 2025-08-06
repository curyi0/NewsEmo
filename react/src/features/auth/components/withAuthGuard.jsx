import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const withAuthGuard = (Component) => {
  return (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    if (!isAuthenticated) return <Navigate to="/login" replace />
    return <Component {...props} />
  }
}

export const withAdminGuard = (Component) => {
  return (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const user = useSelector((state) => state.user)
    const isAdmin = user?.roles?.includes('ROLE_ADMIN')
    console.log('@@@@',user)
    if (!isAuthenticated) return <Navigate to='/login' replace />
    if (!isAdmin) return <Navigate to='/' replace />
    return <Component {...props} />
  }
}