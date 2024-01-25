import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { ShoppingCartProvider } from './components/cart/ShoppingCartContext';

const App = () => {
    return (
        <ShoppingCartProvider>
            <Navbar />
            <div id="outlet">
                <Outlet />
            </div>
        </ShoppingCartProvider>
    );
};

export default App;
