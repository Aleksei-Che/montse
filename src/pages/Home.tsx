import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-3xl font-bold mb-4">Bienvenido a Montse</h1>
            <p className="text-lg">Agrega tus libros y sigue tu progreso de lectura.</p>
        </div>
    );
};

export default Home;