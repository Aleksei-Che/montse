import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Logo from "../components/logo/Logo";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [animationStage, setAnimationStage] = useState<"intro" | "fade-out" | "welcome">("intro");
  const [showLogo, setShowLogo] = useState(false); // Управляет видимостью логотипа

  useEffect(() => {
    // Таймер для смены анимаций
    const introTimer = setTimeout(() => setAnimationStage("fade-out"), 3000); // 3 секунды на "Hi! I'm Montse."
    const welcomeTimer = setTimeout(() => setAnimationStage("welcome"), 4000); // Еще 1 секунда на исчезновение
    const logoTimer = setTimeout(() => setShowLogo(true), 4000); // Появление логотипа через 4 секунды

    return () => {
      clearTimeout(introTimer);
      clearTimeout(welcomeTimer);
      clearTimeout(logoTimer);
    };
  }, []);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 text-white">
      {/* Логотип */}
      {showLogo && (
        <div className="absolute top-6 left-6 animate-fade-in">
          <Logo />
        </div>
      )}

      {/* Animation */}
      <div className="mb-8 text-center">
        {animationStage === "intro" && (
          <h1 className="text-4xl font-bold animate-fade-in">Hi! I'm Montse.</h1>
        )}
        {animationStage === "fade-out" && (
          <h1 className="text-4xl font-bold animate-fade-out">Hi! I'm Montse.</h1>
        )}
        {animationStage === "welcome" && (
          <h1 className="text-4xl font-bold animate-fade-in">Welcome</h1>
        )}
        <p className="mt-4 text-lg opacity-75 animate-fade-in">
          Your habit of reading is about to level up.
        </p>
      </div>

      {/* Форма */}
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm text-black">
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
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Checking..." : "Get Started"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;