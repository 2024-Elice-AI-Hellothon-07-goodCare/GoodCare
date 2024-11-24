import React, { useRef, useEffect } from 'react';

const Dropdown = ({ isOpen, onClose, items }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10 overflow-hidden"
        >
            {items.map((item, index) => (
                <button
                    key={index}
                    onClick={() => {
                        item.onClick();
                        onClose();
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 
                        ${item.color ? `text-${item.color}-500` : 'text-gray-700'}
                        ${index === 0 ? 'rounded-t-lg' : ''}
                        ${index === items.length - 1 ? 'rounded-b-lg' : ''}
                        ${item.className || ''}`}
                >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default Dropdown;