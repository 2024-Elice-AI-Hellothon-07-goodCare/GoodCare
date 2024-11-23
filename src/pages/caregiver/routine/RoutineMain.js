import React, {useState} from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomCalendar from "../../../common/component/CustomCalendar";
import Navigate from "../../../common/component/Navigate";
import Dropdown from "../../../common/component/Dropdown";

const RoutineMain = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('month');
    const [favorites, setFavorites] = useState(new Set());
    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태 추가

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleAddRoutine = () => {
        navigate('/routine/add', {
            state: { selectedDate: selectedDate }
        });
    };



    function handleEditRoutine(routineId) {
        return undefined;
    }

    function handleDeleteRoutine(routineId) {
        return undefined;
    }


    // 루틴 메뉴 아이템 정의
    const getRoutineMenuItems = (routineId) => [
        {
            label: '루틴 수정',
            onClick: () => handleEditRoutine(routineId),
        },
        {
            label: '루틴 삭제',
            onClick: () => handleDeleteRoutine(routineId),
            color: 'red'
        }
    ];

    const toggleFavorite = (routineId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(routineId)) {
                newFavorites.delete(routineId);
            } else {
                newFavorites.add(routineId);
            }
            return newFavorites;
        });
    };

    const routines = [
        {
            id: 1,
            title: '아침, 점심, 저녁 약 복용 확인',
            time: '15:30',
            type: '매일',
            isCompleted: true,
            isActive: true
        },
        {
            id: 2,
            title: '병원 방문',
            date: '11.18 (금)',
            time: '13:00',
            isCompleted: false
        },
        {
            id: 3,
            title: '아침, 점심, 저녁 약 복용 확인',
            time: '11:30',
            type: '매일',
            isCompleted: true,
            isActive: true
        },
        {
            id: 4,
            title: '재활운동 하기',
            type: '매주 월, 수, 금',
            isCompleted: false,
            isActive: true
        }
    ];

    return (
        <div className="min-h-screen" style={{background: '#F5F5F5'}}>
            {/* Header */}
            <div className="p-4 flex items-center mb-7" style={{background: '#F5F5F5'}}>
                <div className="flex-1 text-center">
                    <h1 className="text-xl font-medium">내 루틴</h1>
                </div>
                <div className="absolute right-4 inline-flex bg-gray-200 rounded-2lg">
                    <button
                        onClick={() => setView('week')}
                        className={`p-2 text-sm rounded-md transition-all ${
                            view === 'week'
                                ? 'bg-white text-gray-800 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        <span className="flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </span>
                    </button>
                    <button
                        onClick={() => setView('month')}
                        className={`p-2 text-sm rounded-md transition-all ${
                            view === 'month'
                                ? 'bg-white text-gray-800 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        <span className="flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M7 2L7 6" stroke="currentColor" strokeWidth="2"/>
                                <path d="M17 2L17 6" stroke="currentColor" strokeWidth="2"/>
                                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
            <div className="px-4 pb-24 flex flex-col h-full" style={{background: '#F5F5F5'}}>
                {/* Calendar Component */}
                <div className="mx-2">
                    <CustomCalendar
                        view={view}
                        routines={routines}
                        selectedDate={selectedDate}
                        onDateSelect={handleDateSelect}
                    />
                </div>

                {/* Add Routine Button */}
                <button
                    onClick={handleAddRoutine}
                    className="mx-2 mt-4 p-3 mb-4 rounded-xl bg-white border border-gray-200 text-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    + 루틴 추가
                </button>

                {/* Uncompleted Routines */}
                <div className="mx-1 mt-1 mb-4">
                    <h2 className="text-sm text-gray-600 mb-4">아직 완료하지 않은 루틴</h2>
                    <div className="space-y-2 ">

                        {routines
                            .filter(routine => !routine.isCompleted)
                            .map((routine) => (
                                <div key={routine.id} className="bg-white rounded-xl p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-medium">{routine.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                                <span>📅 {routine.type || routine.date}</span>
                                                {routine.time && <span>⏰ {routine.time}</span>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 relative mb-4">
                                            <button
                                                onClick={() => toggleFavorite(routine.id)}
                                                className={`text-xl ${favorites.has(routine.id) ? 'text-red-500' : 'text-gray-300'}`}
                                            >
                                                ♥
                                            </button>
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === routine.id ? null : routine.id)}>
                                                <MoreVertical size={20} className="text-gray-400 "/>
                                            </button>
                                            <Dropdown
                                                isOpen={openMenuId === routine.id}
                                                onClose={() => setOpenMenuId(null)}
                                                items={getRoutineMenuItems(routine.id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Today's Completed Routines */}
                <div className="mx-1 mt-1">
                    <h2 className="text-sm text-gray-600 mb-4">오늘의 완료된 루틴</h2>
                    <div className="space-y-2">
                        {routines
                            .filter(routine => routine.isCompleted)
                            .map((routine) => (
                                <div key={routine.id} className="bg-green-50 rounded-xl p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
                                                <span className="text-xl">🌱</span>
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{routine.title}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                                    <span>📅 {routine.type}</span>
                                                    {routine.time && <span>⏰ {routine.time}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 relative">
                                            <button
                                                onClick={() => toggleFavorite(routine.id)}
                                                className={`text-xl ${favorites.has(routine.id) ? 'text-red-500' : 'text-gray-300'}`}
                                            >
                                                ♥
                                            </button>
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === routine.id ? null : routine.id)}>
                                                <MoreVertical size={20} className="text-gray-400"/>
                                            </button>
                                            <Dropdown
                                                isOpen={openMenuId === routine.id}
                                                onClose={() => setOpenMenuId(null)}
                                                items={getRoutineMenuItems(routine.id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <Navigate/>
        </div>
    );
};

export default RoutineMain;