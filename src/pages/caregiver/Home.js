import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card } from '../../common/component/Card';
import Navigate from "../../common/component/Navigate";

const bloodPressureData = [
    { time: '9AM', value: 120 },
    { time: '11AM', value: 118 },
    { time: '1PM', value: 122 },
    { time: '3PM', value: 119 },
    { time: '5PM', value: 121 },
];

const oxygenData = [
    { time: '9AM', value: 98 },
    { time: '11AM', value: 97 },
    { time: '1PM', value: 98 },
    { time: '3PM', value: 96 },
    { time: '5PM', value: 97 },
];

const Home = () => {
    return (
        <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
            {/* Status Bar */}
            <div className="bg-white p-4 shadow-sm flex justify-between items-center">
                <span className="text-gray-600">12:30</span>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
                </div>
            </div>

            {/* Profile Section */}
            <Card className="m-4 p-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div>
                        <p className="text-lg font-medium">00님 안녕하세요!</p>
                        <p className="text-gray-600">오늘 전성원님의 상태는<br />매우 좋음이에요</p>
                    </div>
                </div>
            </Card>

            {/* Status Message */}
            <div className="mx-4 p-4 bg-green-50 rounded-lg text-sm shadow-sm">
                <p className="font-medium">000님의 신호</p>
                <p className="text-gray-600">시간 분석 중이에요...</p>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-4 p-4">
                <Card className="p-4">
                    <p className="text-sm font-medium mb-2">혈압 추이</p>
                    <div className="h-32 -ml-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={bloodPressureData}
                                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                            >
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#2196f3"
                                    strokeWidth={2}
                                    dot={true}
                                    dotSize={3}
                                />
                                <XAxis
                                    dataKey="time"
                                    tick={{ fontSize: 10 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={5}
                                />
                                <YAxis
                                    domain={['auto', 'auto']}
                                    tick={{ fontSize: 10 }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={25}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card className="p-4">
                    <p className="text-sm font-medium mb-2">산소포화도 추이</p>
                    <div className="h-32 -ml-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={oxygenData}
                                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                            >
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#4caf50"
                                    strokeWidth={2}
                                    dot={true}
                                    dotSize={3}
                                />
                                <XAxis
                                    dataKey="time"
                                    tick={{ fontSize: 10 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={5}
                                />
                                <YAxis
                                    domain={[90, 100]}
                                    tick={{ fontSize: 10 }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={25}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Tasks Section */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <p className="font-medium">오늘의 루틴</p>
                    <div className="flex items-center text-sm text-gray-600">
                        <span>8개 중 2개의 루틴을 완료했어요</span>
                        <span className="ml-2">›</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <Card className="p-4">
                        <div className="flex justify-between items-center">
                            <span>약 복용 확인하기</span>
                            <div className="flex items-center text-gray-600">
                                <span>8:00</span>
                                <MoreHorizontal className="ml-2" size={20} />
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex justify-between items-center">
                            <span>약 복용 확인하기</span>
                            <div className="flex items-center text-gray-600">
                                <span>11:00</span>
                                <MoreHorizontal className="ml-2" size={20} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Bottom Navigation */}
            <Navigate />
        </div>
    );
};

export default Home;