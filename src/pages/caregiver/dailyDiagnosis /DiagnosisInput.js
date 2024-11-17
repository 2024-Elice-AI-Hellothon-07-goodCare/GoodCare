import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../common/component/Header';

const DiagnosisInput = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        temperature: '',
        bloodPressureHigh: '',
        bloodPressureLow: '',
        pulse: '',
        breathing: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // TODO: 데이터 처리 로직
        navigate('/diagnosis/checklist'); // 다음 페이지로 이동
    };

    const InputField = ({ label, name, value, placeholder, unit }) => (
        <div className="mb-8">
            <label className="text-gray-600 text-sm mb-1 block">{label}</label>
            <div className="flex items-center">
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full border-b border-gray-300 pb-2 text-lg focus:outline-none focus:border-gray-600"
                />
                {unit && <span className="ml-2 text-gray-600">{unit}</span>}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <Header
                title="일일 진단하기"
                showBack={true}
                showNotification={false}
            />

            <main className="px-4 pt-[104px] pb-8">
                <h2 className="text-lg mb-8">
                    기본 생체 신호를 체크해주세요.
                </h2>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                    {/* 체온 */}
                    <div className="mb-8">
                        <label className="text-gray-600 text-sm mb-1 block">체온</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                name="temperature"
                                value={formData.temperature}
                                onChange={handleChange}
                                placeholder="정상 범위: 36.5-37.5"
                                className="w-full border-b border-gray-300 pb-2 text-lg focus:outline-none focus:border-gray-600"
                            />
                            <span className="ml-2 text-gray-600">°C</span>
                        </div>
                    </div>

                    {/* 혈압 */}
                    <div className="mb-8">
                        <label className="text-gray-600 text-sm mb-1 block">혈압</label>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="bloodPressureHigh"
                                    value={formData.bloodPressureHigh}
                                    onChange={handleChange}
                                    placeholder="정상 범위: 90-120"
                                    className="w-full border-b border-gray-300 pb-2 text-lg focus:outline-none focus:border-gray-600"
                                />
                            </div>
                            <span className="text-gray-600">/</span>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="bloodPressureLow"
                                    value={formData.bloodPressureLow}
                                    onChange={handleChange}
                                    placeholder="정상 범위: 60-80"
                                    className="w-full border-b border-gray-300 pb-2 text-lg focus:outline-none focus:border-gray-600"
                                />
                            </div>
                            <span className="ml-2 text-gray-600">mmHg</span>
                        </div>
                    </div>

                    {/* 맥박 */}
                    <div className="mb-8">
                        <label className="text-gray-600 text-sm mb-1 block">맥박</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                name="pulse"
                                value={formData.pulse}
                                onChange={handleChange}
                                placeholder="정상 범위: 60-100회/분"
                                className="w-full border-b border-gray-300 pb-2 text-lg focus:outline-none focus:border-gray-600"
                            />
                            <span className="ml-2 text-gray-600">회/분</span>
                        </div>
                    </div>

                    {/* 호흡수 */}
                    <div className="mb-8">
                        <label className="text-gray-600 text-sm mb-1 block">호흡수</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                name="breathing"
                                value={formData.breathing}
                                onChange={handleChange}
                                placeholder="정상 범위: 12-20회/분"
                                className="w-full border-b border-gray-300 pb-2 text-lg focus:outline-none focus:border-gray-600"
                            />
                            <span className="ml-2 text-gray-600">회/분</span>
                        </div>
                    </div>
                </form>

                {/* 하단 버튼 */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-gray-100 rounded-xl text-gray-900 font-medium
                     active:bg-gray-200 transition-colors duration-200"
                    >
                        다음
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DiagnosisInput;