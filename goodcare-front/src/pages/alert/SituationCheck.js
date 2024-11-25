// src/pages/alert/SituationCheck.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../common/component/Header';

const SituationCheck = () => {
    const navigate = useNavigate();

    const options = [
        { id: 1, text: '일상적인 요청' },
        { id: 2, text: '기저증상 관련 요청' },
        { id: 3, text: '새로운 증상 관련 요청' },
        { id: 4, text: '기타' }
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

                <div className="space-y-3">
                    {options.map(option => (
                        <button
                            key={option.id}
                            className="w-full p-4 rounded-xl bg-gray-50 text-left text-gray-900
                       active:bg-gray-100 transition-colors duration-200"
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </main>

            {/* 하단 버튼 */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
                <button
                    onClick={() => navigate('/alert/details')} // 다음 페이지 경로를 적절히 설정
                    className="w-full py-4 bg-gray-100 rounded-xl text-gray-900 font-medium
                   active:bg-gray-200 transition-colors duration-200"
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default SituationCheck;