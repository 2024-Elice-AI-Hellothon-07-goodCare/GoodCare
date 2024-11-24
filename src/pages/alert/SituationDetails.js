// src/pages/alert/SituationDetails.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../common/component/Header';

const SituationDetails = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { id: 1, text: '루틴 어찌고' },
        { id: 2, text: '루틴 어찌고' },
        { id: 3, text: '루틴 어찌고' },
        { id: 4, text: '루틴 어찌고' },
        { id: 5, text: '루틴 어찌고' },
        { id: 6, text: '루틴 어찌고' },
        { id: 7, text: '루틴 외 요청' },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header
                title="도움이 필요해요"
                showBack={true}
                showNotification={false}
            />

            <main className="px-4 pt-[104px] pb-24">
                <h2 className="text-lg font-medium mb-2">
                    상태 설명 어떻게하셨고
                </h2>
                <p className="text-gray-600 mb-8">
                    어떤 문제였나요?
                </p>

                {/* 그리드 레이아웃의 옵션 버튼들 */}
                <div className="grid grid-cols-2 gap-3">
                    {options.map((option, index) => (
                        <button
                            key={option.id}
                            className={`
                p-4 rounded-xl text-center
                ${index === options.length - 1 && options.length % 2 !== 0 ? 'col-span-2' : ''}
                ${selectedOption === option.id ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-900'}
                active:bg-gray-100 transition-colors duration-200
              `}
                            onClick={() => setSelectedOption(option.id)}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </main>

            {/* 하단 네비게이션 버튼 */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
                <div className="flex gap-3 max-w-md mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 py-4 bg-gray-100 rounded-xl text-gray-900 font-medium
                     active:bg-gray-200 transition-colors duration-200"
                    >
                        이전
                    </button>
                    <button
                        onClick={() => navigate('/alert/routine')}
                        className="flex-1 py-4 bg-gray-100 rounded-xl text-gray-900 font-medium
                     active:bg-gray-200 transition-colors duration-200"
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SituationDetails;