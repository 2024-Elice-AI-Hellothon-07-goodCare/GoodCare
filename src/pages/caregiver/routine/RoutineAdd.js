import React, { useState } from 'react';
import { Heart, X, Plus, ChevronLeft, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const RoutineAdd = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedDate = location.state?.selectedDate ? new Date(location.state.selectedDate) : new Date();

    const formatDate = (date) => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dayOfWeek = days[date.getDay()];
        return `${month}.${day} (${dayOfWeek})`;
    };

    const [routineName, setRoutineName] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [times, setTimes] = useState([]);
    const [startDate, setStartDate] = useState(selectedDate.toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState('');
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState('00:00');
    const [selectedPeriod, setSelectedPeriod] = useState('오전');
    const [isAllDay, setIsAllDay] = useState(false);

    const days = ['일', '월', '화', '수', '목', '금', '토'];

    const handleBack = () => {
        navigate(-1);
    };

    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const addTime = () => {
        const newTime = `${selectedPeriod} ${selectedTime}`;
        if (!times.includes(newTime)) {
            setTimes([...times, newTime]);
        }
        setShowTimePicker(false);
    };

    const removeTime = (timeToRemove) => {
        setTimes(times.filter(time => time !== timeToRemove));
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="p-4 flex items-center justify-between bg-white relative">
                <button onClick={handleBack} className="z-10">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-medium absolute left-1/2 -translate-x-1/2">루틴 추가</h1>
                <div className="w-6" />
            </div>

            <div className="p-4 space-y-6">
                {/* 루틴 이름 */}
                <div>
                    <h2 className="mb-2 text-base">루틴 이름</h2>
                    <div className="relative bg-[#F8FFF8] rounded-xl p-4">
                        <input
                            type="text"
                            value={routineName}
                            onChange={(e) => setRoutineName(e.target.value)}
                            placeholder="주기와 루틴의 이름을 적어주세요."
                            className="w-full bg-transparent placeholder-gray-400 focus:outline-none"
                        />
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            <Heart
                                className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300'}`}
                            />
                        </button>
                    </div>
                </div>

                {/* 루틴 주기 */}
                <div>
                    <h2 className="mb-2 text-base">루틴 주기</h2>
                    <div className="bg-[#F8FFF8] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <span>{formatDate(selectedDate)}</span>
                            <Calendar className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="mt-4 flex gap-2">
                            {days.map((day) => (
                                <button
                                    key={day}
                                    onClick={() => toggleDay(day)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                                        ${selectedDays.includes(day)
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-white text-gray-600'
                                    }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 루틴 시간 */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-base">루틴 시간</h2>
                        <button
                            onClick={() => setIsAllDay(!isAllDay)}
                            className={`text-sm ${isAllDay ? 'text-green-600' : 'text-gray-400'}`}
                        >
                            하루 종일
                        </button>
                    </div>
                    <div className="bg-[#F8FFF8] rounded-xl p-4 space-y-2">
                        {!isAllDay && (
                            <div className="flex gap-2">
                                <select
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    className="flex-1 p-3 bg-white rounded-xl border border-gray-200"
                                >
                                    {Array.from({ length: 24 }, (_, i) => {
                                        const hour = i.toString().padStart(2, '0');
                                        return (
                                            <option key={hour} value={`${hour}:00`}>
                                                {hour}:00
                                            </option>
                                        );
                                    })}
                                </select>
                                <select
                                    value={selectedPeriod}
                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                    className="flex-1 p-3 bg-white rounded-xl border border-gray-200"
                                >
                                    <option value="오전">오전</option>
                                    <option value="오후">오후</option>
                                </select>
                                <button
                                    onClick={() => setShowTimePicker(true)}
                                    className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center"
                                >
                                    <Plus className="w-5 h-5 text-green-600" />
                                </button>
                            </div>
                        )}
                        {times.map((time, index) => (
                            <div key={index} className="flex items-center justify-between bg-white p-3 rounded-xl">
                                <span>{time}</span>
                                <button onClick={() => removeTime(time)}>
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 루틴 지속 기간 */}
                <div>
                    <h2 className="mb-2 text-base">루틴 지속 기간</h2>
                    <div className="bg-[#F8FFF8] rounded-xl p-4 space-y-2">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full p-3 bg-white rounded-xl border border-gray-200"
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full p-3 bg-white rounded-xl border border-gray-200"
                                    placeholder="날짜 선택"
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단 버튼 */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white flex gap-4">
                <button
                    onClick={handleCancel}
                    className="flex-1 py-3 rounded-xl bg-[#F8FFF8] text-gray-600"
                >
                    취소
                </button>
                <button className="flex-1 py-3 rounded-xl bg-green-800 text-white">
                    저장
                </button>
            </div>

            {/* Time Picker Modal */}
            {showTimePicker && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="bg-white w-full rounded-t-3xl p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">시간 선택</h3>
                            <button onClick={() => setShowTimePicker(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="flex-1 p-3 rounded-xl bg-gray-50 border border-gray-200"
                            >
                                <option value="오전">오전</option>
                                <option value="오후">오후</option>
                            </select>
                            <input
                                type="time"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="flex-1 p-3 rounded-xl bg-gray-50 border border-gray-200"
                            />
                        </div>
                        <button
                            onClick={addTime}
                            className="w-full py-3 rounded-xl bg-green-800 text-white"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoutineAdd;