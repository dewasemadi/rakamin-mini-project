import { Navigate } from 'react-router-dom'
import { getTokenFromLocalStorage } from 'utils/tokenManager'

interface RequireAuthProps {
  children: JSX.Element
  redirectTo: string
}

export default function RequireAuth({ children, redirectTo }: RequireAuthProps) {
  const isAuthenticated = getTokenFromLocalStorage() ? true : false
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}
