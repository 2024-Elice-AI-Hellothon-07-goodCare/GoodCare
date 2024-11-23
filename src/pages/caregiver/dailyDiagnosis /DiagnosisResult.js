import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiagnosisHeader from "./DiagnosisHeader";
import Loading from "../../../common/component/Loading";

const DiagnosisResult = () => {
    const navigate = useNavigate();
    const [vitalSigns, setVitalSigns] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVitalSigns = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/patient/daily-check/get/vital-signs?code=964F19`, {
                    method: 'GET',
                    headers: {
                        'accept': '*/*'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch vital signs');
                }

                const result = await response.json();
                if (result.success) {
                    setVitalSigns(result.data);
                } else {
                    throw new Error(result.message || 'Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching vital signs:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVitalSigns();
    }, []);

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

    if (error) {
        return (
            <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
                <DiagnosisHeader />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-red-500">데이터를 불러오는데 실패했습니다.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            <DiagnosisHeader />

            <main className="flex-1 px-4 pt-20 pb-24">
                <div className="flex justify-center mb-6">
                    <img
                        src="/img/marimo/Poor-yellow.png"
                        alt="Character"
                        className="w-32 h-32"
                    />
                </div>

                <div className="bg-white rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span>{new Date().toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            weekday: 'short'
                        })}</span>
                        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">AI</span>
                    </div>
                    <p className="text-base">
                        전성원님의 상태는 보통이에요<br />
                        {vitalSigns && `현재 혈압은 ${vitalSigns.bloodPressureSys}/${vitalSigns.bloodPressureDia}mmHg, 
                        체온은 ${vitalSigns.temperature}°C입니다.`}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-[#F6FFF3] p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                            <span>혈압</span>
                            <span className="text-red-500">↑ 1.2%</span>
                        </div>
                        <div className="text-2xl font-bold">
                            {vitalSigns?.bloodPressureSys}<span className="text-base font-normal text-gray-500">/{vitalSigns?.bloodPressureDia} mmHg</span>
                        </div>
                    </div>

                    <div className="bg-[#F6FFF3] p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                            <span>맥박</span>
                            <span className="text-blue-500">↓ 0.8%</span>
                        </div>
                        <div className="text-2xl font-bold">
                            {vitalSigns?.pulse}<span className="text-base font-normal text-gray-500"> 회</span>
                        </div>
                    </div>

                    <div className="bg-[#F6FFF3] p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                            <span>산소포화도</span>
                            <span className="text-gray-500">0.0%</span>
                        </div>
                        <div className="text-2xl font-bold">
                            {vitalSigns?.oxygen}<span className="text-base font-normal text-gray-500"> %</span>
                        </div>
                    </div>

                    <div className="bg-[#F6FFF3] p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                            <span>체온</span>
                            <span className="text-blue-500">↓ 0.1%</span>
                        </div>
                        <div className="text-2xl font-bold">
                            {vitalSigns?.temperature}<span className="text-base font-normal text-gray-500"> °C</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F6FFF3] p-4 rounded-2xl mb-6">
                    <h3 className="font-medium mb-3">환자 분석</h3>
                    <ul className="text-sm space-y-2 text-gray-600">
                        <li>• 이 환자는 정체성 고혈압과 낮은 산소포화도로 상황관계 위험 이 우려되며, 수분 섭취 부족과 빈맥 가능성이 관찰됩니다.</li>
                        <li>• 무릎 통증과 비골관절 수가적인 산재 기능 저하를 시사하므로 활동량 조정과 관리가 필요합니다.</li>
                        <li>• 전반적으로 안정적이지만, 만성질환 관리를 위해 지속적인 결과 설명 솔루제션이 중요합니다.</li>
                    </ul>
                </div>

                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => navigate('/diagnosis/detail')}
                        className="flex-1 py-2.5 px-4 bg-[#F6FFF3] rounded-xl text-[#496E1B] text-sm"
                    >
                        전체 답변 확인하기
                    </button>
                    <button
                        onClick={() => navigate('/diagnosis/share')}
                        className="flex-1 py-2.5 px-4 bg-[#F6FFF3] rounded-xl text-[#496E1B] text-sm"
                    >
                        병원에 보내기
                    </button>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex-1 py-4 bg-[#F6FFF3] rounded-xl text-[#496E1B] font-medium"
                    >
                        대시보드
                    </button>
                    <button
                        onClick={() => navigate('/home')}
                        className="flex-1 py-4 bg-[#496E1B] rounded-xl text-white font-medium"
                    >
                        홈
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DiagnosisResult;