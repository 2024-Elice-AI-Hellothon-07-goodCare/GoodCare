import React from 'react';
import { Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Navigate from "../../common/component/Navigate";
import {Card} from "../../common/component/Card";
import Header from "../../common/component/Header";

const healthData = [
    { time: '9AM', bp: 120, oxygen: 98 },
    { time: '11AM', bp: 118, oxygen: 97 },
    { time: '1PM', bp: 122, oxygen: 98 },
    { time: '3PM', bp: 119, oxygen: 96 },
    { time: '5PM', bp: 121, oxygen: 97 },
];

const routines = [
    { title: '약 3회 복용하기', subtitle: '2회완료~', time: '8:00' },
    { title: '재활운동', subtitle: '몇시 몇시에 30분간~', time: '11:00' },
    { title: '병원 방문하기', subtitle: '저녁몇시~', time: '' },
    { title: '루틴 추가하기', isAdd: true }
];

const Home = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}. ${String(currentDate.getMonth() + 1).padStart(2, '0')}. ${String(currentDate.getDate()).padStart(2, '0')} (${['일', '월', '화', '수', '목', '금', '토'][currentDate.getDay()]})`;

    return (
        <div className="max-w-md mx-auto min-h-screen pb-24" style={{ background: '#CDE5C5' }}>
            <Header/>

            {/* Main Content */}
            <div className="pt-24 px-4">
                {/* Status and Logo */}
                <div className="flex justify-between items-start gap-10 mb-6">
                    <Card className="flex-grow p-4 bg-white/90 shadow-sm">
                        <div className="bg-gray-100 w-fit px-2 py-1 rounded-lg">
                            <p className="text-sm text-gray-600">{formattedDate}</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-lg font-medium">오늘 전성원님의 상태는</p>
                            <p className="text-lg font-medium flex items-center">
                                매우 좋아요 <span className="flex items-center">👋 <img src="/img/ai.png" alt="AI"
                                                                                  className="w-3 h-3 ml-0.5"/></span>
                            </p>
                        </div>
                    </Card>
                    <div className="w-28 h-38 flex-shrink-0">
                        <img src="/img/logo.png" alt="GOODCARE" className="w-full h-full object-contain"/>
                    </div>
                </div>

                {/* AI Analysis Status */}
                <div className="bg-white/90 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-600">AI가 분석 중이에요...</p>
                </div>

                {/* Health Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <Card className="p-3 bg-white/90">
                        <p className="text-xs mb-2">혈압</p>
                        <div className="h-12">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={healthData}>
                                    <Line type="monotone" dataKey="bp" stroke="#4B7B3F" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                    <Card className="p-3 bg-white/90">
                        <p className="text-xs mb-2">맥박</p>
                        <div className="h-12">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={healthData}>
                                    <Line type="monotone" dataKey="bp" stroke="#4B7B3F" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                    <Card className="p-3 bg-white/90">
                        <p className="text-xs mb-2">산소포화도</p>
                        <div className="h-12">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={healthData}>
                                    <Line type="monotone" dataKey="oxygen" stroke="#4B7B3F" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Routines Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {routines.map((routine, index) => (
                        <Card
                            key={index}
                            className={`p-4 ${routine.isAdd ? 'bg-white/60 border-2 border-dashed border-green-700' : 'bg-white/90'}`}
                        >
                            {routine.isAdd ? (
                                <div className="h-full flex flex-col items-center justify-center text-green-700">
                                    <Plus size={24} />
                                    <span className="text-sm mt-2">{routine.title}</span>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="font-medium mb-1">{routine.title}</h3>
                                    <p className="text-sm text-gray-600">{routine.subtitle}</p>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>

            <Navigate />
        </div>
    );
};

export default Home;