import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Wallet from "./pages/Wallet.jsx";
import SendMoney from "./pages/SendMoney.jsx";
import Transactions from "./pages/Transactions.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import ResetPassword from "./ResetPassword.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />           {/* Home page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/protectedroute" element={<ProtectedRoute/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/resetpassword" element={<ResetPassword/>} />
      </Routes>
    </Router>
  );
}



export default App;