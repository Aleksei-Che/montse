import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckEmail = async () => {
    setIsLoading(true);
    try {
      setError(""); 
      const trimmedEmail = email.trim();
      const db = getFirestore();
      const docRef = doc(db, "users", trimmedEmail);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        navigate("/enter", { state: { email: trimmedEmail } });
      } else {
        navigate("/register", { state: { email: trimmedEmail } });
      }
    } catch (error) {
      setError("Failed to verify email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <button
          type="button"
          onClick={handleCheckEmail}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Checking..." : "Check Email"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;