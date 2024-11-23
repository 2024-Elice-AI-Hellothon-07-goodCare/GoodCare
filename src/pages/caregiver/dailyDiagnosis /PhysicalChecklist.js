import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DiagnosisHeader from "./DiagnosisHeader";
import { useDiagnosis } from "../../../context/DiagnosisContext";

const PhysicalChecklist = () => {
    const navigate = useNavigate();
    const { updateDiagnosisData } = useDiagnosis();
    const [isValid, setIsValid] = useState(false);

    const [skinConditions, setSkinConditions] = useState({
        normal: false,
        redness: false,
        bedsore: false,
        edema: false
    });

    const [painStatus, setPainStatus] = useState({
        none: false,
        mild: false,
        moderate: false,
        severe: false
    });

    const [movementStatus, setMovementStatus] = useState({
        normal: false,
        limited: false,
        needHelp: false
    });

    const statusMappings = {
        skin: {
            normal: 'NORMAL',
            redness: 'REDNESS',
            edema: 'EDEMA',
            bedsore: 'BEDSORE'
        },
        pain: {
            none: 'NONE',
            mild: 'MIGHT',
            moderate: 'MEDIUM',
            severe: 'SEVERE'
        },
        mobility: {
            normal: 'NORMAL',
            limited: 'LIMITED',
            needHelp: 'NEED_TO_HELP'
        }
    };

    const handleStatusChange = useCallback((type, key) => {
        const setterFunctions = {
            skin: setSkinConditions,
            pain: setPainStatus,
            mobility: setMovementStatus
        };

        setterFunctions[type](prev => {
            const newState = Object.keys(prev).reduce((acc, k) => ({
                ...acc,
                [k]: k === key ? !prev[k] : false
            }), {});

            let selectedSkin = Object.entries(skinConditions)
                .find(([k, v]) => type === 'skin' ? k === key && !prev[k] : v)?.[0] || '';
            let selectedPain = Object.entries(painStatus)
                .find(([k, v]) => type === 'pain' ? k === key && !prev[k] : v)?.[0] || '';
            let selectedMobility = Object.entries(movementStatus)
                .find(([k, v]) => type === 'mobility' ? k === key && !prev[k] : v)?.[0] || '';

            if (type === 'skin') selectedSkin = key;
            if (type === 'pain') selectedPain = key;
            if (type === 'mobility') selectedMobility = key;

            const hasAllSelections = (selectedSkin && selectedPain && selectedMobility);
            setIsValid(hasAllSelections);

            if (hasAllSelections) {
                updateDiagnosisData('physicalStatusDTO', {
                    skinCondition: statusMappings.skin[selectedSkin],
                    painLevel: statusMappings.pain[selectedPain],
                    mobility: statusMappings.mobility[selectedMobility]
                });
            }

            return newState;
        });
    }, [skinConditions, painStatus, movementStatus, updateDiagnosisData]);

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

    const StatusSection = React.memo(({ title, items, type, status, onStatusChange }) => (
        <div className="mb-8">
            <h3 className="text-gray-600 mb-3">{title}</h3>
            {Object.entries(items).map(([key, label]) => (
                <CheckItem
                    key={key}
                    label={label}
                    checked={status[key]}
                    onChange={() => onStatusChange(type, key)}
                />
            ))}
        </div>
    ));

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            <DiagnosisHeader />

            <main className="flex-1 px-4 pt-20 pb-24">
                <h2 className="text-xl font-bold mb-8">
                    성원님의 신체 상태를 체크해주세요.
                </h2>

                <StatusSection
                    title="피부 상태"
                    items={{
                        normal: "정상",
                        redness: "발적",
                        edema: "부종",
                        bedsore: "욕창 발생"
                    }}
                    type="skin"
                    status={skinConditions}
                    onStatusChange={handleStatusChange}
                />

                <StatusSection
                    title="통증 여부"
                    items={{
                        none: "없음",
                        mild: "경미한 통증",
                        moderate: "중증",
                        severe: "심각한 통증"
                    }}
                    type="pain"
                    status={painStatus}
                    onStatusChange={handleStatusChange}
                />

                <StatusSection
                    title="운동 및 자세 변화 여부"
                    items={{
                        normal: "정상",
                        limited: "제한적인 움직임",
                        needHelp: "부축 및 추가 대응 필요"
                    }}
                    type="mobility"
                    status={movementStatus}
                    onStatusChange={handleStatusChange}
                />
            </main>

            <div className="left-0 right-0 pb-20 bg-[#E9EEEA]">
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 py-4 rounded-xl text-[#496E1B] font-medium bg-[#E4EFE0]"
                    >
                        이전
                    </button>
                    <button
                        onClick={() => isValid && navigate('/diagnosis/final')}
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

export default PhysicalChecklist;