import { Navigate, useLocation } from 'react-router';

export function Verification() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const emailVerified = params.get('emailVerified');

    return emailVerified === 'true' ? (
        <Navigate to='/sign-in?emailVerified=true' state={{ from: location }} replace />
    ) : (
        <Navigate to='/sign-up?emailVerified=false' state={{ from: location }} replace />
    );
}
