import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../common/component/Header';

const DiagnosisStart = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header
                title="일일 진단하기"
                showBack={true}
                showNotification={false}
            />

            <main className="flex-1 flex flex-col items-center justify-between px-4 pt-[120px] pb-8">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full mb-8" />
                    <div className="text-center space-y-2">
                        <h2 className="text-lg font-medium">전성원님의</h2>
                        <p className="text-lg">일일 건강 진단을 시작해볼까요?</p>
                    </div>
                </div>

                {/* Button Section */}
                <button
                    onClick={() => navigate('/diagnosis/input')}
                    className="w-full py-4 bg-gray-100 rounded-xl text-gray-900 font-medium
                     active:bg-gray-200 transition-colors duration-200"
                >
                    시작하기
                </button>
            </main>
        </div>
    );
};

export default DiagnosisStart;