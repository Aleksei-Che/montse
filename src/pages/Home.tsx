import { useState, useEffect } from "react";
import React from "react";
import Modal from "../components/Modal";
import BookSearch from "../components/BooksSearch";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import LogoutButton from "../components/buttons/LogoutButton";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import ReadingNow from "../components/homeSections/ReadingNow";
import Finished from "../components/homeSections/Finished";
import ReadLater from "../components/homeSections/ReadLater";

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState<string | null>(null);
    const readingNowBooks = useSelector((state: RootState) => state.books.readingNowBooks);
    const finishedBooks = useSelector((state: RootState) => state.books.finishedBooks);
    const readLaterBooks = useSelector((state: RootState) => state.books.readLaterBooks);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email);
        } else {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="p-4">
            {/* Header with Welcome and Logout */}
            <div className="flex justify-end mb-4">
                {email && <LogoutButton email={email} />}
            </div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Your Library</h1>
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

            {/* Modal for Book Search */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <BookSearch onClose={() => setIsModalOpen(false)} />
            </Modal>

            {/* Sections */}
            <ReadingNow books={readingNowBooks} />
            <Finished books={finishedBooks} />
            <ReadLater books={readLaterBooks} />
        </div>
    );
};

export default Home;