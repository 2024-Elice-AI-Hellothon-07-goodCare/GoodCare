import React, { useState } from 'react';
import Modal from '../../common/component/Modal';
import { useNavigate } from 'react-router-dom';

const AlertDemo = () => {
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();

    const handleCheck = () => {
        // 상황 확인하기 클릭 시의 로직
        console.log('상황 확인하기 클릭됨');
        setShowModal(false);
        navigate('/alert/situation');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="도움이 필요해요"
                sender="000"
                time="18:34"
                description="00000중상으로 도움 요청 신호를 보냈어요"
                buttonText="상황 확인하기"
                onButtonClick={handleCheck}
            />

            {/* 모달 재표시를 위한 버튼 */}
            {!showModal && (
                <div className="p-4">
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        알림 다시 보기
                    </button>
                </div>
            )}
        </div>
    );
};

export default AlertDemo;