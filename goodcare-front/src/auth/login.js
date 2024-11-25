import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getPatientSession, setUserSession} from "../utils/auth";

const Login = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const checkDailyStatus = async (patientCode) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/patient/daily-check/check-today?code=${patientCode}`,
                {
                    headers: {
                        'accept': '*/*'
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to check daily status');
            }

            const result = await response.json();
            return result.success === false && result.status === 'COMMON409';
        } catch (error) {
            console.error('Error checking daily status:', error);
            return false;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login/`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userType,
                    code,
                    name,
                }),
            });

            if (!response.ok) {
                setError('로그인에 실패했습니다. 다시 시도해주세요.');
                return;
            }

            const responseData = await response.json();
            const userData = responseData.data.object;

            const sessionData = {
                userType,
                code: userData.code,
                name: userData.name,
                patientInfo: userType === '간병인' ? {
                    code: userData.patientCode
                } : null
            };

            setUserSession(sessionData);

            if (userType === '간병인') {
                try {
                    console.log('Fetching daily check status for patient:', userData.patientCode);

                    const dailyCheckResponse = await fetch(
                        `${process.env.REACT_APP_API_URL}/patient/daily-check/check-today?code=${userData.patientCode}`,
                        {
                            headers: { 'accept': '*/*' }
                        }
                    );

                    console.log('Daily check response status:', dailyCheckResponse.status);

                    if (dailyCheckResponse.ok) {
                        const dailyCheckResult = await dailyCheckResponse.json();
                        console.log('Daily check result:', dailyCheckResult);

                        if (dailyCheckResult.success === false && dailyCheckResult.status === 'COMMON409') {
                            console.log('Navigating to home');
                            navigate('/home');
                        } else {
                            console.log('Navigating to diagnosis/start');
                            navigate('/diagnosis/start', { replace: true });  // replace: true 추가
                        }
                    } else {
                        console.log('API call failed, navigating to diagnosis/start');
                        navigate('/diagnosis/start', { replace: true });
                    }
                } catch (error) {
                    console.error('Error in daily check:', error);
                    navigate('/diagnosis/start', { replace: true });
                }
            } else {
                // 다른 사용자 타입의 라우팅
                console.log('Non-caregiver user type:', userType);
                switch(userType) {
                    case '환자':
                        navigate('/patient/home', { replace: true });
                        break;
                    case '가족':
                        navigate('/family/home', { replace: true });
                        break;
                    default:
                        navigate('/', { replace: true });
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('서버 연결에 실패했습니다.');
        }
    };

    if (step === 1) {
        return (
            <div className="min-h-screen bg-[#E9EEEA] flex flex-col items-center px-4">
                {/* 로고 */}
                <img
                    src="/img/GOODCARE.svg"
                    alt="GOODCARE"
                    className="mt-20 mb-16 h-8"
                />

                <h2 className="text-xl font-medium mb-8">당신의 역할을 선택해주세요.</h2>

                <div className="w-full max-w-md space-y-3">
                    {['환자', '간병인 *간병 역할을 하는 가족 포함', '가족'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setUserType(type === '간병인 *간병 역할을 하는 가족 포함' ? '간병인' : type)}
                            className={`
                                w-full p-4 rounded-lg flex items-center justify-between
                                ${userType === (type === '간병인 *간병 역할을 하는 가족 포함' ? '간병인' : type)
                                ? 'bg-[#E4EFE0] text-[#496E1B]'
                                : 'bg-white'}
                            `}
                        >
                            <span>{type}</span>
                            {userType === (type === '간병인 *간병 역할을 하는 가족 포함' ? '간병인' : type) && (
                                <span className="text-[#496E1B]">✓</span>
                            )}
                        </button>
                    ))}

                    <button
                        onClick={() => userType ? setStep(2) : setError('역할을 선택해주세요.')}
                        className="w-full py-4 bg-[#496E1B] text-white rounded-lg font-medium mt-8"
                        disabled={!userType}
                    >
                        다음
                    </button>

                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#E9EEEA] flex flex-col items-center px-4">
            {/* 로고 */}
            <img
                src="/img/GOODCARE.svg"
                alt="GOODCARE"
                className="mt-20 mb-16 h-8"
            />

            {/* 캐릭터 이미지 */}
            <img
                src="/img/disoStart.png"
                alt="Character"
                className="w-42 h-52 mb-12"
            />

            {/* 로그인 폼 */}
            <div className="w-full max-w-md space-y-4">
                <div className="text-center mb-4">
                    <h2 className="text-xl font-medium">{userType} 로그인</h2>
                    <button
                        onClick={() => {
                            setStep(1);
                            setError('');
                        }}
                        className="text-sm text-gray-500 mt-2 hover:text-[#496E1B]"
                    >
                        역할 다시 선택하기
                    </button>
                </div>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름"
                    className="w-full p-4 rounded-lg bg-white focus:outline-none"
                />
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="회원 코드"
                    className="w-full p-4 rounded-lg bg-white focus:outline-none"
                />

                <button
                    onClick={handleLogin}
                    className="w-full py-4 bg-[#496E1B] text-white rounded-lg font-medium"
                >
                    로그인
                </button>

                {error && (
                    <p className="text-red-500 text-sm text-center">
                        {error}
                    </p>
                )}

                {/* 회원가입 링크 */}
                <div className="text-center">
                    <span className="text-gray-500">처음 오셨나요? </span>
                    <button
                        onClick={() => navigate('/register', { state: { userType } })}
                        className="text-[#496E1B] underline"
                    >
                        회원가입하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;