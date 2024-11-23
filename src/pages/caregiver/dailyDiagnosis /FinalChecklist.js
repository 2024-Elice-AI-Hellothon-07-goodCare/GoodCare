import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "../../../common/component/Loading";
import DiagnosisHeader from "./DiagnosisHeader";
import { useDiagnosis } from "../../../context/DiagnosisContext";

const FinalChecklist = () => {
    const navigate = useNavigate();
    const { updateDiagnosisData, submitDiagnosisData } = useDiagnosis();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        medication: null,
        sideEffects: null,
        note: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 한국 시간으로 오늘 날짜 가져오기
    const today = new Date().toLocaleDateString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\. /g, '-').replace('.', '');


    // 약물 복용 상태 변경
    const handleMedicationChange = useCallback((value) => {
        setFormData(prev => ({
            ...prev,
            medication: value
        }));
    }, []);

    // 부작용 상태 변경
    const handleSideEffectsChange = useCallback((value) => {
        setFormData(prev => ({
            ...prev,
            sideEffects: value
        }));
    }, []);

    // 노트 상태 변경
    const handleNoteChange = useCallback((value) => {
        setFormData(prev => ({
            ...prev,
            note: value
        }));
    }, []);

    // formData가 변경될 때마다 Context 업데이트
    useEffect(() => {
        const updateContext = async () => {
            await updateDiagnosisData('dailyCheckListDTO', {
                createdAt: today  // 오늘 날짜로 업데이트
            });

            if (formData.medication !== null) {
                await updateDiagnosisData('medicationsDTO', {
                    medicationTaken: formData.medication === 'complete',
                    sideEffects: formData.sideEffects === 'yes' ? '있음' :
                        formData.sideEffects === 'no' ? '없음' : '없음'
                });
            }

            await updateDiagnosisData('specialNotesDTO', {
                specialNotes: formData.note || '-',
                caregiverNotes: formData.note || '-'
            });
        };

        updateContext();
    }, [formData, updateDiagnosisData, today]);

    const handleSubmit = useCallback(async () => {
        if (!formData.medication || !formData.sideEffects) {
            setError('모든 항목을 선택해주세요.');
            return;
        }

        try {
            setIsLoading(true);
            setError('');
            setIsSubmitting(true);

            // 최종 데이터 업데이트에 날짜 포함
            await updateDiagnosisData('dailyCheckListDTO', {
                createdAt: today
            });

            await updateDiagnosisData('medicationsDTO', {
                medicationTaken: formData.medication === 'complete',
                sideEffects: formData.sideEffects === 'yes' ? '있음' : '없음'
            });

            await updateDiagnosisData('specialNotesDTO', {
                specialNotes: formData.note || '-',
                caregiverNotes: formData.note || '-'
            });

            console.log('Submitting data...');
            const result = await submitDiagnosisData();
            console.log('Submit success:', result);

            if (result) {
                // 날짜 정보도 함께 전달
                navigate('/diagnosis/loading', {
                    state: { date: today }
                });
            }
        } catch (error) {
            console.error('Submit failed:', error);
            setError('제출에 실패했습니다. 다시 시도해주세요.');
            setIsSubmitting(false);
        } finally {
            setIsLoading(false);
        }
    }, [formData, updateDiagnosisData, submitDiagnosisData, navigate, today]);

    if (isLoading) {
        return (
            <Loading
                spinnerSize="w-32 h-32"
                message={
                    <>
                        진단 결과를<br />
                        분석하고 있어요
                    </>
                }
                showHeader={true}
                headerTitle="일일 진단하기"
            />
        );
    }

    const HorizontalRadioGroup = React.memo(({ options, value, onChange }) => (
        <div className="flex gap-3">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`
                        flex-1 p-4 rounded-lg flex justify-center items-center
                        bg-[#F6FFF3] transition-colors duration-200
                        ${value === option.value ? 'text-[#496E1B]' : 'text-gray-500'}
                    `}
                >
                    <span>{option.label}</span>
                    {value === option.value && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center ml-2">
                            <span className="text-[#496E1B]">✓</span>
                        </div>
                    )}
                </button>
            ))}
        </div>
    ));

    console.log("data", formData)

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            <DiagnosisHeader />

            <main className="flex-1 px-4 pt-20 pb-24">
                <h2 className="text-xl font-bold mb-8">
                  기타 확인 사항을 체크해주세요.
                </h2>

                <div className="mb-8">
                    <h3 className="text-gray-600 mb-3">아침 약 복용 여부</h3>
                    <HorizontalRadioGroup
                        options={[
                            {label: '미완료', value: 'incomplete'},
                            {label: '완료', value: 'complete'}
                        ]}
                        value={formData.medication}
                        onChange={handleMedicationChange}
                    />
                </div>

                <div className="mb-8">
                    <h3 className="text-gray-600 mb-3">복용하는 약 부작용 여부</h3>
                    <HorizontalRadioGroup
                        options={[
                            {label: '있음', value: 'yes'},
                            {label: '없음', value: 'no'}
                        ]}
                        value={formData.sideEffects}
                        onChange={handleSideEffectsChange}
                    />
                </div>

                <div>
                    <h3 className="text-gray-600 mb-3">특이사항 및 간호기록</h3>
                    <textarea
                        value={formData.note}
                        onChange={(e) => handleNoteChange(e.target.value)}
                        placeholder="추가로 기록할 사항을 적어주세요."
                        className="w-full h-32 p-4 rounded-lg bg-[#F6FFF3] resize-none
                        focus:outline-none placeholder-gray-500"
                    />
                </div>

                {error && (
                    <p className="text-red-500 mt-4 text-center">{error}</p>
                )}
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
                        onClick={handleSubmit}
                        className="flex-1 py-4 rounded-xl font-medium bg-[#496E1B] text-white cursor-pointer"
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );

};

export default FinalChecklist;