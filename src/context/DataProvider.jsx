// AppContext.js

import React, { createContext, useState } from 'react';

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
    latitude:"",
    interested: "",
    quantity: "",
    product_code1:"",
    product_code2: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Define any functions or actions related to the context
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the context value to its children
  return (
    <DataContext.Provider value={{ theme, toggleTheme, customerData,setCustomerData,handleChange, photoURL,setPhotoURL,text, setText }}>
      {children}
    </DataContext.Provider>
  );
};
