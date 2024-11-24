// src/common/component/Modal.js
import React from 'react';
import { X } from 'lucide-react';

const Modal = ({
                   isOpen,
                   onClose,
                   title,
                   description,
                   buttonText,
                   onButtonClick,
                   image,
                   time,
                   sender
               }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div className="flex flex-col items-center text-center pt-4">
                    {/* Image */}
                    {image ? (
                        <img
                            src={image}
                            alt="alert"
                            className="w-24 h-24 rounded-full bg-gray-100 mb-6"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-100 mb-6" />
                    )}

                    {/* Title */}
                    <h2 className="text-lg font-medium mb-2">
                        {title}
                    </h2>

                    {/* Description */}
                    <div className="space-y-1 mb-8">
                        <p className="text-gray-600 text-sm">
                            {sender}님의 방금({time})
                        </p>
                        <p className="text-gray-600 text-sm">
                            {description}
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        onClick={onButtonClick}
                        className="w-full py-4 bg-gray-100 rounded-xl text-gray-900 font-medium
                     active:bg-gray-200 transition-colors duration-200"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;