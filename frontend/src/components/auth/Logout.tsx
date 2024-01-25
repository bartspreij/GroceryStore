import { useContext } from 'react';
import { AuthContext, useAuth } from './AuthProvider';

const Logout = () => {
    const { handleLogout } = useAuth();

    const onLogout = () => {
        handleLogout();
    };

    return (
        <button className="dropdown-item" type="button" onClick={onLogout}>
            Logout
        </button>
    );
};

export default Logout;
