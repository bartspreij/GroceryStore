import { createContext, useState, useContext, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({
    user: null,
    handleLogin: () => {},
    handleLogout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = (token: string) => {
        const decodedUser = jwtDecode(token);
        console.log(decodedUser);
        localStorage.setItem('userId', decodedUser.id);
        localStorage.setItem('userRole', decodedUser.roles);
        localStorage.setItem('token', token);
        setUser(decodedUser);
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
