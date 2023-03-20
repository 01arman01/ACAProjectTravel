import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./routes/login";
import Register from "./routes/register";
import User from "./routes/user";
import ErrorPage from "./error-page";
import Homepage from "./routes/homepage";
import {USER_PAGE,H0ME_PAGE,LOGIN_PAGE,REGISTER_PAGE} from "./RoutePath/RoutePath";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={H0ME_PAGE} />,
    errorElement: <ErrorPage />,
  },
  {
    path:H0ME_PAGE,
    element:<Homepage />
  },
  {
    path: LOGIN_PAGE,
    element: <Login />,
  },
  {
    path: REGISTER_PAGE,
    element: <Register />,
  },
  {
    path: USER_PAGE,
    element: <User />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);
