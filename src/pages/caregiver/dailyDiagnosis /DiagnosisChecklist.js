import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DiagnosisHeader from "./DiagnosisHeader";
import { useDiagnosis } from '../../../context/DiagnosisContext';

const DiagnosisChecklist = () => {
    const { updateDiagnosisData } = useDiagnosis();
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);



    const [selectedValues, setSelectedValues] = useState({
        consciousness: '',
        behavior: ''
    });

    const [consciousnessLevel, setConsciousnessLevel] = useState({
        clear: false,
        drowsy: false,
        confused: false,
        semicoma: false
    });

    const [behaviorChanges, setBehaviorChanges] = useState({
        normal: false,
        anxiety: false,
        depression: false,
        excited: false
    });

    const consciousnessMapping = {
        clear: 'CLEAR',
        drowsy: 'SLEEPY',
        confused: 'CHAOS',
        semicoma: 'NO_RESPONSE'
    };

    const behaviorMapping = {
        normal: 'SAME_AS_USUAL',
        anxiety: 'ANXIETY',
        depression: 'DEPRESSION',
        excited: 'EXCITEMENT_OVERCROWD'
    };

    const updateContext = useCallback((consciousness, behavior) => {
        if (consciousness && behavior) {
            setIsValid(true);
            updateDiagnosisData('consciousnessDTO', {
                consciousnessLevel: consciousness,
                moodBehaviour: behavior
            });
        } else {
            setIsValid(false);
        }
    }, [updateDiagnosisData]);

    const handleConsciousnessChange = useCallback((key) => {
        setConsciousnessLevel(prev => {
            const newState = Object.keys(prev).reduce((acc, k) => ({
                ...acc,
                [k]: k === key ? !prev[k] : false
            }), {});
            return newState;
        });

        setSelectedValues(prev => {
            const newValues = {
                ...prev,
                consciousness: consciousnessMapping[key]
            };
            updateContext(newValues.consciousness, prev.behavior);
            return newValues;
        });
    }, [updateContext, consciousnessMapping]);

    const handleBehaviorChange = useCallback((key) => {
        setBehaviorChanges(prev => {
            const newState = Object.keys(prev).reduce((acc, k) => ({
                ...acc,
                [k]: k === key ? !prev[k] : false
            }), {});
            return newState;
        });

        setSelectedValues(prev => {
            const newValues = {
                ...prev,
                behavior: behaviorMapping[key]
            };
            updateContext(prev.consciousness, newValues.behavior);
            return newValues;
        });
    }, [updateContext, behaviorMapping]);

    const CheckItem = React.memo(({ label, checked, onChange }) => (
        <button
            onClick={onChange}
            className={`
                w-full p-4 rounded-lg flex justify-between items-center mb-3
                ${checked ? 'bg-[#CDE5C5]' : 'bg-[#F6FFF3]'}
            `}
        >
            <span>{label}</span>
            {checked && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center">
                    <span className="text-[#496E1B]">✓</span>
                </div>
            )}
        </button>
    ));

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            <DiagnosisHeader />

            <main className="flex-1 px-4 pt-20 pb-24">
                <h2 className="text-xl font-bold mb-8">
                   의식과 정신 상태를 체크해주세요.
                </h2>

                {/* 의식 수준 섹션 */}
                <div className="mb-8 pt-20">
                    <h3 className="text-gray-600 mb-3">의식 수준</h3>
                    {Object.entries({
                        clear: "명료해요",
                        drowsy: "기면",
                        confused: "혼미",
                        semicoma: "반혼수 / 혼수"
                    }).map(([key, label]) => (
                        <CheckItem
                            key={key}
                            label={label}
                            checked={consciousnessLevel[key]}
                            onChange={() => handleConsciousnessChange(key)}
                        />
                    ))}
                </div>

                {/* 기타 및 행동 변화 섹션 */}
                <div>
                    <h3 className="text-gray-600 mb-3">기타 및 행동 변화</h3>
                    {Object.entries({
                        normal: "평소와 동일함",
                        anxiety: "불안",
                        depression: "우울",
                        excited: "흥분 / 과민"
                    }).map(([key, label]) => (
                        <CheckItem
                            key={key}
                            label={label}
                            checked={behaviorChanges[key]}
                            onChange={() => handleBehaviorChange(key)}
                        />
                    ))}
                </div>
            </main>

            {/* 하단 버튼 */}
            <div className="left-0 right-0 pb-20 bg-[#E9EEEA]">
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 py-4 rounded-xl text-[#496E1B] font-medium bg-[#E4EFE0]"
                    >
                        이전
                    </button>
                    <button
                        onClick={() => isValid && navigate('/diagnosis/physical')}
                        className={`flex-1 py-4 rounded-xl font-medium 
                            ${isValid
                            ? 'bg-[#496E1B] text-white cursor-pointer'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisChecklist;