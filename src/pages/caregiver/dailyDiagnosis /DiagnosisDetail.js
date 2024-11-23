import React from 'react';
import { useNavigate } from 'react-router-dom';

const DiagnosisDetail = () => {
    const navigate = useNavigate();

    const diagnosisData = [
        { label: '혈압', value: '110/70mmHg' },
        { label: '맥박', value: '80회/분' },
        { label: '산소포화도', value: '80%' },
        { label: '체온', value: '37.5°C' },
        { label: '호흡수', value: '16회/분' },
        { label: '의식 수준', value: '기면' },
        { label: '기분 및 행동 변화', value: '평소와 동일' },
        { label: '피부 상태', value: '발적' },
        { label: '통증 여부', value: '경미한 통증' },
        { label: '움직임 및 자세 변화 여부', value: '제한적인 움직임' },
        { label: '아침 약 복용 여부', value: '완료' },
        { label: '복용하는 약의 부작용 여부', value: '없음' },
    ];

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            {/* Header */}
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
                {/* Date */}
                <div className="text-gray-500 mb-4">2024년 11월 18일</div>

                {/* Diagnosis Results Card */}
                <div className="bg-[#F6FFF3] rounded-2xl p-4 mb-6">
                    {diagnosisData.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between py-2.5 border-b last:border-b-0 border-gray-200"
                        >
                            <span className="text-gray-600">{item.label}</span>
                            <span>{item.value}</span>
                        </div>
                    ))}

                    {/* Special Notes */}
                    <div className="mt-4">
                        <div className="font-medium mb-2">특이사항 및 간호기록 (사진)</div>
                        <p className="text-sm text-gray-600">
                            환자는 평소 몸 상태양이 직고 식사량이 70% 수준으로 부족하며,
                            활동 시 무릎 통증으로 움직임이 제한적임. 최근 피로감을 자주 호소
                            하며, 장시간 앉아 있는 듯으로 이번 증상이 관찰됨.
                        </p>
                    </div>
                </div>

                {/* Confirm Button */}
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