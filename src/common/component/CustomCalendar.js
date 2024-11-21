import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({ view, routines }) => {
    const [date, setDate] = useState(new Date());

    const getStartAndEndDate = (date) => {
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay());
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return { start, end };
    };

    const [currentWeek, setCurrentWeek] = useState(getStartAndEndDate(new Date()));

    const checkRoutineStatus = (date) => {
        // 실제로는 routines 배열에서 해당 날짜의 루틴들을 확인하여 상태를 반환
        return {
            completed: Math.floor(Math.random() * 3), // 0-2 개의 완료된 루틴
            failed: Math.floor(Math.random() * 3)     // 0-2 개의 실패한 루틴
        };
    };

    const WeekView = () => {
        const weekDays = [
            { day: '일', color: 'text-red-500' },
            { day: '월', color: 'text-gray-900' },
            { day: '화', color: 'text-gray-900' },
            { day: '수', color: 'text-gray-900' },
            { day: '목', color: 'text-gray-900' },
            { day: '금', color: 'text-gray-900' },
            { day: '토', color: 'text-blue-500' }
        ];

        const getCurrentYearMonth = () => {
            const current = new Date(currentWeek.start);
            // 주의 중간 날짜(수요일)를 기준으로 월을 표시
            const midWeek = new Date(current);
            midWeek.setDate(current.getDate() + 3);

            return {
                year: midWeek.getFullYear(),
                month: midWeek.getMonth() + 1
            };
        };

        const { year, month } = getCurrentYearMonth();

        const getWeekDates = () => {
            const dates = [];
            const startDate = new Date(currentWeek.start);

            for (let i = 0; i < 7; i++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i);
                dates.push({
                    date: currentDate,
                    ...checkRoutineStatus(currentDate),
                    isSelected: currentDate.toDateString() === new Date().toDateString()
                });
            }
            return dates;
        };

        const handlePrevWeek = () => {
            const newStart = new Date(currentWeek.start);
            newStart.setDate(newStart.getDate() - 7);
            setCurrentWeek(getStartAndEndDate(newStart));
        };

        const handleNextWeek = () => {
            const newStart = new Date(currentWeek.start);
            newStart.setDate(newStart.getDate() + 7);
            setCurrentWeek(getStartAndEndDate(newStart));
        };

        const weekDates = getWeekDates();

        return (
            <div className="p-4 bg-green-50/50 rounded-2xl" style={{background: '#E4EFE0'}}>
                {/* Month Navigation */}
                <div className="flex justify-center items-center space-x-4 mb-6">
                    <button className="p-2 text-gray-600" onClick={handlePrevWeek}>
                        <span>{'<'}</span>
                    </button>
                    <div className="text-center">
                        <span className="text-sm text-gray-900">{year}년</span>
                        <h2 className="text-xl font-medium">{month}월</h2>
                    </div>
                    <button className="p-2 text-gray-600" onClick={handleNextWeek}>
                        <span>{'>'}</span>
                    </button>
                </div>

                {/* Week Days */}
                <div className="grid grid-cols-7 mb-2">
                    {weekDays.map(({day, color}, index) => (
                        <div key={index} className={`text-center text-sm ${color}`}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-7 gap-1">
                    {weekDates.map(({date, completed, failed, isSelected}, index) => (
                        <div
                            key={index}
                            className={`relative text-center py-2 px-1 rounded-xl transition-all
                                ${isSelected ? 'bg-green-200' : 'hover:bg-green-100'}
                                ${date.toDateString() === new Date().toDateString() ? 'font-bold' : ''}
                            `}
                        >
                            <div className={`text-lg mb-1 ${
                                index === 0 ? 'text-red-500' :
                                    index === 6 ? 'text-blue-500' : 'text-gray-900'
                            }`}>
                                {date.getDate()}
                            </div>
                            <div className="flex gap-2 justify-center text-xs">
                                {completed > 0 && (
                                    <span className="text-green-500">✓ {completed}</span>
                                )}
                                {failed > 0 && (
                                    <span className="text-red-500">✗ {failed}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Routine Button */}
                <button
                    className="w-full mt-4 py-3 bg-white rounded-xl text-gray-500 border-2 border-dashed border-gray-300">
                    + 루틴 추가
                </button>
            </div>
        );
    };

    return (
        <div className="calendar-wrapper">
            <div style={{background: '#E4EFE0'}} className="rounded-2xl">
                {view === 'month' ? (
                    <Calendar
                        onChange={setDate}
                        value={date}
                        locale="ko-KR"
                        formatDay={(locale, date) => date.getDate()}
                        className="w-full border-none"
                        calendarType="gregory"
                        prev2Label={null}
                        next2Label={null}
                        minDetail="month"
                        navigationClassName="bg-[#E4EFE0]"  // 네비게이션 클래스 추가
                        navigationLabel={({ date }) => (
                            <div style={{background: '#E4EFE0'}} className="w-full py-4">  {/* 년월 표시 부분에 직접 스타일 적용 */}
                                {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
                            </div>
                        )}
                        tileContent={({ date }) => {
                            const status = checkRoutineStatus(date);
                            return (
                                <div className="flex gap-2 justify-center text-xs">
                                    {status.completed > 0 && (
                                        <span className="text-green-500">✓ {status.completed}</span>
                                    )}
                                    {status.failed > 0 && (
                                        <span className="text-red-500">✗ {status.failed}</span>
                                    )}
                                </div>
                            );
                        }}
                        tileClassName={({ date }) =>
                            `flex flex-col justify-center items-center h-11 hover:bg-green-100 rounded-lg
                        ${date.toDateString() === new Date().toDateString() ? 'bg-green-50 rounded-lg' : ''}
                        `
                        }
                    />
                ) : (
                    <WeekView />
                )}
            </div>

            <style jsx global>{`
                .react-calendar {
                    background: transparent;
                }

                .react-calendar__navigation {
                    @apply mb-0;
                    background: #E4EFE0; /* 직접 색상 지정 */
                }

                .react-calendar__navigation button {
                    @apply text-base;
                    background: #E4EFE0; /* 버튼 배경색도 동일하게 지정 */
                }

                /* 네비게이션 영역의 패딩과 라운드 처리 */
                .react-calendar__navigation {
                    @apply p-4 rounded-t-2xl;
                }

                .react-calendar__month-view__weekdays__weekday {
                    @apply text-center font-normal no-underline;
                }

                .react-calendar__month-view__weekdays__weekday abbr {
                    @apply no-underline;
                    text-decoration: none;
                }

                .react-calendar__month-view__days__day--weekend {
                    @apply text-black;
                }

                .react-calendar__month-view__days__day--neighboringMonth {
                    background: #E4EFE0;
                }

                .react-calendar__tile--active {
                    @apply bg-green-100 rounded-lg;
                }

                .react-calendar__tile--active:enabled:hover,
                .react-calendar__tile--active:enabled:focus {
                    @apply bg-green-200;
                }

                .react-calendar__navigation button:enabled:hover,
                .react-calendar__navigation button:enabled:focus {
                    @apply bg-green-100;
                }

                .react-calendar__tile:enabled:hover,
                .react-calendar__tile:enabled:focus {
                    @apply bg-green-100;
                }

                .react-calendar__tile {
                    background: #E4EFE0;
                }
            `}</style>
        </div>
    );
};

export default CustomCalendar;