import React, { useEffect, useState } from 'react';

const Header = ({
                    className = ''
                }) => {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    // 실시간 시간 업데이트
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(timer);
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
                ${className}
            `}
            style={{
                background: '#CDE5C5',
                maxWidth: '100%',
                width: 'calc(100% - 38px)', // 좌우 8px씩 여백
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

            {/* Logo */}
            <div className="
                flex justify-center items-center py-3
                max-w-md mx-auto w-full
            ">
                <img src="/img/GOODCARE.png" alt="GOODCARE" className="h-5" />
            </div>
        </header>
    );
};

export default Header;