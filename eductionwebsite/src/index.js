import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Contact_Us from './Pages/Contact_Us';
import Team from './Pages/Team';
import Courses from './Pages/Courses';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PaymentSucces from './Pages/PaymentSucces';
import PaymentErrorPage from './Pages/PaymentError';
import Logout from './Pages/Logout';
// import PaymentError from './Pages/PaymentError';

let rout = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/about",
    element:<AboutUs/>
  },
  {
    path:"/contact",
    element:<Contact_Us/>
  },
  {
    path:"/team",
    element:<Team/>
  },
  {
    path:"/courses",
    element:<Courses/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/payment-successful",
    element:<PaymentSucces/>
  },
  {
    path:"/payment-failed",
    element:<PaymentErrorPage/>
  },
  {
    path:"/logout",
    element:<Logout/>
  }

])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={rout}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
