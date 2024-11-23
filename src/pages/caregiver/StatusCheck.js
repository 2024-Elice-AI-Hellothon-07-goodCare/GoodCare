import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserSession } from "../../utils/auth";

const StatusCheck = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userInfo = getUserSession();

    useEffect(() => {
        setMessages([
            {
                time: "17:59",
                text: "전성원님이 도움을 요청했어요",
                hasAudio: true
            },
            {
                time: "17:59",
                text: "전성원님이 통증을 호소하고 있어요",
                hasAudio: true
            },
            {
                time: "18:00",
                text: "간병인에게 다시 일람을 받아요",
                hasAudio: true
            },
            {
                time: "18:02",
                text: "간병인님이 전성원님의 상태를 확인하고 있어요"
            }
        ]);
        setIsLoading(false);
    }, []);

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
                    <p className="text-gray-800">전성원님이 방금 지속적인 환부 통증으로</p>
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
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg" style={{ color: '#496E1B' }}>
                                        🔊
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 상태 업데이트 메시지 */}
                <div className="flex justify-center mt-6">
                    <div className="bg-[#E8F3E6] rounded-full px-5 py-2 text-sm text-gray-600">
                        상태 업데이트 중...
                    </div>
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