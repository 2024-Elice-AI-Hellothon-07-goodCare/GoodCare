// src/pages/alert/RoutineCancelConfirm.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../common/component/Header';

const RoutineCancelConfirm = () => {
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
                        <span>000님에게 최근</span>
                        <br />
                        <span>0000 잘함이 자주 보고되고 있어요</span>
                    </h2>
                    <p className="text-gray-600 text-sm">
                        2~3월에 1번씩 정기적으로 요청이 들어왔어요
                    </p>
                </div>

                {/* 루틴 카드 */}
                <div className="mb-8">
                    <div className="w-full p-4 bg-gray-50 rounded-xl flex justify-between items-center">
                        <span className="text-lg">18:00</span>
                        <span className="text-gray-600">진통제 주사 확인하기</span>
                    </div>
                </div>
            </main>

            {/* 하단 버튼 */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
                <div className="flex gap-3 max-w-md mx-auto">
                    <button
                        onClick={() => navigate('/alert/completed')} // 혹은 다른 적절한 경로
                        className="flex-1 py-4 bg-gray-100 rounded-xl text-gray-900 font-medium
                     active:bg-gray-200 transition-colors duration-200"
                    >
                        괜찮아요
                    </button>
                    <button
                        onClick={() => navigate('/alert/add')} // 혹은 다른 적절한 경로
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

export default RoutineCancelConfirm;