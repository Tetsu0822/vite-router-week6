import FrontendLayout from "../layout/FrontendLayout";
import Cart from "../pages/front/Cart";
import Home from "../pages/front/Home";
import NotFound from "../pages/front/NotFound";
import Products from "../pages/front/Products";
import SingleProduct from "../pages/front/SingleProduct";
import BackendLayout from "../layout/BackendLayout";
import Orders from "../pages/admin/Orders";
import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminSingleProduct from "../pages/admin/AdminSingleProduct";

import Login from "../pages/admin/Login";


// 前後台 Routes 分離
const routes = [
    // 前台路由
    {
        path: '/',
        element: <FrontendLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'product',
                element: <Products />
            },
            {
                path: 'product/:id',
                element: <SingleProduct />
            },
            {
                path: 'product/category/:child',
                element: <Products />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
    // 後台路由
    {
        path: '/admin',
        element: <BackendLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'products',
                element: <AdminProducts />
            },
            {
                path: 'products/:id',
                element: <AdminSingleProduct />
            },
            {
                path: 'orders',
                element: <Orders />
            }
        ]
    }
]

export default routes;
