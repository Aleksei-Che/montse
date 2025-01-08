import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
   if (!isOpen) return null;

   return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center">
       <div className="bg-white rounded-lg p-6 w-3/4 max-w-md relative">
          {/* Кнопка закрытия */}
            <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
                ✖
            </button>
            {children}
        </div>
    </div>
   )
}
export default Modal;