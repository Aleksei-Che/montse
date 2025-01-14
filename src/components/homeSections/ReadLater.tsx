import React, { useState } from "react";
import NextBack from "../NextBack";
import { Book } from "../../types/book";

interface ReadLaterProps {
  books: Book[];
}

const ReadLater: React.FC<ReadLaterProps> = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const booksToDisplay = books.slice(currentIndex, currentIndex + 3);

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Read Later</h2>
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

export default ReadLater;