import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/AuthStore';

const AuthGuard = () => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default AuthGuard;

