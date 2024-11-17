// src/pages/alert/RoutineConfirmation.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../common/component/Header';

const RoutineConfirmation = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            <Header
                title="도움이 필요해요"
                showBack={true}
                showNotification={false}
            />

            <main className="px-4 pt-[104px] pb-24">
                {/* 타이틀 섹션 */}
                <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2">
                        000님에게 필요한 루틴을 추천해요
                    </h2>
                    <p className="text-gray-600 text-sm">
                        2~3월에 1번씩 정기적으로 요청이 들어왔어요
                    </p>
                </div>

                {/* 루틴 카드 */}
                <div className="mb-8">
                    <button
                        className="w-full p-4 bg-gray-50 rounded-xl flex justify-between items-center"
                        onClick={() => {/* 루틴 상세 보기 또는 수정 */}}
                    >
                        <span className="text-lg">18:00</span>
                        <span className="text-gray-600">진통제 주사 확인하기</span>
                    </button>
                </div>

                {/* 추가 루틴이 있다면 여기에 매핑 */}
            </main>

            {/* 하단 버튼 */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
                <div className="flex gap-3 max-w-md mx-auto">
                    <button
                        onClick={() => navigate('/alert/cancel-confirm')} // 실제 경로에 맞게 수정
                        className="flex-1 py-4 bg-gray-100 rounded-xl text-gray-900 font-medium
                     active:bg-gray-200 transition-colors duration-200"
                    >
                        괜찮아요
                    </button>
                    <button
                        onClick={() => navigate('/alert/add')} // 실제 경로에 맞게 수정
                        className="flex-1 py-4 bg-gray-100 rounded-xl text-gray-900 font-medium
                     active:bg-gray-200 transition-colors duration-200"
                    >
                        추가하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoutineConfirmation;