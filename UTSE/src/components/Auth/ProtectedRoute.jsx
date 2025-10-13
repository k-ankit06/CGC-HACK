import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth()

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />
  }

  // If a role is required and the user's role doesn't match, redirect them
  if (requiredRole && user.role !== requiredRole) {
    // Redirects user to their own dashboard if they try to access a wrong route
    return <Navigate to={`/${user.role}/dashboard`} />
  }

  // If checks pass, render the requested component
  return children
}

export default ProtectedRoute