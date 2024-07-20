import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import RegisterPage from '../pages/RegisterPage';
import CheckEmailPage from '../pages/CheckEmailPage';
import CheckPasswordPage from '../pages/CheckPasswordPage';
import Home from '../pages/Home';
import MessagePage from '../components/MessagePage';
import AuthLayout from '../layout';
import ForgetPassword from '../pages/ForgetPassword';

const router = createBrowserRouter([
    {
        path: "/",
        element: React.createElement(App),
        children: [
            {
                path: "",
                element: React.createElement(Home),
                children: [
                    {
                        path: ":userId",
                        element: React.createElement(MessagePage)
                    }
                ]
            },
            {
                path: "register",
                element: React.createElement(AuthLayout, null, React.createElement(RegisterPage))
            },
            {
                path: "email",
                element: React.createElement(AuthLayout, null, React.createElement(CheckEmailPage))
            },
            {
                path: "password",
                element: React.createElement(AuthLayout, null, React.createElement(CheckPasswordPage))
            },
            {
                path : "forget-password",
                element : React.createElement(ForgetPassword)
            }
        ]
    }
]);

export default router;
