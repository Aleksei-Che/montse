import React, { useState } from "react";
import useNavigation from "../hooks/useNavigation";

const LoginPage: React.FC = () => {
    const { goForward } = useNavigation();
    const [email, setEmail] = useState("");

    const handleCheckEmail = () => {
        console.log("Checking email:", email);
        goForward("/register"); // Временный переход на регистрацию
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Welcome to Montse</h1>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded w-80 mb-4"
            />
            <button
                onClick={handleCheckEmail}
                className="bg-blue-500 text-white py-2 px-4 rounded w-80 hover:bg-blue-600"
            >
                Continue
            </button>
        </div>
    );
};

export default LoginPage;