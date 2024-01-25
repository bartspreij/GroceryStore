import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Products from './components/Products';
import ManageProducts from './components/ManageProducts';
import RequireAuth from './components/auth/RequireAuth';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Products />,
            },
            {
                path: '/admin',
                element: (
                    <RequireAuth>
                        <ManageProducts />
                    </RequireAuth>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
