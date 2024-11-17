import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Header from '../../../common/component/Header';

const PhysicalChecklist = () => {
    const navigate = useNavigate();

    // 피부 상태 체크
    const [skinConditions, setSkinConditions] = useState({
        normal: false,
        rash: false,
        swelling: false,
        bedsore: false
    });

    // 통증 여부 체크
    const [painStatus, setPainStatus] = useState({
        none: false,
        mild: false,
        moderate: false,
        severe: false
    });

    // 운동 및 자세 변화 체크
    const [movementStatus, setMovementStatus] = useState({
        normal: false,
        limited: false,
        needHelp: false
    });

    const CheckItem = ({ label, checked, onChange }) => (
        <button
            onClick={onChange}
            className={`
        w-full p-4 rounded-xl mb-3 flex justify-between items-center
        ${checked ? 'bg-blue-50' : 'bg-gray-50'}
        transition-colors duration-200
      `}
        >
            <span className="text-gray-900">{label}</span>
            {checked && <Check size={20} className="text-blue-500" />}
        </button>
    );

    return (
        <div className="min-h-screen bg-white">
            <Header
                title="일일 진단하기"
                showBack={true}
                showNotification={false}
            />

            <main className="px-4 pt-[104px] pb-24">
                <h2 className="text-lg mb-6">
                    성원님의 신체 상태를 체크해주세요.
                </h2>

                {/* 피부 상태 섹션 */}
                <div className="mb-8">
                    <h3 className="text-gray-600 text-sm mb-3">피부 상태</h3>
                    <CheckItem
                        label="정상"
                        checked={skinConditions.normal}
                        onChange={() => setSkinConditions(prev => ({ ...prev, normal: !prev.normal }))}
                    />
                    <CheckItem
                        label="발적"
                        checked={skinConditions.rash}
                        onChange={() => setSkinConditions(prev => ({ ...prev, rash: !prev.rash }))}
                    />
                    <CheckItem
                        label="부종"
                        checked={skinConditions.swelling}
                        onChange={() => setSkinConditions(prev => ({ ...prev, swelling: !prev.swelling }))}
                    />
                    <CheckItem
                        label="욕창 발생"
                        checked={skinConditions.bedsore}
                        onChange={() => setSkinConditions(prev => ({ ...prev, bedsore: !prev.bedsore }))}
                    />
                </div>

                {/* 통증 여부 섹션 */}
                <div className="mb-8">
                    <h3 className="text-gray-600 text-sm mb-3">통증 여부</h3>
                    <CheckItem
                        label="없음"
                        checked={painStatus.none}
                        onChange={() => setPainStatus(prev => ({ ...prev, none: !prev.none }))}
                    />
                    <CheckItem
                        label="경미한 통증"
                        checked={painStatus.mild}
                        onChange={() => setPainStatus(prev => ({ ...prev, mild: !prev.mild }))}
                    />
                    <CheckItem
                        label="중증"
                        checked={painStatus.moderate}
                        onChange={() => setPainStatus(prev => ({ ...prev, moderate: !prev.moderate }))}
                    />
                    <CheckItem
                        label="심각한 통증"
                        checked={painStatus.severe}
                        onChange={() => setPainStatus(prev => ({ ...prev, severe: !prev.severe }))}
                    />
                </div>

                {/* 운동 및 자세 변화 섹션 */}
                <div>
                    <h3 className="text-gray-600 text-sm mb-3">운동임 및 자세 변화 여부</h3>
                    <CheckItem
                        label="정상"
                        checked={movementStatus.normal}
                        onChange={() => setMovementStatus(prev => ({ ...prev, normal: !prev.normal }))}
                    />
                    <CheckItem
                        label="제한적인 움직임"
                        checked={movementStatus.limited}
                        onChange={() => setMovementStatus(prev => ({ ...prev, limited: !prev.limited }))}
                    />
                    <CheckItem
                        label="부축 및 추가 대응 필요"
                        checked={movementStatus.needHelp}
                        onChange={() => setMovementStatus(prev => ({ ...prev, needHelp: !prev.needHelp }))}
                    />
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
                        onClick={() => navigate('/diagnosis/final')}
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

export default PhysicalChecklist;