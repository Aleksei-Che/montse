import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { setDoc, doc, getFirestore } from "firebase/firestore";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEmail = location.state?.email || ""; 
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Add user in Firestore
      const db = getFirestore();
      const userRef = doc(db, "users", email);
      await setDoc(userRef, { email });
      navigate("/home");
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`${isLoading ? "bg-gray-300" : "bg-blue-500"} text-white p-2 rounded hover:bg-blue-600 w-full`}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;