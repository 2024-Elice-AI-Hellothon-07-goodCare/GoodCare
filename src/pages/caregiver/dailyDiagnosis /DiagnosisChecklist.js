import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Header from '../../../common/component/Header';

const DiagnosisChecklist = () => {
    const navigate = useNavigate();

    const [mealSymptoms, setMealSymptoms] = useState({
        appetite: false,
        nausea: false,
        digestion: false,
        swallowing: false
    });

    const [physicalSymptoms, setPhysicalSymptoms] = useState({
        painDiscomfort: false,
        sleepiness: false,
        fatigue: false,
        constipation: false
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
                    성원님의 의식과 정신 상태를 체크해주세요.
                </h2>

                {/* 의식 수준 섹션 */}
                <div className="mb-8">
                    <h3 className="text-gray-600 text-sm mb-3">의식 수준</h3>
                    <CheckItem
                        label="명료해요"
                        checked={mealSymptoms.appetite}
                        onChange={() => setMealSymptoms(prev => ({ ...prev, appetite: !prev.appetite }))}
                    />
                    <CheckItem
                        label="기면"
                        checked={mealSymptoms.nausea}
                        onChange={() => setMealSymptoms(prev => ({ ...prev, nausea: !prev.nausea }))}
                    />
                    <CheckItem
                        label="혼미"
                        checked={mealSymptoms.digestion}
                        onChange={() => setMealSymptoms(prev => ({ ...prev, digestion: !prev.digestion }))}
                    />
                    <CheckItem
                        label="반혼수 / 혼수"
                        checked={mealSymptoms.swallowing}
                        onChange={() => setMealSymptoms(prev => ({ ...prev, swallowing: !prev.swallowing }))}
                    />
                </div>

                {/* 기타 및 행동 변화 섹션 */}
                <div>
                    <h3 className="text-gray-600 text-sm mb-3">기타 및 행동 변화</h3>
                    <CheckItem
                        label="평소와 동일함"
                        checked={physicalSymptoms.painDiscomfort}
                        onChange={() => setPhysicalSymptoms(prev => ({ ...prev, painDiscomfort: !prev.painDiscomfort }))}
                    />
                    <CheckItem
                        label="불안"
                        checked={physicalSymptoms.sleepiness}
                        onChange={() => setPhysicalSymptoms(prev => ({ ...prev, sleepiness: !prev.sleepiness }))}
                    />
                    <CheckItem
                        label="우울"
                        checked={physicalSymptoms.fatigue}
                        onChange={() => setPhysicalSymptoms(prev => ({ ...prev, fatigue: !prev.fatigue }))}
                    />
                    <CheckItem
                        label="흥분 / 과민"
                        checked={physicalSymptoms.constipation}
                        onChange={() => setPhysicalSymptoms(prev => ({ ...prev, constipation: !prev.constipation }))}
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
                        onClick={() => navigate('/diagnosis/physical')}
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

export default DiagnosisChecklist;