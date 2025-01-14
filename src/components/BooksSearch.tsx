import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToReadingNow, addToReadLater } from "../store/bookSlice";
import { Book } from "../types/book";
import Modal from "./Modal";

interface BookSearchProps {
    onClose: () => void;
}

const BookSearch: React.FC<BookSearchProps> = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null); 
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!searchTerm) {
                setSuggestions([]);
                return;
            }
            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`
                );
                const data = await response.json();
                const books = data.items?.map((item: any) => ({
                    id: item.id,
                    title: item.volumeInfo?.title || "Unknown Title",
                    authors: Array.isArray(item.volumeInfo?.authors) ? item.volumeInfo.authors : [],
                    thumbnail: item.volumeInfo?.imageLinks?.thumbnail || "",
                })) || [];
                setSuggestions(books);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const delayDebounce = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const handleSelectBook = (book: Book) => {
        setSelectedBook(book); // Open Modal wuth the book
    }

    const handleAddToReadingNow = (book: Book) => {
        dispatch(
            addToReadingNow({
                ...book,
                readingStartTime: new Date().toISOString(),
            })
        );
        setSelectedBook(null); // Close the modal
        setSearchTerm("");
        setSuggestions([]);
        onClose();
    };

    const handleAddToReadLater = (book: Book) => {
        dispatch(addToReadLater(book));
        setSelectedBook(null); // Close the modal
        setSearchTerm("");
        setSuggestions([]);
        onClose();
    };
    

    return (
        <div>
            <input
                type="text"
                placeholder="Enter book title or author"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border w-full p-2 mb-4"
                aria-label="Search books"
            />
            {isLoading && <p className="text-gray-500">Loading...</p>}
            {suggestions.length > 0 && (
                <ul
                    className="border bg-white rounded shadow-lg max-h-64 overflow-y-auto"
                    role="listbox"
                    aria-label="Book suggestions"
                >
                    {suggestions.map((book) => (
                        <li
                            key={book.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => handleSelectBook(book)} // Open the Modal
                            role="option"
                            aria-label={`Select ${book.title}`}
                        >
                            <img
                                src={book.thumbnail}
                                alt={`Cover of ${book.title}`}
                                className="w-10 h-16 object-cover mr-4"
                            />
                            <div>
                                <p className="font-semibold">{book.title}</p>
                                <p className="text-sm text-gray-600">
                                    {book.authors.length > 0 ? book.authors.join(", ") : "Unknown Author"}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal with book's details*/}
            {selectedBook && (
                <Modal isOpen={!!selectedBook} onClose={() => setSelectedBook(null)}>
                    <div className="flex flex-col items-center">
                        <img
                            src={selectedBook.thumbnail}
                            alt={`Cover of ${selectedBook.title}`}
                            className="w-32 h-48 object-cover mb-4"
                        />
                        <h2 className="text-xl font-bold">{selectedBook.title}</h2>
                        <p className="text-gray-600">{selectedBook.authors?.join(", ") || "Unknown Author"}</p>
                        <div className="mt-6 flex space-x-4">
                            <button
                                onClick={() => handleAddToReadingNow(selectedBook)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Read Now
                            </button>
                            <button
                                onClick={() => handleAddToReadLater(selectedBook)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Read Later
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};


export default BookSearch;