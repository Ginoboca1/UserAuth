import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import AuthProvider from "./Context/AuthContex";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="bg-slate-300 text-black h-screen flex text-white">
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/"
                element={
                  <ProtectedRoutes>
                    <Home />
                  </ProtectedRoutes>
                }
              />
              <Route path="/register" element={<Register />} />
            </Routes>
          </AuthProvider>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
