import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Unauthorized from './Unauthorized';

interface RequireAuthProps {
    children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const user = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');
    const location = useLocation();

    // Check if user is authenticated
    if (!user || !role) {
        // If user or role is missing, redirect to login
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }

    // Check if user has ADMIN role
    if (role === 'ADMIN') {
        // If user is ADMIN, render children components for authorized users
        return <>{children}</>;
    }

    // For USER role, you can specify the routes they can access
    const allowedRoutes = ['/dashboard', '/user-calls', '/profile', '/make-call', '/payment'];
    if (allowedRoutes.includes(location.pathname)) {
        // If user has USER role and the route is allowed, render children components
        return <>{children}</>;
    }

    // If user is not ADMIN and the route is not allowed, render Unauthorized component
    return <Unauthorized />;
};

export default RequireAuth;

/*
interface RequireAuthProps {
    children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const user = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');
    const location = useLocation();

    if (!user || !role) {
        // If user or role is missing, redirect to login
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }

    // Check if user has admin role
    if (role !== 'ADMIN') {
        // If user is not admin, render unauthorized component
        return <Unauthorized />;
    }

    // Render children components for authorized users
    return <>{children}</>;
};

export default RequireAuth;
*/

/*
interface RequireAuthProps {
    children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const user = localStorage.getItem('userId');
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }

    return <>{children}</>;
};

export default RequireAuth;
*/
/*
const RequireAuth = ({children}) => {
    const user = localStorage.getItem('userId')
    const location = useLocation()
    if (!user) {
        return <Navigate to="/login" state={{ path: location.pathname }} />
    }
    return children
}

export default RequireAuth
*/