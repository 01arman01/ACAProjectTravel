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
import OtherUser from "./routes/OtherUser";
import {USER_PAGE,H0ME_PAGE,LOGIN_PAGE,REGISTER_PAGE, PEOPLE_PAGE,OTHERUSER_PAGE} from "./RoutePath/RoutePath";
import Header from "./components/Header/Header";
import PeopleComponent from "./components/People/PeopleComponent";
import Footer from "./components/Footer/Footer";

const style ={
  position:"absolute",
  bottom:0,
  left:0,
  width:'100vw'
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={H0ME_PAGE} />,
    errorElement: <ErrorPage />,
  },
  {
    path:PEOPLE_PAGE,
    element:<><Header /> <PeopleComponent /></>
  },
  {
    path:H0ME_PAGE,
    element:<><Header /> <Homepage /><Footer/></>
  },
  {
    path: LOGIN_PAGE,
    element: <><Login /></>,
  },
  {
    path: REGISTER_PAGE,
    element: <><Register />></>,
  },
  {
    path: USER_PAGE,
    element: <><Header/><User/><div style={style}><Footer/></div> </>,
  },
  {
    path:OTHERUSER_PAGE,
    element:<><Header /> <OtherUser/></>
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);
