import React from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSignUp from "./components/SignInSignUp";
import Home from "./pages/HomePage";
import Service from "./pages/Services";
import Solution from "./pages/Solutions";
import './App.css';

const clientId = '361933842826-brilkrt4sknm1m2fpho0fue8pq658grj.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInSignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Service />} />
          <Route path="/solutions" element={<Solution />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
