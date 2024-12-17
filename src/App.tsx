import React from "react";
import Home from "./pages/Home";
import Explorar from "./components/Explorar";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";

const App: React.FC = () => {
    return (
        <Router>
            <div className="pb-16"> {/* Отступ для Navbar */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explorar" element={<Explorar />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
            <Navbar />
        </Router>
    );
}

export default App;