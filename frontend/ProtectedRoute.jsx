
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './src/hooks/useAuth';

const ProtectedRoute = ({ children, ...props }) => {
  const { user } = useAuth();

  return (
    <Route
      {...props}
      element={user ? children : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoute;
/*
const ProtectedRoute = ({ element, ...props }) => {
  const { user } = useAuth();

  return (
    <Route
      {...props}
      element={user ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;

*/

/*
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './src/hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

*/
/*
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
*/
//export default ProtectedRoute;



/*
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './src/hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
*/

/*import { Navigate } from "react-router-dom";
import { useAuth } from "./src/hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};*/