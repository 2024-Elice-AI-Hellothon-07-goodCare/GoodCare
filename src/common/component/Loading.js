import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CHARACTER_STATES = [
    'Excellent',
    'Good',
    'Neutral',
    'Poor',
    'Terrible'
];

const CHARACTER_COLORS = [
    'green',
    'red',
    'yellow'
];

const Loading = ({
                     message,
                     showHeader = true,
                     headerTitle = '',
                     className = ''
                 }) => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState('');
    const [displayMessage, setDisplayMessage] = useState(message);
    const [showFinalState, setShowFinalState] = useState(false);

    useEffect(() => {
        const allCombinations = CHARACTER_STATES.flatMap(state =>
            CHARACTER_COLORS.map(color => `/img/marimo/${state}-${color}.png`)
        );

        let count = 0;
        const maxCount = 10; // 이미지 변경 횟수 설정

        const interval = setInterval(() => {
            if (count < maxCount) {
                const randomIndex = Math.floor(Math.random() * allCombinations.length);
                setCurrentImage(allCombinations[randomIndex]);
                count++;
            } else {
                clearInterval(interval);
                setCurrentImage('/img/marimo/Excellent-green.png');
                setDisplayMessage('결과 분석 완료!');
                setShowFinalState(true);

                // 최종 상태를 보여준 후 1.5초 뒤에 페이지 이동
                setTimeout(() => {
                    navigate('/diagnosis/result');
                }, 1500);
            }
        }, 300);

        // 초기 이미지 설정
        setCurrentImage(allCombinations[0]);

        return () => {
            clearInterval(interval);
        };
    }, [navigate]);

    return (
        <div className={`min-h-screen bg-[#E9EEEA] ${className}`}>
            {showHeader && (
                <div className="fixed top-0 left-0 right-0 bg-[#E9EEEA] z-50">
                    <div className="h-14 flex items-center justify-between px-4 border-b">
                        <button className="p-2 -ml-2 invisible">
                            ←
                        </button>
                        <span className="absolute left-1/2 -translate-x-1/2 font-medium">
                            {headerTitle}
                        </span>
                    </div>
                </div>
            )}

            <main className="flex flex-col items-center justify-center h-screen">
                <div className="relative">
                    {currentImage && (
                        <img
                            src={currentImage}
                            alt="Character"
                            className="w-52 h-62 mb-8 transition-opacity duration-300"
                        />
                    )}
                </div>

                <div className="mt-6 text-center">
                    <p className={`text-2xl font-bold ${showFinalState ? 'text-[#496E1B]' : ''}`}>
                        {displayMessage}
                    </p>
                    {!showFinalState && (
                        <div className="mt-4 flex justify-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#496E1B] animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-2 h-2 rounded-full bg-[#496E1B] animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-2 h-2 rounded-full bg-[#496E1B] animate-bounce" />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Loading;