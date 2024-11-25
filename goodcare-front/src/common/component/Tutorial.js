import React, { useEffect, useState } from 'react';

const TutorialOverlay = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose(); // 3초 후 자동 닫기
        }, 3000);

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, [onClose]);

    if (!isVisible) return null; // 보이지 않을 때는 렌더링하지 않음

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 animate-fadeIn"
        >
            <div className="relative max-w-lg w-11/12 bg-white rounded-lg p-6 shadow-xl">
                {/* 텍스트 영역 */}
                <p className="text-lg font-semibold text-gray-800 text-center mb-4">
                    오른쪽 위 마리모를 클릭하시면 <br />
                    환자의 도움의 소리를 들을 수 있습니다
                </p>
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                    aria-label="Close"
                >
                    &times;
                </button>
                {/* 하단 진행바 */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 animate-slideIn"
                        style={{ animationDuration: '3s' }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default TutorialOverlay;
