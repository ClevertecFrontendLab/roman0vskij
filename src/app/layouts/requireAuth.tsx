import { Navigate, Outlet, useLocation } from 'react-router';

export function RequireAuth() {
    const token = localStorage.getItem('token');
    const location = useLocation();

    return token ? <Outlet /> : <Navigate to='/sign-in' state={{ from: location }} replace />;
}
