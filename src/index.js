import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import Login from "./routes/login";
import Register from "./routes/register";
import User from "./routes/user";
import ErrorPage from './error-page'
import { Margin } from '@mui/icons-material';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="login"/>,
        errorElement: <ErrorPage/>, 
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/user",
        element: <User/>,
    },
]);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);