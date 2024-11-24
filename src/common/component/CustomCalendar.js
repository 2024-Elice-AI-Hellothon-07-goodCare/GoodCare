import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({ view, routines, selectedDate, onDateSelect }) => {
    const getStartAndEndDate = (date) => {
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay());
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return { start, end };
    };

    const [currentWeek, setCurrentWeek] = useState(getStartAndEndDate(new Date()));

    const handleDateClick = (date) => {
        onDateSelect(date);
    };

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
                    ...checkRoutineStatus(currentDate)
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
                    {weekDates.map(({date, completed, failed}, index) => (
                        <div
                            key={index}
                            onClick={() => handleDateClick(date)}
                            className={`relative text-center py-2 px-1 rounded-xl transition-all cursor-pointer
                                ${date.toDateString() === selectedDate?.toDateString() ? 'bg-green-200' : 'hover:bg-green-100'}
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
            </div>
        );
    };

    return (
        <div className="calendar-wrapper">
            <div style={{background: '#E4EFE0'}} className="rounded-2xl">
                {view === 'month' ? (
                    <Calendar
                        onChange={handleDateClick}
                        value={selectedDate}
                        locale="ko-KR"
                        formatDay={(locale, date) => date.getDate()}
                        className="w-full border-none"
                        calendarType="gregory"
                        prev2Label={null}
                        next2Label={null}
                        minDetail="month"
                        navigationLabel={({date}) => (
                            <div style={{background: '#E4EFE0'}} className="w-full py-4">
                                {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
                            </div>
                        )}
                        tileContent={({date}) => {
                            const status = checkRoutineStatus(date);
                            return (
                                <div className="flex flex-col items-center w-full">
                                    {/* 상태 표시를 위한 고정 높이의 div */}
                                    <div className="h-4 flex gap-2 justify-center text-xs mt-1">
                                        {status.completed > 0 && (
                                            <span className="text-green-500">✓ {status.completed}</span>
                                        )}
                                        {status.failed > 0 && (
                                            <span className="text-red-500">✗ {status.failed}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        }}
                        tileClassName={({date}) =>
                            `flex flex-col justify-center items-center h-11 hover:bg-green-100 rounded-lg cursor-pointer
                            ${date.toDateString() === selectedDate?.toDateString() ? 'bg-green-200' : ''}
                            `
                        }
                    />
                ) : (
                    <WeekView/>
                )}
            </div>

            <style jsx global>{`
                .react-calendar {
                    background: transparent;
                    width: 100% !important;
                    padding: 12px;
                }

                .react-calendar__navigation {
                    @apply mb-2;
                    background: #E4EFE0;
                    height: 48px;
                    display: flex;
                    margin-bottom: 0;
                }

                .react-calendar__navigation button {
                    @apply text-lg font-medium;
                    background: #E4EFE0;
                    min-width: 36px;
                    padding: 6px;
                }

                .react-calendar__month-view__weekdays {
                    @apply text-sm;
                    padding: 4px 0;
                }

                .react-calendar__month-view__weekdays__weekday {
                    @apply text-center font-normal;
                    padding: 4px;
                }

                .react-calendar__month-view__weekdays__weekday abbr {
                    @apply no-underline text-sm;
                    text-decoration: none;
                }

                .react-calendar__tile {
                    background: #E4EFE0;
                    height: 60px !important;
                    padding: 4px !important;
                    font-size: 1rem !important;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }

                .react-calendar__tile > abbr {
                    position: absolute;
                    top: 8px;
                }

                .react-calendar__tile .flex.flex-col {
                    margin-top: 24px;
                    width: 100%;
                }

                .react-calendar__tile--now {
                    @apply bg-green-100;
                }

                .react-calendar__tile--active {
                    @apply bg-green-200 rounded-lg;
                }

                .react-calendar__tile--active:enabled:hover,
                .react-calendar__tile--active:enabled:focus {
                    @apply bg-green-300;
                }

                .react-calendar__navigation button:enabled:hover,
                .react-calendar__navigation button:enabled:focus {
                    @apply bg-green-100;
                }

                .react-calendar__tile:enabled:hover,
                .react-calendar__tile:enabled:focus {
                    @apply bg-green-100;
                }

                .react-calendar__month-view__days__day--weekend {
                    color: inherit;
                }

                .react-calendar__month-view__days__day:nth-child(7n+1) {
                    color: #e00000; /* 일요일 빨간색 */
                }

                .react-calendar__month-view__days__day:nth-child(7n) {
                    color: #0066cc; /* 토요일 파란색 */
                }

                .react-calendar__tile .flex.gap-2 {
                    margin-top: 2px;
                    font-size: 0.75rem;
                    height: 16px; /* 상태 표시 영역 높이 고정 */
                    display: flex;
                    align-items: center;
                }

                .react-calendar__month-view__days__day--neighboringMonth {
                    background: #E4EFE0;
                    color: #999 !important;
                }

                .react-calendar__navigation__label {
                    font-weight: bold;
                    font-size: 1.1rem;
                }

                .react-calendar__navigation__arrow {
                    font-size: 1.4rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .react-calendar__month-view__weekdays__weekday {
                    text-align: center;
                    padding: 8px 0;
                }

                .react-calendar__month-view__weekdays__weekday:nth-child(1) abbr {
                    color: #e00000;
                }

                .react-calendar__month-view__weekdays__weekday:nth-child(7) abbr {
                    color: #0066cc;
                }

                /* 각 날짜 타일 내부의 상태 표시 레이아웃 */
                .react-calendar__tile .status-indicators {
                    position: absolute;
                    bottom: 4px;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    gap: 4px;
                }

                /* 상태 표시 아이콘 스타일 */
                .status-complete {
                    color: #22C55E;
                    font-size: 0.75rem;
                }

                .status-fail {
                    color: #EF4444;
                    font-size: 0.75rem;
                }
            `}</style>
        </div>
    );
};

export default CustomCalendar;