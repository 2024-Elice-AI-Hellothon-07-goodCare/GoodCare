import React from 'react';
import { ChevronLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({
                    title,
                    showBack = false,
                    showNotification = true,
                    className = ''
                }) => {
    const navigate = useNavigate();
    const currentTime = new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 bg-white ${className}`}>
            {/* Status Bar */}
            <div className="p-2 flex justify-between items-center text-xs text-gray-600">
                <span>{currentTime}</span>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full border border-current"></div>
                    <div className="w-3 h-3 rounded-full border border-current"></div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    {showBack && (
                        <button
                            onClick={() => navigate(-1)}
                            className="p-1 -ml-2 rounded-full hover:bg-gray-100"
                        >
                            <ChevronLeft size={24} className="text-gray-700" />
                        </button>
                    )}
                    <h1 className="text-lg font-medium text-gray-900">{title}</h1>
                </div>
                {showNotification && (
                    <button className="p-2 -mr-2 rounded-full hover:bg-gray-100">
                        <Bell size={20} className="text-gray-700" />
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;