import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter, } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../src/components/ErrorPage";
import StartPage from "./Pages/StartPage";
import Homepage from "./Pages/HomePage";
import SignInPage from "./Pages/SignInPage";
import AddConsumerUse from "./Pages/AddConsumerUse";
import ConsumedProductName from "./Pages/ConsumedProductName";
import ConsumerForm from "./Pages/ConsumerForm";
import BuyProductStart from "./Pages/BuyProductStart";
import AmountCalculation from "./Pages/AmountCalculation";
import MobileNumber from "./Pages/MobileNumber";
import OtpVerification from "./Pages/OtpVerification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import VideoPlay from "./Pages/VideoPlay";
import { DataProvider } from "./context/DataProvider";
import ExistedConsumerError from "./Pages/ExistedConsumerError"
import SuccessPage from "./Pages/SuccessPage"
import { Toaster } from "react-hot-toast";
import ImageToText from "./Pages/ImageToText";
import { motion, AnimatePresence } from "framer-motion";




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
        element: <SignInPage></SignInPage>,
      },
      {
        path: "/usedproduct",
        element: <AddConsumerUse></AddConsumerUse>,
      },
      {
        path: "/getproductname",
        element: <ConsumedProductName></ConsumedProductName>,
      },
      {
        path: "/consumerform",
        element: <ConsumerForm></ConsumerForm>,
      },
      {
        path: "/buyproductstart",
        element: <BuyProductStart></BuyProductStart>,
      },
      {
        path: "/homePage",
        element: <Homepage></Homepage>,
      },
      {
        path: "/calculation",
        element: <AmountCalculation></AmountCalculation>,
      },
      {
        path: "/number",
        element: <MobileNumber></MobileNumber>,
      },
      {
        path: "/otp",
        element: <OtpVerification></OtpVerification>,
      },
      {
        path: "/video",
        element: <VideoPlay></VideoPlay>,
      },
      {
        path: "/duplicateCustomer",
        element: <ExistedConsumerError></ExistedConsumerError>
      },
      {
        path: "/successPage",
        element: <SuccessPage></SuccessPage>
      },
      {
        path: "/takeImage",
        element: <ImageToText></ImageToText>
      }
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <Toaster position="top-left" />
        <AnimatePresence initial={false}>
          <RouterProvider router={router} />
        </AnimatePresence>
      </DataProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
