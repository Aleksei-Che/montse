import { useState, useEffect } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { addToLibrary } from "../store/bookSlice";
import { Book } from "../types/book";

interface BookSearchProps {
    onClose: () => void; 
}

const BookSearch: React.FC<BookSearchProps> = ({onClose}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<Book[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!searchTerm) {
                setSuggestions([]);
                return;
            }
            try {
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
                );
                const data = await response.json();
                const books = data.items?.map((item: any) => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    authors: Array.isArray(item.volumeInfo.authors) ? item.volumeInfo.authors : [],
                    thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
                })) || [];
                setSuggestions(books);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        };

        const delayDebounce = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const handleAddToLibrary = (book: Book) => {
        console.log("Adding book:", book);
        dispatch(addToLibrary(book));
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
                            onClick={() => handleAddToLibrary(book)}
                            role="option"
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
        </div>
    );
};

export default BookSearch;