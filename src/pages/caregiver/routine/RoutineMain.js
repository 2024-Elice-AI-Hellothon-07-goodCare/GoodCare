import React, {useState, useEffect} from 'react';
import {Plus, MoreVertical} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {getUserSession} from "../../../utils/auth";
import CustomCalendar from "../../../common/component/CustomCalendar";
import Navigate from "../../../common/component/Navigate";
import Dropdown from "../../../common/component/Dropdown";

const RoutineMain = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('month');
    const [favorites, setFavorites] = useState(new Set());
    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [routines, setRoutines] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // API에서 받아온 요일 데이터를 한글로 변환
    const getDayOfWeekKorean = (daysOfWeek) => {
        const dayMap = {
            'MONDAY': '월',
            'TUESDAY': '화',
            'WEDNESDAY': '수',
            'THURSDAY': '목',
            'FRIDAY': '금',
            'SATURDAY': '토',
            'SUNDAY': '일'
        };
        return daysOfWeek.map(day => dayMap[day]).join(', ');
    };


    const handleCompleteRoutine = (routineId) => {
        setRoutines(prevRoutines =>
            prevRoutines.map(routine =>
                routine.id === routineId
                    ? { ...routine, isCompleted: true }
                    : routine
            )
        );
    };

    // 시간 포맷팅 함수
    const formatTime = (timeArray) => {
        if (!timeArray || timeArray.length === 0) return null;
        const time = timeArray[0];
        return `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
    };

    // API 데이터를 컴포넌트에 맞는 형식으로 변환
    const transformRoutineData = (apiData) => {
        return apiData.map(item => ({
            id: item.caregiverRoutine.id,
            title: decodeURIComponent(item.caregiverRoutine.name),
            type: item.caregiverRoutineDayOfWeekDTO.daysOfWeek.length > 0
                ? `매주 ${getDayOfWeekKorean(item.caregiverRoutineDayOfWeekDTO.daysOfWeek)}`
                : `${item.caregiverRoutine.startDate} ~ ${item.caregiverRoutine.endDate}`,
            time: formatTime(item.caregiverRoutineStartTimeDTO.startTime),
            isCompleted: item.caregiverRoutine.completed,
            isActive: true,
            startDate: item.caregiverRoutine.startDate,
            endDate: item.caregiverRoutine.endDate,
            isImportant: item.caregiverRoutine.isImportant
        }));
    };

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const userInfo = getUserSession();
                const patientCode = userInfo?.patientInfo?.code || userInfo?.code;

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/caregiver/routine/get?code=${patientCode}`,
                    {headers: {'accept': '*/*'}}
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch routines');
                }

                const result = await response.json();

                if (result.success) {
                    const transformedData = transformRoutineData(result.data);
                    setRoutines(transformedData);
                } else {
                    throw new Error(result.message || '루틴을 불러오는데 실패했습니다.');
                }
            } catch (error) {
                console.error('Error fetching routines:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoutines();
    }, []);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleAddRoutine = () => {
        navigate('/routine/add', {
            state: {selectedDate: selectedDate}
        });
    };

    function handleEditRoutine(routineId) {
        // TODO: 루틴 수정 로직 구현
        console.log('Edit routine:', routineId);
    }

    function handleDeleteRoutine(routineId) {
        // TODO: 루틴 삭제 로직 구현
        console.log('Delete routine:', routineId);
    }

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

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            <p>루틴을 불러오는 중입니다...</p>
        </div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500">{error}</p>
        </div>;
    }

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
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
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
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
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
                    <div className="space-y-2">
                        {routines
                            .filter(routine => !routine.isCompleted)
                            .map((routine) => (
                                <div key={routine.id} className="bg-white rounded-xl p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            {/* 체크박스 */}
                                            <button
                                                onClick={() => handleCompleteRoutine(routine.id)}
                                                className="mt-1 w-5 h-5 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                aria-label="루틴 완료하기"
                                            >
                                                <svg
                                                    className="w-3 h-3 text-transparent"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </button>
                                            <div>
                                                <h3 className="font-medium">{routine.title}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                                    <span>📅 {routine.type}</span>
                                                    {routine.time && <span>⏰ {routine.time}</span>}
                                                </div>
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
                                            <div
                                                className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
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