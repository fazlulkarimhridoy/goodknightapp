import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import ErrorPage from '../src/components/ErrorPage';
import StartPage from './Pages/StartPage';
import Homepage from './Pages/HomePage';
import SignInPage from './Pages/SignInPage';
import AddConsumerUse from './Pages/AddConsumerUse';

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
        element: <SignInPage></SignInPage>
      },
      {
        path:"/usedproduct",
        element:<AddConsumerUse></AddConsumerUse>
      },
      {
        path:"/homePage",
        element:<Homepage></Homepage>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
