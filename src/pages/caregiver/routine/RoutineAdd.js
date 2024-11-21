// pages/routine/RoutineAdd.js
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const RoutineAdd = () => {
    const [routineName, setRoutineName] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedTimes, setSelectedTimes] = useState([]);

    return (
        <div className="max-w-md mx-auto min-h-screen" style={{background: '#F5F5F5'}}>
            {/* Header */}
            <div className="p-4 flex items-center">
                <button className="p-2" onClick={() => window.history.back()}>
                    {'<'}
                </button>
                <div className="flex-1 text-center">
                    <h1 className="text-xl font-medium">루틴 추가</h1>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
                {/* 루틴 이름 */}
                <div>
                    <div className="flex justify-between mb-2">
                        <span>루틴 이름</span>
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}
                        >
                            ♥
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="보호자에게 연락하기"
                        className="w-full p-3 bg-green-50/50 rounded-xl"
                        value={routineName}
                        onChange={(e) => setRoutineName(e.target.value)}
                    />
                </div>

                {/* 루틴 주기 */}
                <div>
                    <h2 className="mb-2">루틴 주기</h2>
                    <div className="bg-green-50/50 rounded-xl p-3">
                        <div className="text-lg mb-2">11.21 (목)</div>
                        <div className="grid grid-cols-7 text-center">
                            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                                <div key={day} className="py-1">{day}</div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 루틴 시간 */}
                <div>
                    <div className="flex justify-between mb-2">
                        <h2>루틴 시간</h2>
                        <span className="text-gray-500">하루 동일</span>
                    </div>
                    <div className="flex gap-2 items-center mb-2">
                        <select className="bg-green-50/50 rounded-xl p-3 flex-1">
                            <option>00:00</option>
                            {/* 시간 옵션들 */}
                        </select>
                        <select className="bg-green-50/50 rounded-xl p-3 flex-1">
                            <option>오전 / 오후</option>
                            <option>오전</option>
                            <option>오후</option>
                        </select>
                        <button className="bg-green-100 rounded-full p-2">+</button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <div className="flex items-center bg-green-50/50 rounded-lg px-3 py-1">
                            오전 10:00
                            <button className="ml-2">×</button>
                        </div>
                        <div className="flex items-center bg-green-50/50 rounded-lg px-3 py-1">
                            오후 9:00
                            <button className="ml-2">×</button>
                        </div>
                    </div>
                </div>

                {/* 루틴 지속 기간 */}
                <div>
                    <div className="flex justify-between mb-2">
                        <h2>루틴 지속 기간</h2>
                        <span className="text-green-600">계속 반복</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <div className="bg-green-50/50 rounded-xl p-3 flex justify-between items-center">
                                2024.11.20 (수)
                                <Calendar className="text-gray-500" size={20} />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="bg-green-50/50 rounded-xl p-3 flex justify-between items-center">
                                날짜 선택
                                <Calendar className="text-gray-500" size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 flex gap-4">
                <button className="flex-1 py-3 rounded-xl bg-green-100">취소</button>
                <button className="flex-1 py-3 rounded-xl bg-green-800 text-white">저장</button>
            </div>
        </div>
    );
};

export default RoutineAdd;