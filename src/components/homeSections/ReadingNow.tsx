import React, { useState, useEffect } from "react";
import { Book } from "../../types/book";
import { useDispatch } from "react-redux";
import { addToFinished, removeFromReadingNow } from "../../store/bookSlice";
import NextBack from "../NextBack";

interface ReadingNowProps {
  books: Book[];
}

const ReadingNow: React.FC<ReadingNowProps> = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const booksToDisplay = books.slice(currentIndex, currentIndex + 3);

  const calculateReadingTime = (startTime: string) => {
    const start = new Date(startTime);
    const now = new Date();
    const diff = Math.abs(now.getTime() - start.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    return `${days} days ${hours % 24} hours`; 
  };

  const handleStopReading = (book: Book) => {
    if (!book.readingStartTime) {
      console.error("Reading start time is missing for this book.");
      return;
    }
    const readingEndTime = new Date().toISOString();
    const readingTime = calculateReadingTime(book.readingStartTime);
  
    dispatch(removeFromReadingNow(book.id));
    dispatch(
      addToFinished({
        ...book,
        finishedTime: readingEndTime,
        readingTime,
      })
    );
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Reading Now</h2>
      {booksToDisplay.length > 0 ? (
        booksToDisplay.map((book) => (
          <div key={book.id} className="p-4 bg-gray-100 rounded-md mb-4 flex items-start">
            <img
              src={book.thumbnail}
              alt={`Cover of ${book.title}`}
              className="w-16 h-24 object-cover mr-4"
            />
            <div>
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">
                {book.authors.length > 0 ? book.authors.join(", ") : "Unknown Author"}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Reading Time: {book.readingStartTime ? calculateReadingTime(book.readingStartTime) : "0 days 0 hours"}
              </p>
              <button
                onClick={() => handleStopReading(book)}
                className="bg-red-500 text-white py-1 px-2 mt-2 rounded hover:bg-red-600 cursor-pointer"
              >
                Stop
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-gray-500">No books in this section yet.</p>
        </div>
      )}

      <NextBack
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        totalItems={books.length}
      />
    </section>
  );
  
};

export default ReadingNow;