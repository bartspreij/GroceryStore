import {
    createContext,
    useState,
    useContext,
    ReactNode,
    useMemo,
    useCallback,
} from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({
    user: null,
    successMessage: 'Success',
    isUserAdmin: false,
    handleLogin: (token) => {},
    handleLogout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRoles, setUserRoles] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = useCallback((token: string) => {
        const decodedUser = jwtDecode(token);
        console.log(decodedUser);
        localStorage.setItem('userId', decodedUser.sub);
        localStorage.setItem('userRoles', decodedUser.roles);
        localStorage.setItem('token', token);
        setUser(decodedUser);
        setUserRoles(decodedUser.roles);
        setSuccessMessage('Logged in successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('token');
        setUser(null);
        setUserRoles([]);
        setSuccessMessage('Logged out successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    }, []);

    const isUserAdmin = userRoles.includes('ADMIN');

    const contextValue = useMemo(
        () => ({
            user,
            successMessage,
            isUserAdmin,
            handleLogin,
            handleLogout,
        }),
        [user, successMessage, isUserAdmin, handleLogin, handleLogout]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
