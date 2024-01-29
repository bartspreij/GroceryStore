import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Products from './components/product/Products';
import ManageProducts from './components/product/ManageProducts';
import RequireAuth from './components/auth/RequireAuth';
import { AuthProvider } from './components/auth/AuthProvider';
import Login from './components/auth/Login';
import ProductDetails from './components/product/ProductDetails';

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
        path: '/product/:id',
        element: <ProductDetails />,
      },
      {
        path: '/admin',
        element: (
          <RequireAuth>
            <ManageProducts />
          </RequireAuth>
        ),
      },
      {
        path: '/login',
        element: <Login redirectOnSuccess="/" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
