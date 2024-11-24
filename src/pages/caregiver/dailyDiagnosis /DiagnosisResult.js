import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DiagnosisHeader from "./DiagnosisHeader";
import Loading from "../../../common/component/Loading";
import { getUserSession } from "../../../utils/auth";

const DiagnosisResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [checklistData, setChecklistData] = useState(null);
    const [aiAnalysis, setAiAnalysis] = useState(location.state?.analysisData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(location.state?.error);

    const getCharacterImage = (status) => {
        const imageTypes = {
            '좋음': [
                'Excellent-green',
                'Good-green',
                'Neutral-green',
                'Poor-green',
                'Terrible-green'
            ],
            '보통': [
                'Excellent-yellow',
                'Good-yellow',
                'Neutral-yellow',
                'Poor-yellow',
                'Terrible-yellow'
            ],
            '나쁨': [
                'Excellent-red',
                'Good-red',
                'Neutral-red',
                'Poor-red',
                'Terrible-red'
            ]
        };

        const statusImages = imageTypes[status] || imageTypes['보통'];
        const randomImage = statusImages[Math.floor(Math.random() * statusImages.length)];
        return `/img/marimo/${randomImage}.png`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 한국 시간으로 오늘 날짜 가져오기
                const date = new Date().toLocaleDateString('ko-KR', {
                    timeZone: 'Asia/Seoul',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).replace(/\. /g, '-').replace('.', '');
                const userInfo = getUserSession();
                const patientCode = userInfo?.patientInfo?.code || userInfo?.code;

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/patient/daily-check/get/checklist?date=${date}&code=${patientCode}`,
                    { headers: { 'accept': '*/*' } }
                );

                const result = await response.json();

                if (result.success || result.message === "이미 생성되었습니다.") {
                    setChecklistData(result.data);
                } else {
                    setError(result.message || '데이터를 불러오는데 실패했습니다.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('서버 연결에 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <Loading
                spinnerSize="w-32 h-32"
                message={<>진단 결과를<br />분석하고 있어요</>}
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
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    // formatDate 함수도 수정
    const formatDate = () => {
        const date = location.state?.date
            ? new Date(location.state.date)
            : new Date();

        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short'
        });
    };

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            <DiagnosisHeader />

            <main className="flex-1 px-4 pt-20 pb-24">
                <div className="flex justify-center mb-6">
                    <img
                        src={getCharacterImage(aiAnalysis?.[1] || checklistData?.dailyCheckList?.analysisWord)}
                        alt="Character"
                        className="w-32 h-32"
                    />
                </div>

                <div className="bg-white rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span>{formatDate()}</span>
                        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">AI</span>
                    </div>
                    <p className="text-base">
                        {aiAnalysis?.[0] || checklistData?.dailyCheckList?.analysisData}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-[#F6FFF3] p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                            <span>혈압</span>
                            <span className="text-red-500">↑ 1.2%</span>
                        </div>
                        <div className="text-2xl font-bold">
                            {checklistData?.vitalSigns?.bloodPressureSys}
                            <span className="text-base font-normal text-gray-500">
                                /{checklistData?.vitalSigns?.bloodPressureDia} mmHg
                            </span>
                        </div>
                    </div>

                    <div className="bg-[#F6FFF3] p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                            <span>맥박</span>
                            <span className="text-blue-500">↓ 0.8%</span>
                        </div>
                        <div className="text-2xl font-bold">
                            {checklistData?.vitalSigns?.pulse}
                            <span className="text-base font-normal text-gray-500"> 회</span>
                        </div>
                    </div>

                    <div className="bg-[#F6FFF3] p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                            <span>산소포화도</span>
                            <span className="text-gray-500">0.0%</span>
                        </div>
                        <div className="text-2xl font-bold">
                            {checklistData?.vitalSigns?.oxygen}
                            <span className="text-base font-normal text-gray-500"> %</span>
                        </div>
                    </div>

                    <div className="bg-[#F6FFF3] p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                            <span>체온</span>
                            <span className="text-blue-500">↓ 0.1%</span>
                        </div>
                        <div className="text-2xl font-bold">
                            {checklistData?.vitalSigns?.temperature}
                            <span className="text-base font-normal text-gray-500"> °C</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F6FFF3] p-4 rounded-2xl mb-6">
                    <h3 className="font-medium mb-3">환자 분석</h3>
                    <ul className="text-sm space-y-2 text-gray-600">
                        {(aiAnalysis?.[2] || checklistData?.dailyCheckList?.analysisFullData)?.split('\n').map((line, index) => (
                            <li key={index}>• {line}</li>
                        ))}
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
                        onClick={() => {
                            window.location.href = "tel:+821027475990";
                        }}                        className="flex-1 py-2.5 px-4 bg-[#F6FFF3] rounded-xl text-[#496E1B] text-sm"
                    >
                        병원에 전화하기
                    </button>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/dashboard/health')}
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