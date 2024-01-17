import Navbar from './components/Navbar';
import Products from './components/Products';
import { ShoppingCartProvider } from './components/cart/ShoppingCartContext';

const App = () => {
    return (
        <ShoppingCartProvider>
            <Navbar />
            <Products />
        </ShoppingCartProvider>
    );
};

export default App;
