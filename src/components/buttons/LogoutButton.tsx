import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

interface LogoutButtonProps {
  email: string; // Email передаётся как пропс
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ email }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully.");
      navigate("/"); // Перенаправление на LoginPage
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex items-center justify-between space-x-4 bg-gray-100 p-2 rounded">
      <div>
        <p className="text-gray-800 font-semibold">Hello,</p>
        <span className="text-gray-700">{email}</span>
      </div>
      <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 flex items-center justify-center w-10 h-10"
          title="Logout" // Подсказка при наведении
      >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-11v1m-6 9h6M7 7h6"
          />
        </svg>
      </button>
    </div>
  );
};

export default LogoutButton;