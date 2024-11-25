import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserSession } from "../../utils/auth";

const StatusCheck = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userInfo = getUserSession();
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null); // 현재 재생 중인 오디오 추적
    const [patientName, setPatientName] = useState('');

    const fetchAISpeechData = async () => {
        try {
            const patientCode = userInfo?.patientInfo?.code || userInfo?.code;
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/patient/ai/get/intra-speech?code=${patientCode}`,
                { headers: { 'accept': '*/*' } }
            );

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.data.length > 0) {
                    const aiMessages = result.data.map(item => ({
                        time: new Date().toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                            timeZone: 'Asia/Seoul'
                        }),
                        text: item.inputText,
                        hasAudio: true,
                        audioFileName: item.interSpeechFileName
                    }));

                    setMessages(aiMessages);
                }
            }
        } catch (error) {
            console.error('Error fetching AI speech data:', error);
        } finally {
            setIsLoading(false);
        }
    };
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


    useEffect(() => {
        fetchAISpeechData();

        // 컴포넌트 언마운트 시 오디오 정리
        return () => {
            if (currentlyPlaying) {
                currentlyPlaying.pause();
                currentlyPlaying.src = '';
            }
        };
    }, []);




    const handleAudioPlay = async (fileName) => {
        try {
            // 이전 재생 중인 오디오가 있다면 중지
            if (currentlyPlaying) {
                currentlyPlaying.pause();
                currentlyPlaying.src = '';
            }

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/patient/file/inter-speech/download?filename=${fileName}`,
                { headers: { 'accept': '*/*' } }
            );

            if (response.ok) {
                // Blob으로 변환
                const blob = await response.blob();
                const audioUrl = URL.createObjectURL(blob);
                const audio = new Audio(audioUrl);

                setCurrentlyPlaying(audio);

                // 재생 완료 시 정리
                audio.onended = () => {
                    URL.revokeObjectURL(audioUrl);
                    setCurrentlyPlaying(null);
                };

                // 에러 발생 시 정리
                audio.onerror = () => {
                    URL.revokeObjectURL(audioUrl);
                    setCurrentlyPlaying(null);
                    console.error('Error playing audio');
                };

                await audio.play();
            }
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    fetchPatientName();


    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* 헤더 */}
            <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b border-gray-100">
                <div className="relative h-14 flex items-center justify-center px-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-4 p-2"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <h1 className="text-lg font-medium">상황 확인하기</h1>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 pt-14 pb-24">
                {/* 상황 설명 */}
                <div className="px-4 py-6 text-center text-base">
                    <p className="text-gray-800">{patientName}님, 방금 지속적인 환부 통증으로</p>
                    <p className="text-gray-800">119 요청 신호를 보냈어요</p>
                </div>

                {/* 메시지 목록 */}
                <div className="px-4 space-y-3">
                    {messages.map((message, index) => (
                        <div key={index} className="flex gap-3 items-start">
                            <span className="text-xs text-gray-500 mt-2 w-10">
                                {message.time}
                            </span>
                            <div
                                className="flex-1 bg-[#E8F3E6] rounded-2xl p-3.5 relative flex items-center justify-between"
                                style={{
                                    maxWidth: 'calc(100% - 3.5rem)',
                                    minHeight: '3rem'
                                }}
                            >
                                <p className="text-[15px] pr-8 leading-5">{message.text}</p>
                                {message.hasAudio && (
                                    <button
                                        onClick={() => handleAudioPlay(message.audioFileName)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                                        style={{ color: '#496E1B' }}
                                        disabled={currentlyPlaying !== null}
                                    >
                                        🔊
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 하단 버튼 */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
                <button
                    className="w-full h-14 bg-[#496E1B] text-white rounded-xl text-base font-medium"
                    onClick={() => navigate(-1)}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default StatusCheck;