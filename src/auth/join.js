import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userType = location.state?.userType || '환자';
    const [showCode, setShowCode] = useState(false);
    const [patientCode, setPatientCode] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dateOfBirth: '',
        mainDisease: '',
        underlyingDisease: '',
        patientCode: '',
        contactNumber: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            // 필수 필드 체크
            if (userType === '환자') {
                if (!formData.name || !formData.gender || !formData.dateOfBirth || !formData.contactNumber) {
                    setError('필수 정보를 모두 입력해주세요.');
                    return;
                }

                const response = await fetch(`${process.env.REACT_APP_API_URL}/patient/info/register`, {
                    method: 'POST',
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        dateOfBirth: formData.dateOfBirth.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
                        gender: formData.gender,
                        contactNumber: formData.contactNumber,
                        mainDisease: formData.mainDisease || '',
                        underlyingDisease: formData.underlyingDisease || ''
                    })
                });

                const data = await response.json();

                if (data.success) {
                    setPatientCode(data.data.patient.code);
                    setShowCode(true);

                    // 세션에 정보 저장
                    sessionStorage.setItem('patientInfo', JSON.stringify({
                        ...data.data.patient,
                        name: formData.name
                    }));
                } else {
                    setError(data.message || '회원가입에 실패했습니다.');
                }
            } else {
                // 간병인 회원가입
                if (!formData.name || !formData.gender || !formData.dateOfBirth || !formData.patientCode || !formData.contactNumber) {
                    setError('필수 정보를 모두 입력해주세요.');
                    return;
                }

                const response = await fetch(`${process.env.REACT_APP_API_URL}/guardian/info/save`, {
                    method: 'POST',
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        patientCode: formData.patientCode,
                        name: formData.name,
                        dateOfBirth: formData.dateOfBirth.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
                        gender: formData.gender,
                        contactNumber: formData.contactNumber
                    })
                });

                const data = await response.json();

                if (data.success) {
                    navigate('/login', {
                        state: {
                            name: formData.name,
                            userType: userType
                        }
                    });
                } else {
                    setError(data.message || '회원가입에 실패했습니다.');
                }
            }
        } catch (error) {
            setError('서버 연결에 실패했습니다.');
        }
    };

    // 코드 확인 화면
    if (showCode) {
        return (
            <div className="min-h-screen bg-[#E9EEEA]">
                <div className="fixed top-0 left-0 right-0 bg-[#E9EEEA] z-50">
                    <div className="h-14 flex items-center justify-between px-4 border-b">
                       <span className="absolute left-1/2 -translate-x-1/2 font-medium">
                           회원가입
                       </span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center min-h-screen px-4">
                    <div className="text-center mb-8">
                        <p className="text-xl mb-2">{formData.name} 님에게</p>
                        <p className="text-xl">환자 코드가 부여되었습니다.</p>
                    </div>

                    <div className="text-4xl font-bold mb-12 bg-white py-4 px-8 rounded-lg">
                        {patientCode}
                    </div>

                    <button
                        onClick={() => navigate('/login')}
                        className="w-full py-4 bg-[#496E1B] text-white rounded-xl"
                    >
                        다음
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#E9EEEA]">
            <div className="fixed top-0 left-0 right-0 bg-[#E9EEEA] z-50">
                <div className="h-14 flex items-center justify-between px-4 border-b">
                    <button onClick={() => navigate('/login')} className="p-2 -ml-2">
                        <img src="/img/back.png" alt="back" className="w-6 h-6" />
                    </button>
                    <span className="absolute left-1/2 -translate-x-1/2 font-medium">
                       회원가입
                   </span>
                </div>
            </div>

            <div className="px-4 pt-20 pb-8">
                <h2 className="text-lg mb-6">회원가입을 위한 정보를 입력해주세요.</h2>

                <div className="space-y-6">
                    {/* 이름 */}
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">이름</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="이름을 입력해주세요"
                            className="w-full h-12 px-4 rounded-lg bg-white focus:outline-none"
                        />
                    </div>

                    {/* 간병인일 경우 환자 코드 입력 */}
                    {userType === '간병인' && (
                        <div>
                            <label className="text-sm text-gray-600 mb-1 block">환자 코드</label>
                            <input
                                type="text"
                                value={formData.patientCode}
                                onChange={(e) => setFormData({...formData, patientCode: e.target.value})}
                                placeholder="환자 계정으로 부여된 코드 6자리를 입력해주세요."
                                className="w-full h-12 px-4 rounded-lg bg-white focus:outline-none"
                                maxLength="6"
                            />
                        </div>
                    )}

                    {/* 성별 */}
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">성별</label>
                        <div className="flex gap-3">
                            {['남', '여'].map((gender) => (
                                <button
                                    key={gender}
                                    type="button"
                                    onClick={() => setFormData({...formData, gender})}
                                    className={`
                                       flex-1 h-12 rounded-lg flex items-center justify-center
                                       ${formData.gender === gender
                                        ? 'bg-[#E4EFE0] text-[#496E1B]'
                                        : 'bg-white text-gray-500'}
                                   `}
                                >
                                    {gender}
                                    {formData.gender === gender && (
                                        <span className="ml-2">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 생년월일 */}
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">생년월일 8자리</label>
                        <input
                            type="text"
                            value={formData.dateOfBirth}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                if (value.length <= 8) {
                                    setFormData({...formData, dateOfBirth: value});
                                }
                            }}
                            placeholder="ex) 20030125"
                            className="w-full h-12 px-4 rounded-lg bg-white focus:outline-none"
                            maxLength="8"
                        />
                    </div>

                    {/* 전화번호 - 모든 사용자에게 필수 */}
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">전화번호</label>
                        <input
                            type="tel"
                            value={formData.contactNumber}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9-]/g, '');
                                setFormData({...formData, contactNumber: value});
                            }}
                            placeholder="전화번호를 입력해주세요."
                            className="w-full h-12 px-4 rounded-lg bg-white focus:outline-none"
                        />
                    </div>

                    {userType === '환자' && (
                        <>
                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">주요 질병</label>
                                <input
                                    type="text"
                                    value={formData.mainDisease}
                                    onChange={(e) => setFormData({...formData, mainDisease: e.target.value})}
                                    placeholder="주요 질병을 입력해주세요"
                                    className="w-full h-12 px-4 rounded-lg bg-white focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">기저질환</label>
                                <input
                                    type="text"
                                    value={formData.underlyingDisease}
                                    onChange={(e) => setFormData({...formData, underlyingDisease: e.target.value})}
                                    placeholder="만성 및 기저질환을 입력해주세요."
                                    className="w-full h-12 px-4 rounded-lg bg-white focus:outline-none"
                                />
                            </div>
                        </>
                    )}
                </div>

                {error && (
                    <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
                )}

                <button
                    onClick={handleSubmit}
                    className={`w-full py-4 rounded-xl text-white font-medium mt-8 mb-4
                       ${!formData.name || !formData.gender || !formData.dateOfBirth || !formData.contactNumber
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-[#496E1B]'}
                   `}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default Register;