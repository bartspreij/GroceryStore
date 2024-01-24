import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
    children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const user = localStorage.getItem('userId');
    const location = useLocation();
    if (!user) {
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }
    return children;
};
export default RequireAuth;
