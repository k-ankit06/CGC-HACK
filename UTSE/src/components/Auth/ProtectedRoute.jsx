// import { Navigate } from 'react-router-dom'
// import { useAuth } from './AuthContext'

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const { user } = useAuth()

//   if (!user) {
//     return <Navigate to="/login" />
//   }

//   if (requiredRole && user.role !== requiredRole) {
//     return <Navigate to={`/${user.role}/dashboard`} />
//   }

//   return children
// }

// export default ProtectedRoute

// import { useAuth } from '../Auth/AuthContext';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { useAuth } from '../Auth/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;