import React, { useEffect, useState } from 'react';
import { ChevronLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({
                    title,
                    showBack = false,
                    showNotification = true,
                    className = ''
                }) => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [scrolled, setScrolled] = useState(false);

    // 실시간 시간 업데이트
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // 스크롤 감지
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function getCurrentTime() {
        return new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    return (
        <header
            className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-200
        ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'}
        ${className}
      `}
            style={{
                maxWidth: '100%',
                width: '100%',
                margin: '0 auto'
            }}
        >
            {/* Status Bar */}
            <div className="
        p-2 flex justify-between items-center text-xs text-gray-600
        max-w-md mx-auto w-full
      ">
                <span>{currentTime}</span>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full border border-current"></div>
                    <div className="w-3 h-3 rounded-full border border-current"></div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="
        flex items-center justify-between
        px-4 py-3 border-b border-gray-100
        max-w-md mx-auto w-full
      ">
                <div className="flex items-center gap-2 flex-1">
                    {showBack && (
                        <button
                            onClick={() => navigate(-1)}
                            className="
                p-1 -ml-2 rounded-full
                hover:bg-gray-100 active:bg-gray-200
                transition-colors
              "
                        >
                            <ChevronLeft size={24} className="text-gray-700" />
                        </button>
                    )}
                    <h1 className="text-lg font-medium text-gray-900 truncate">
                        {title}
                    </h1>
                </div>
                {showNotification && (
                    <button className="
            p-2 -mr-2 rounded-full
            hover:bg-gray-100 active:bg-gray-200
            transition-colors relative
          ">
                        <Bell size={20} className="text-gray-700" />
                        {/* Notification dot - 필요한 경우 활성화
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
            */}
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;