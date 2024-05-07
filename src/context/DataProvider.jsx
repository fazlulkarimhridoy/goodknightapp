// AppContext.js

import React, { createContext, useState } from 'react';
import toast from 'react-hot-toast';

// Create a context object
export const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  // Define state or any other data you want to manage
  const [theme, setTheme] = useState('light');
  const [photoURL, setPhotoURL] = useState(null);
  const [text, setText] = useState("");
  const [customerData, setCustomerData] = useState({
    name: "",
    age: "",
    gender: "",
    phone_number: "",
    previous_used_product: "",
    previous_used_brand: "",
    latitude: "",
    longitude: "",
    interested: "",
    quantity: "",
    product_code1: "",
    product_code2: "",
  })

  const removeData = () => {
    setCustomerData({
      name: "",
      age: "",
      gender: "",
      phone_number: "",
      previous_used_product: "",
      previous_used_brand: "",
      latitude: "",
      longitude: "",
      interested: "",
      quantity: "",
      product_code1: "",
      product_code2: "",
    })
  }

  const englishRegex = /^[a-zA-Z0-9 ]+$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      // If the input field is empty, clear the specific field in the customerData state
      setCustomerData((prevData) => ({
        ...prevData,
        [name]: '',
      }));
    } else if (englishRegex.test(value)) {
      // If the input matches the regex, update the customerData
      setCustomerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // If the input does not match the regex, clear the specific field in the customerData state and show an alert
      setCustomerData((prevData) => ({
        ...prevData,
        [name]: '',
      }));
      toast.error("Type only english")
    }
  };

  // Define any functions or actions related to the context
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the context value to its children
  return (
    <DataContext.Provider value={{ theme, removeData, toggleTheme, customerData, setCustomerData, handleChange, photoURL, setPhotoURL, text, setText }}>
      {children}
    </DataContext.Provider>
  );
};
