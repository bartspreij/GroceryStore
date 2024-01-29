import {
    createContext,
    useState,
    useContext,
    ReactNode,
    useMemo,
    useEffect,
    useCallback,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { setJwtHeader } from '../../api/api';

/**
This solely exists to satisfy a rule
that makes sure that when the context is used outside of the
`AuthProvider` it is safe to use.
*/
const AuthContext = createContext({
    user: null,
    successMessage: 'Success',
    isAdmin: false,
    isLoading: true,
    handleLogin: (token: string) => {},
    handleLogout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    const processToken = (token: string) => {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        setIsAdmin(decodedUser.roles.includes('ADMIN'));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            processToken(token);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = useCallback((token: string) => {
        localStorage.setItem('token', token);
        const decodedUser = jwtDecode(token);
        processToken(token);
        setJwtHeader(token);
        setSuccessMessage('Logged in successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAdmin(false);
        setSuccessMessage('Logged out successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    }, []);

    const contextValue = useMemo(
        () => ({
            user,
            successMessage,
            isAdmin,
            isLoading,
            handleLogin,
            handleLogout,
        }),
        [user, isAdmin, isLoading, successMessage, handleLogin, handleLogout]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
