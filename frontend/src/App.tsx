import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { ShoppingCartProvider } from './components/cart/ShoppingCartContext';
import { AuthProvider } from './components/auth/AuthProvider';

const App = () => {
    return (
        <AuthProvider>
            <ShoppingCartProvider>
                <Navbar />
                <div id="outlet">
                    <Outlet />
                </div>
            </ShoppingCartProvider>
        </AuthProvider>
    );
};

export default App;
