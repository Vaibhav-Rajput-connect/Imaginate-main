import { BrowserRouter } from 'react-router-dom';
import React from "react";                 
import ReactDOM from "react-dom/client";  
import AppContextProvider from './context/AppContext.jsx';

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AppContextProvider>
  <App/>
  </AppContextProvider>
  </BrowserRouter>      
);
