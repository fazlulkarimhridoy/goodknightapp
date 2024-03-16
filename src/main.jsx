import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import ErrorPage from '../src/components/ErrorPage';
import StartPage from './Pages/StartPage';
import Homepage from './Pages/Homepage';
import HomePage from './Pages/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <StartPage></StartPage>,
      },
      {
        path: "signin",
        element: <Homepage></Homepage>
      },
      {
        path: "/homePage",
        element: <HomePage></HomePage>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
