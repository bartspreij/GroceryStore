import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

const Logout = () => {
    const auth = useContext(AuthContext);

    const handleLogout = () => {
        auth.handleLogout();
    };

    return (
        <button className="dropdown-item" type="button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
