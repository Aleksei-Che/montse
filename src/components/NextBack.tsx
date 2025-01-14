import React from "react";

interface NextBackProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
}

const NextBack: React.FC<NextBackProps> = ({ currentIndex, setCurrentIndex, totalItems }) => {
  const handleNext = () => {
    if (currentIndex + 3 < totalItems) {
      setCurrentIndex((prev) => prev + 3);
    }
  };

  const handleBack = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex((prev) => prev - 3);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4">
      {currentIndex > 0 && (
        <button
          onClick={handleBack}
          className="text-blue-500 hover:text-blue-700"
          aria-label="Previous"
        >
          &#8592;
        </button>
      )}
      {currentIndex + 3 < totalItems && (
        <button
          onClick={handleNext}
          className="text-blue-500 hover:text-blue-700"
          aria-label="Next"
        >
          &#8594;
        </button>
      )}
    </div>
  );
};

export default NextBack;