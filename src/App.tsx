import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Explorar from "./components/Explorar";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EnterPage from "./pages/EnterPage";

const App: React.FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

const AppContent: React.FC = () => {
    const location = useLocation();
    const showNavbar = ["/home", "/explorar", "/profile"].includes(location.pathname);

    return (
        <div className="pb-16"> 
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/explorar" element={<Explorar />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/enter" element={<EnterPage />} /> 
                <Route path="*" element={<LoginPage />} /> 
            </Routes>
            {showNavbar && <Navbar />} 
        </div>
    );
};

export default App;