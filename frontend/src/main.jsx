import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css"
import { AuthProvider } from "./context/AuthContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
