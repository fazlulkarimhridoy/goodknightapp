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
import ConsumedProductName from './Pages/ConsumedProductName';
import ConsumerForm from './Pages/ConsumerForm';
import BuyProductStart from './Pages/BuyProductStart';

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
<<<<<<< HEAD
        path:"/getproductname",
        element:<ConsumedProductName/>

      },
      {
        path:"/consumerform",
        element:<ConsumerForm/>
      },
      {
        path:"/buyproductstart",
        element:<BuyProductStart></BuyProductStart>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
