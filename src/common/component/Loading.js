import React from 'react';

const LoadingSpinner = ({ size = 'w-20 h-20' }) => {
    return (
        <div className={`${size} relative`}>
            {/* 겹겹이 쌓인 원형 애니메이션 */}
            <div className="absolute inset-0 animate-[spin_1.5s_linear_infinite]">
                <div className="h-full w-full rounded-full border-4 border-t-blue-400 border-b-blue-400 border-l-transparent border-r-transparent"></div>
            </div>
            <div className="absolute inset-[6px] animate-[spin_1.2s_linear_infinite]">
                <div className="h-full w-full rounded-full border-4 border-l-blue-500 border-r-blue-500 border-t-transparent border-b-transparent"></div>
            </div>
            <div className="absolute inset-[12px] animate-[spin_0.9s_linear_infinite]">
                <div className="h-full w-full rounded-full border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent"></div>
            </div>
            {/* 중앙 펄스 효과 */}
            <div className="absolute inset-[18px]">
                <div className="h-full w-full rounded-full bg-blue-50 animate-pulse"></div>
            </div>
        </div>
    );
};

const Loading = ({
                     spinnerSize = 'w-24 h-24',
                     message,
                     messageClassName = 'text-lg text-center',
                     showHeader = true,
                     headerTitle = '',
                     className = ''
                 }) => {
    return (
        <div className={`min-h-screen bg-white ${className}`}>
            {showHeader && (
                <div className="p-4 flex items-center border-b border-gray-100">
                    <span className="text-lg font-medium">{headerTitle}</span>
                </div>
            )}

            <main className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
                <div className="relative">
                    {/* 메인 스피너 */}
                    <LoadingSpinner size={spinnerSize} />

                    {/* 데코레이션 요소들 */}
                    <div className="absolute -top-8 -left-8 w-4 h-4 rounded-full bg-blue-100 animate-ping [animation-duration:2s]" />
                    <div className="absolute -bottom-6 -right-6 w-3 h-3 rounded-full bg-blue-200 animate-ping [animation-duration:2.5s]" />
                    <div className="absolute -right-4 top-0 w-2 h-2 rounded-full bg-blue-300 animate-ping [animation-duration:1.5s]" />
                </div>

                {message && (
                    <div className="mt-12 text-center">
                        <p className={messageClassName}>
                            {message}
                        </p>
                        <div className="mt-2 flex justify-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Loading;