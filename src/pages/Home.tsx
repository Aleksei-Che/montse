import { useState } from "react";
import React from "react";
import Modal from "../components/Modal";
import BookSearch from "../components/BooksSearch";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const library = useSelector((state: RootState) => state.books.library);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Your Library</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <BookSearch onClose={() => setIsModalOpen(false)} />
            </Modal>

            {/* Show books */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Reading Now</h2>
                {library.length > 0 ? (
                    library.map((book) => (
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
            </section>

            {/* Секции для других разделов */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Finished</h2>
                <div className="bg-gray-100 p-4 rounded-md">
                    <p className="text-gray-500">No books in this section yet.</p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Read Later</h2>
                <div className="bg-gray-100 rounded-md p-4">
                    <p className="text-gray-500">No books in the section yet.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;