import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import NewsDetail from './pages/NewsDetail'
import Login from './pages/Admin/Login'
import Layout from './pages/Admin/Layout'
import HomeDetail from './pages/Admin/HomeDetail'
import HomeEdit from './pages/Admin/HomeDetail/HomeEdit'
import ContactUser from './pages/Admin/ContactUser'
import ProductManage from './pages/Admin/ProductManage'
import ProductEdit from './pages/Admin/ProductEdit'
import ArticleManage from './pages/Admin/ArticleManage'
import ArticleEdit from './pages/Admin/ArticleEdit'

export const Routes = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/admin',
        element: <Layout />,
        children: [
            {
                path: '/admin/home-detail',
                element: <HomeDetail />,
            },
            {
                path: '/admin/home-edit',
                element: <HomeEdit />,
            },
            {
                path: '/admin/product-manage',
                element: <ProductManage />,
            },
            {
                path: '/admin/product-edit',
                element: <ProductEdit />,
            },
            {
                path: '/admin/article-manage',
                element: <ArticleManage />,
            },
            {
                path: '/admin/article-edit',
                element: <ArticleEdit />,
            },
            {
                path: '/admin/contact-user',
                element: <ContactUser />,
            },
        ]
    },
    {
        path: '/',
        element: <Home />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/detail',
                element: <NewsDetail />,
            },
            {
                path: '/home',
                element: null,
            },
            {
                path: '/product',
                element: null,
            },
            {
                path: '/resolution',
                element: null,
            },
            {
                path: '/successed-case',
                element: null,
            },
            {
                path: '/contact-us',
                element: null,
            },
            {
                path: '/about-us',
                element: null,
            },
            {
                path: '/search',
                element: null,
            },
            {
                path: '/information',
                element: null,
            },
            {
                path: '/news',
                element: null,
            },
        ]
    },
])