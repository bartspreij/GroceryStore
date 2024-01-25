import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface RequireAuthProps {
    children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const { user, isUserAdmin } = useAuth();
    const location = useLocation();

    console.log(user);
    console.log(isUserAdmin);

    if (!user || !isUserAdmin) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    return children;
};
export default RequireAuth;
