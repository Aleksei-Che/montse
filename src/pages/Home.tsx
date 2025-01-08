import { useState } from "react";
import React from 'react';
import Modal from "../components/Modal";

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-bold mb-4'>Your Library</h1>
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

            <Modal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
            <h2 className="text-xl font-bold mb-4">Search for a Book</h2>
            <input
                type="text"
                placeholder="Enter book title or author"
                className="border border-gray-300 rounded-lg w-full p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
             />
            </Modal>
            
            <section className='mb-8'>
                <h2 className='text-xl font-semibold mb-2'>Reading Now</h2>
                <div className='bg-gray-100 p-4 rounded-md'>
                    <p className='text-gray-500'>No books in this section yet.</p>
                </div>
            </section>

            <section className='mb-8'>
                <h2 className='text-xl font-semibold mb-2'>Finished</h2>
                <div className='bg-gray-100 p-4 rounded-md'>
                    <p className='text-gray-500'>No books in this section yet.</p>
                </div>
            </section>

            <section className='mb-8'>
                <h2 className='text-xl font-semibold mb-2'>Read Later</h2>
                <div className='bg-gray-100 rounded-md p-4'>
                    <p className='text-gray-500'>No books in the section yet.</p>
                </div>
            </section>

        </div>
    );
};

export default Home;