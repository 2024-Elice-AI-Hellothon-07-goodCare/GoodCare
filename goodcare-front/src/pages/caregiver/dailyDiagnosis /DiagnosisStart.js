import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiagnosisHeader from "./DiagnosisHeader";
import { getUserSession } from '../../../utils/auth';

const DiagnosisStart = () => {
    const navigate = useNavigate();
    const [showWelcome, setShowWelcome] = useState(true);
    const [patientName, setPatientName] = useState('');
    const userInfo = getUserSession();

    useEffect(() => {
        // 사용자 정보 확인
        if (!userInfo || userInfo.userType !== '간병인') {
            navigate('/login');
            return;
        }

        // 환자 이름 가져오기
        const fetchPatientName = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/caregiver/info/get/patient-name?code=${userInfo.code}`,
                    {
                        headers: {
                            'accept': '*/*'
                        }
                    }
                );

                if (!response.ok) {

                    throw new Error('Failed to fetch patient name');
                }

                const data = await response.json();

                if (data.success) {
                    setPatientName(data.data);
                }
            } catch (error) {
                console.error('Error fetching patient name:', error);
            }
        };

        fetchPatientName();

        // 타이머 설정
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [navigate, userInfo]);

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col">
            <DiagnosisHeader />

            {showWelcome ? (
                <main className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src="/img/disoStart.png"
                            alt="Green character"
                            className="w-62 h-72 mb-4"
                        />
                        <p className="text-xl">{patientName}님, 좋은 아침이에요!</p>
                    </div>
                </main>
            ) : (
                <main className="flex-1 flex flex-col items-center justify-between px-4">
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src="/img/disoStart2.png"
                                alt="Green character"
                                className="w-62 h-72 mb-4"
                            />
                            <div className="text-center space-y-2">
                                <h2 className="text-lg font-medium">{patientName}님의</h2>
                                <p className="text-lg">일일 건강 진단을 시작해볼까요?</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full pb-20">
                        <button
                            onClick={() => navigate('/diagnosis/input')}
                            className="w-full py-4 bg-[#496E1B] rounded-xl text-white font-medium
                            transition-colors duration-200"
                        >
                            시작하기
                        </button>
                    </div>
                </main>
            )}
        </div>
    );
};

export default DiagnosisStart;