import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "../../../common/component/Loading";
import { useDiagnosis } from '../../../context/DiagnosisContext';

const DiagnosisDetail = () => {
    const navigate = useNavigate();
    const [checklistData, setChecklistData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 상태 레이블 매핑
    const statusLabels = {
        skin: {
            NORMAL: "정상",
            REDNESS: "발적",
            EDEMA: "부종",
            BEDSORE: "욕창 발생"
        },
        pain: {
            NONE: "없음",
            MIGHT: "경미한 통증",
            MEDIUM: "중증",
            SEVERE: "심각한 통증"
        },
        mobility: {
            NORMAL: "정상",
            LIMITED: "제한적인 움직임",
            NEED_TO_HELP: "부축 및 추가 대응 필요"
        },
        consciousness: {
            CLEAR: "명료해요",
            SLEEPY: "기면",
            CHAOS: "혼미",
            NO_RESPONSE: "반혼수 / 혼수"
        },
        behavior: {
            SAME_AS_USUAL: "평소와 동일함",
            ANXIETY: "불안",
            DEPRESSION: "우울",
            EXCITEMENT_OVERCROWD: "흥분 / 과민"
        }
    };

    useEffect(() => {
        const fetchChecklistData = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/patient/daily-check/get/checklist?date=${today}&code=964F19`,
                    {
                        headers: {
                            'accept': '*/*'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch checklist data');
                }

                const result = await response.json();
                if (result.success) {
                    setChecklistData(result.data);
                } else {
                    throw new Error(result.message || 'Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching checklist:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChecklistData();
    }, []);

    if (isLoading) {
        return <Loading spinnerSize="w-32 h-32" message="데이터를 불러오고 있어요" />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#E9EEEA] flex flex-col items-center justify-center">
                <p className="text-red-500">데이터를 불러오는데 실패했습니다.</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    const getDiagnosisData = () => {
        if (!checklistData) return [];

        const { vitalSigns, consciousness, physicalStatus, medications, specialNotes } = checklistData;

        return [
            {
                label: '혈압',
                value: `${vitalSigns.bloodPressureSys}/${vitalSigns.bloodPressureDia} mmHg`
            },
            {
                label: '맥박',
                value: `${vitalSigns.pulse}회/분`
            },
            {
                label: '산소포화도',
                value: `${vitalSigns.oxygen}%`
            },
            {
                label: '체온',
                value: `${vitalSigns.temperature}°C`
            },
            {
                label: '호흡수',
                value: `${vitalSigns.respirationRate}회/분`
            },
            {
                label: '의식 수준',
                value: statusLabels.consciousness[consciousness.consciousnessLevel] || '-'
            },
            {
                label: '기분 및 행동 변화',
                value: statusLabels.behavior[consciousness.moodBehaviour] || '-'
            },
            {
                label: '피부 상태',
                value: statusLabels.skin[physicalStatus.skinCondition] || '-'
            },
            {
                label: '통증 여부',
                value: statusLabels.pain[physicalStatus.painLevel] || '-'
            },
            {
                label: '움직임 및 자세 변화 여부',
                value: statusLabels.mobility[physicalStatus.mobility] || '-'
            },
            {
                label: '아침 약 복용 여부',
                value: medications.medicationTaken ? '완료' : '미완료'
            },
            {
                label: '복용하는 약의 부작용 여부',
                value: medications.sideEffects
            }
        ];
    };


    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            <div className="fixed top-0 left-0 right-0 bg-[#E9EEEA] z-50">
                <div className="h-14 flex items-center justify-between px-4 border-b">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2">
                        ←
                    </button>
                    <span className="absolute left-1/2 -translate-x-1/2 font-medium">
                        전체 답변 확인하기
                    </span>
                </div>
            </div>

            <main className="flex-1 px-4 pt-20 pb-24">
                <div className="text-gray-500 mb-4">
                    {checklistData && formatDate(checklistData.dailyCheckList.createdAt)}
                </div>

                <div className="bg-[#F6FFF3] rounded-2xl p-4 mb-6">
                    {getDiagnosisData().map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between py-2.5 border-b last:border-b-0 border-gray-200"
                        >
                            <span className="text-gray-600">{item.label}</span>
                            <span>{item.value}</span>
                        </div>
                    ))}

                    {checklistData?.specialNotes?.specialNotes && (
                        <div className="mt-4">
                            <div className="font-medium mb-2">특이사항 및 간호기록</div>
                            <p className="text-sm text-gray-600">
                                {checklistData.specialNotes.specialNotes}
                            </p>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="w-full py-4 bg-[#496E1B] rounded-xl text-white font-medium"
                >
                    확인
                </button>
            </main>
        </div>
    );
};

export default DiagnosisDetail;