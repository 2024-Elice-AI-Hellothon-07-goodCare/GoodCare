import React, { useState, useEffect } from 'react';
import { getUserSession } from "../../utils/auth";
import Navigate from "../../common/component/Navigate";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Line
} from 'recharts';

const Dashboard = () => {
    const [checklistData, setChecklistData] = useState(null);
    const [selectedVital, setSelectedVital] = useState('bloodPressure'); // 선택된 생체 지표
    const [chartData, setChartData] = useState([]); // 그래프 데이터
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(() => {
        const now = new Date();
        const seoulTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
        return seoulTime;
    });
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const userInfo = getUserSession();

    const vitalLabels = {
        bloodPressure: { name: '혈압', unit: 'mmHg', range: { sys: [90, 140], dia: [60, 90] } },
        oxygen: { name: '산소포화도', unit: '%', range: [90, 100] },
        temperature: { name: '체온', unit: '°C', range: [35.5, 37.5] },
        pulse: { name: '맥박', unit: 'bpm', range: [60, 100] }
    };

    // 더미 데이터 생성 함수
    const generateDummyData = (vital) => {
        const data = [];
        const now = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(now.getDate() - i);

            if (vital === 'bloodPressure') {
                const sys = Math.floor(Math.random() * (vitalLabels[vital].range.sys[1] - vitalLabels[vital].range.sys[0] + 1)) + vitalLabels[vital].range.sys[0];
                const dia = Math.floor(Math.random() * (vitalLabels[vital].range.dia[1] - vitalLabels[vital].range.dia[0] + 1)) + vitalLabels[vital].range.dia[0];
                data.push({ date: `${date.getMonth() + 1}/${date.getDate()}`, sys, dia });
            } else {
                const value = parseFloat((Math.random() * (vitalLabels[vital].range[1] - vitalLabels[vital].range[0]) + vitalLabels[vital].range[0]).toFixed(1));
                data.push({ date: `${date.getMonth() + 1}/${date.getDate()}`, value });
            }
        }

        return data;
    };

    // 선택된 지표에 따라 더미 데이터를 생성
    useEffect(() => {
        setChartData(generateDummyData(selectedVital));
    }, [selectedVital]);

    // 데이터를 불러오는 함수
    const fetchData = async (date) => {
        try {
            setIsLoading(true);
            const formattedDate = date.toISOString().split('T')[0];
            const patientCode = userInfo?.patientInfo?.code || userInfo?.code;

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/patient/daily-check/get/checklist?date=${formattedDate}&code=${patientCode}`,
                { headers: { 'accept': '*/*' } }
            );

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setChecklistData(result.data);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userInfo) {
            fetchData(selectedDate);
        }
    }, [selectedDate]);

    // 날짜 선택
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setIsDatePickerOpen(false);
        fetchData(date);
    };

    // 날짜 포맷팅
    const formatDate = (date) => {
        return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    // 커스텀 툴팁
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            if (selectedVital === 'bloodPressure') {
                return (
                    <div className="bg-white p-2 shadow-md rounded-md">
                        <p className="text-sm">
                            {`${label}: 수축기 ${payload[0].value}mmHg / 이완기 ${payload[1].value}mmHg`}
                        </p>
                    </div>
                );
            } else {
                return (
                    <div className="bg-white p-2 shadow-md rounded-md">
                        <p className="text-sm">
                            {`${label}: ${payload[0].value} ${vitalLabels[selectedVital].unit}`}
                        </p>
                    </div>
                );
            }
        }
        return null;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600">데이터를 불러오는 중입니다...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ background: '#F5F5F5' }}>
            <header className="fixed top-0 left-0 right-0 z-10 p-4 text-center border-b" style={{ background: '#F5F5F5' }}>
                <h1 className="text-xl font-medium">대시보드</h1>
            </header>

            <main className="pt-16 pb-20 px-4">
                {/* 캐릭터 섹션 */}
                <div className="flex justify-center my-8">
                    <img
                        src={`/img/marimo/Neutral-yellow.png`}
                        alt="Character"
                        className="w-34 h-44"
                    />
                </div>

                {/* AI 분석 결과 */}
                <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600">{formatDate(selectedDate)}</span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">AI</span>
                    </div>
                    <p className="text-sm">
                        {checklistData?.dailyCheckList?.analysisData || '분석 결과가 없습니다.'}
                    </p>
                </div>

                {/* 생체 지표 선택 버튼 */}
                <div className="flex gap-2 mb-4 flex-wrap">
                    {Object.entries(vitalLabels).map(([key, value]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedVital(key)}
                            className={`px-3 py-1 rounded-full text-sm ${
                                selectedVital === key
                                    ? 'bg-[#496E1B] text-white'
                                    : 'bg-gray-200 text-gray-600'
                            }`}
                        >
                            {value.name}
                        </button>
                    ))}
                </div>

                {/* 생체 지표 그래프 카드 */}
                <div className="bg-white rounded-2xl p-4 mb-4">
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chartData}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF6384" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#FF6384" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#36A2EB" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#36A2EB" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#496E1B" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#496E1B" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis hide={true} />
                                <Tooltip content={<CustomTooltip />} />
                                {selectedVital === 'bloodPressure' ? (
                                    <>
                                        <Area
                                            type="monotone"
                                            dataKey="sys"
                                            stroke="#FF6384"
                                            fill="url(#colorSys)"
                                            strokeWidth={2}
                                            dot={{ fill: '#FF6384', r: 4 }}
                                            activeDot={{ r: 6, fill: '#FF6384' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="dia"
                                            stroke="#36A2EB"
                                            fill="url(#colorDia)"
                                            strokeWidth={2}
                                            dot={{ fill: '#36A2EB', r: 4 }}
                                            activeDot={{ r: 6, fill: '#36A2EB' }}
                                        />
                                    </>
                                ) : (
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#496E1B"
                                        fill="url(#colorValue)"
                                        strokeWidth={2}
                                        dot={{ fill: '#496E1B', r: 4 }}
                                        activeDot={{ r: 6, fill: '#496E1B' }}
                                    />
                                )}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 환자 분석 */}
                <div className="bg-[#F6FFF3] rounded-2xl p-4 mb-4">
                    <h3 className="font-medium mb-3">환자 분석</h3>
                    <ul className="text-sm space-y-2 text-gray-600">
                        {checklistData?.dailyCheckList?.analysisFullData?.split('\n')?.map((line, index) => (
                            <li key={index}>• {line}</li>
                        )) || <li>• 분석 데이터가 없습니다.</li>}
                    </ul>
                </div>

                {/* 하단 버튼 섹션 */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsDatePickerOpen(true)}
                        className="flex-1 py-4 bg-white rounded-xl text-[#496E1B]"
                    >
                        일일 진단 보기
                    </button>
                    <button className="flex-1 py-4 bg-white rounded-xl text-[#496E1B]"
                            onClick={() => {
                                window.location.href = "tel:+821027475990";
                            }}    >
                        병원에 전화하기
                    </button>
                </div>

                {/* 날짜 선택 모달 */}
                {isDatePickerOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md">
                            <h3 className="text-lg font-medium mb-4">날짜 선택</h3>
                            <input
                                type="date"
                                value={selectedDate.toISOString().split('T')[0]}
                                onChange={(e) => {
                                    handleDateSelect(new Date(e.target.value));
                                }}
                                className="w-full p-3 border rounded-xl mb-4 focus:outline-none focus:border-[#496E1B]"
                            />
                            <button
                                onClick={() => setIsDatePickerOpen(false)}
                                className="w-full py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                )}

                <Navigate />
            </main>
        </div>
    );
};

export default Dashboard;
