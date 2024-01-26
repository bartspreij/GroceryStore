import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface RequireAuthProps {
    children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const { isAdmin, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    return children;
};
export default RequireAuth;
