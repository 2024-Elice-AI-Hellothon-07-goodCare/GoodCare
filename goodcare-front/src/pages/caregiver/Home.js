
import React, {useState, useEffect, useCallback} from 'react';
import { Plus } from 'lucide-react';
import Navigate from "../../common/component/Navigate";
import { Card } from "../../common/component/Card";
import Header from "../../common/component/Header";
import { getUserSession } from "../../utils/auth";
import navigate from "../../common/component/Navigate";
import { useNavigate } from 'react-router-dom';
import TutorialOverlay from "../../common/component/Tutorial";  // 상단에 import 추가


const Home = () => {
    const [checklistData, setChecklistData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const userInfo = getUserSession();
    const [characterImage, setCharacterImage] = useState('');
    const navigate = useNavigate();  // useNavigate 훅 사용
    const [routines, setRoutines] = useState([]);
    const [showTutorial, setShowTutorial] = useState(true); // 튜토리얼 표시 상태



    const handleAddRoutine = () => {
        navigate('/routine/add');
    };

    const handleMarimoClick = () => {
        navigate('/help'); // 상태 확인 페이지로 이동
    };



    const getCharacterImage = useCallback((status) => {
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
    }, []);

    useEffect(() => {
        if (checklistData?.dailyCheckList?.analysisWord) {
            const image = getCharacterImage(checklistData.dailyCheckList.analysisWord);
            setCharacterImage(image);
        }
    }, [checklistData?.dailyCheckList?.analysisWord, getCharacterImage]);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}. ${String(currentDate.getMonth() + 1).padStart(2, '0')}. ${String(currentDate.getDate()).padStart(2, '0')} (${['일', '월', '화', '수', '목', '금', '토'][currentDate.getDay()]})`;

    useEffect(() => {
        const fetchChecklistData = async () => {
            try {
                const patientCode = userInfo?.patientInfo?.code;
                if (!patientCode) return;

                const now = new Date();
                const offset = now.getTimezoneOffset() * 60000;
                const today = new Date(now - offset).toISOString().split('T')[0];

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/patient/daily-check/get/checklist?date=${today}&code=${patientCode}`,
                    {
                        headers: {
                            'accept': '*/*'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch checklist data');
                }

                const result = await response.json();
                if (result.success) {
                    setChecklistData(result.data);
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error('Error fetching checklist data:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChecklistData();
    }, []);

    const healthMetrics = checklistData?.vitalSigns ? [
        {
            label: '혈압',
            value: `${checklistData.vitalSigns.bloodPressureSys}/${checklistData.vitalSigns.bloodPressureDia}`,
            unit: 'mmHg',
            change: '+1.2%',
            changeType: 'increase'
        },
        {
            label: '맥박',
            value: String(checklistData.vitalSigns.pulse),
            unit: '회',
            change: '-0.8%',
            changeType: 'decrease'
        },
        {
            label: '산소포화도',
            value: String(checklistData.vitalSigns.oxygen),
            unit: '%',
            change: '0.0%',
            changeType: 'neutral'
        },
        {
            label: '체온',
            value: String(checklistData.vitalSigns.temperature),
            unit: '°C',
            change: '+0.1%',
            changeType: 'increase'
        }
    ] : [];

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const userInfo = getUserSession();
                const patientCode = userInfo?.patientInfo?.code || userInfo?.code;

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/caregiver/routine/get?code=${patientCode}`,
                    { headers: { 'accept': '*/*' } }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch routines');
                }

                const result = await response.json();

                if (result.success) {
                    setRoutines(result.data.map(routine => ({
                        id: routine.caregiverRoutine.id,
                        title: decodeURIComponent(routine.caregiverRoutine.name),
                        subtitle: routine.caregiverRoutineDayOfWeekDTO.daysOfWeek.length > 0
                            ? `매주 ${getDayOfWeekKorean(routine.caregiverRoutineDayOfWeekDTO.daysOfWeek)}`
                            : `${routine.caregiverRoutine.startDate} ~ ${routine.caregiverRoutine.endDate}`,
                        time: getFormattedTime(routine.caregiverRoutineStartTimeDTO.startTime),
                        type: routine.caregiverRoutine.frequencyType === 'SPECIFIC' ? '특정 기간' : '매주',
                        isImportant: routine.caregiverRoutine.isImportant
                    })));
                }
            } catch (error) {
                console.error('Error fetching routines:', error);
            }
        };

        fetchRoutines();
    }, []);

// 요일 변환 유틸 함수
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

    // 시간 포맷팅 함수
    const getFormattedTime = (timeArray) => {
        if (!timeArray || timeArray.length === 0) return '';
        return timeArray.map(time =>
            `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
        ).join(', ');
    };



    return (
        <div className="min-h-screen pb-24" style={{background: '#F5F5F5'}}>
            {showTutorial && <TutorialOverlay onClose={() => setShowTutorial(false)} />} {/* 오버레이 표시 */}

            <div className="fixed top-0 left-0 right-0 z-10">
                <Header/>
            </div>

            <div className="pt-32 px-4 ">
                <div className="flex justify-between items-start ">
                    <div className="w-2/3 bg-white rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                            <p className="text-sm bg-gray-100 px-2 py-1 rounded-lg">{formattedDate}</p>
                            <span className="bg-gray-100 px-2 py-1 rounded-lg text-xs">AI</span>
                        </div>
                        <p className="mt-2">
                            {isLoading ? "데이터를 불러오는 중입니다..." :
                                error ? "데이터를 불러오지 못했습니다." :
                                    checklistData?.dailyCheckList?.analysisData || "분석 데이터가 없습니다."}
                        </p>
                    </div>

                    <div className="w-1/3 flex justify-end">
                        <img
                            src={characterImage || getCharacterImage('보통')}
                            alt="Health Character"
                            className="w-25 h-35 cursor-pointer" // cursor-pointer 추가
                            onClick={handleMarimoClick} // 클릭 이벤트 추가
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2 mt-8">
                    {healthMetrics.map((metric, index) => (
                        <div key={index} className="bg-white p-3 rounded-xl" style={{background: '#E4EFE0'}}>
                            <div className="flex justify-between items-start">
                                <span className="text-sm text-gray-600">{metric.label}</span>
                                <span className={`text-xs ${
                                    metric.changeType === 'increase' ? 'text-red-500' :
                                        metric.changeType === 'decrease' ? 'text-blue-500' :
                                            'text-gray-500'
                                }`}>{metric.change}</span>
                            </div>
                            <div className="mt-1">
                                <span className="text-3xl font-medium">{metric.value}</span>
                                <span className="text-lg text-gray-600 ml-1">{metric.unit}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-green-50 rounded-xl p-4 mt-8" style={{background: '#CDE5C5'}} >
                    <div className="flex justify-between items-center mb-4">
                        <h2>오늘의 루틴</h2>
                        <div className="flex gap-2">
                            <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center">{'<'}</button>
                            <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center">{'>'}</button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {routines.map((routine, index) => (
                            <div key={index} className="bg-white rounded-xl p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium">{routine.title}</h3>
                                        <p className="text-sm text-gray-600">{routine.subtitle}</p>
                                    </div>
                                    <button className="text-red-500">♥</button>
                                </div>
                                {routine.time && (
                                    <div className="mt-2 text-sm text-gray-600">
                                        <span className="mr-2">⏰</span>
                                        {routine.time}
                                    </div>
                                )}
                                {routine.type && (
                                    <div className="mt-1 text-sm text-gray-600">
                                        <span className="mr-2">🔄</span>
                                        {routine.type}
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={handleAddRoutine}
                            className="w-full bg-white rounded-xl p-4 flex items-center justify-center"
                        >
                            <Plus className="text-green-800"/>
                            <span className="ml-2 text-green-800">루틴 추가하기</span>
                        </button>
                    </div>
                </div>
            </div>

            <Navigate/>
        </div>
    );
};

export default Home;
