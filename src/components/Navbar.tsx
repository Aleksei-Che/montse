import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-blue-500 text-white flex justify-around py-4">
            <Link to="/" className="hover:text-yellow-300">Home</Link>
            <Link to="/explorar" className="hover:text-yellow-300">Explorar</Link>
            <Link to="/profile" className="hover:text-yellow-300">Perfil</Link>
        </nav>
    );
};

export default Navbar;