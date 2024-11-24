import React, { useState, useEffect } from 'react';
import { getUserSession } from '../../utils/auth';
import Navigate from '../../common/component/Navigate';

const MyInfo = () => {
    const [patientInfo, setPatientInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState(null);

    useEffect(() => {
        const fetchPatientInfo = async () => {
            try {
                const userInfo = getUserSession();
                const patientCode = userInfo?.patientInfo?.code || userInfo?.code;

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/patient/info/get/code?code=${patientCode}`,
                    { headers: { 'accept': '*/*' } }
                );

                const result = await response.json();
                if (result.success) {
                    setPatientInfo(result.data);
                    if (result.data.fileName) {
                        setUploadedFileName(result.data.fileName);
                    }
                }
            } catch (error) {
                console.error('Error fetching patient info:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatientInfo();
    }, []);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const maxSize = 2.4 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('파일 크기는 2.4MB를 초과할 수 없습니다.');
                return;
            }

            if (!file.type.includes('audio/mp3') && !file.type.includes('audio/mpeg')) {
                alert('MP3 파일만 업로드할 수 있습니다.');
                return;
            }

            setSelectedFile(file);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('파일을 선택해주세요.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const userInfo = getUserSession();
            const patientCode = userInfo?.patientInfo?.code || userInfo?.code;

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/patient/file/upload?code=${patientCode}`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            const result = await response.json();

            if (result.success) {
                setUploadedFileName(result.data.originalFileName);
                alert('파일이 성공적으로 업로드되었습니다.');
                // 파일 선택 초기화
                setSelectedFile(null);
            } else {
                throw new Error(result.message || '파일 업로드에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('파일 업로드에 실패했습니다.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#E9EEEA]">
            <header className="fixed top-0 left-0 right-0 bg-[#E9EEEA] z-10 p-4 text-center border-b">
                <h1 className="text-xl font-medium">정보 관리</h1>
            </header>

            <main className="pt-16 px-4 pb-24">
                <h2 className="text-lg font-medium mb-4">내 정보</h2>

                {/* 환자 정보 카드 */}
                <div className="bg-white rounded-2xl p-6 mb-6">
                    <h3 className="text-lg font-medium mb-4">{patientInfo?.name} 환자</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">성별</span>
                            <span>{patientInfo?.gender}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">생년월일</span>
                            <span>{patientInfo?.dateOfBirth}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">주요 질병</span>
                            <span>{patientInfo?.mainDisease}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">기저질환</span>
                            <span>{patientInfo?.underlyingDisease}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">음성 업로드</span>
                            <span>{patientInfo?.code}.mp3</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">환자 코드</span>
                            <span>{patientInfo?.code}</span>
                        </div>
                    </div>
                </div>

                {/* 음성 업로드 섹션 */}
                <div className="bg-[#F6FFF3] rounded-2xl p-4 mb-6">
                    {patientInfo?.code ? (
                        // 파일이 이미 존재하는 경우
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-600 mb-2">음성이 이미 등록되어 있습니다.</p>
                            <div className="bg-white rounded-lg px-4 py-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                    {patientInfo.code}.mp3
                </span>
                                {/* 필요한 경우 다운로드나 재생 버튼 추가 */}
                            </div>
                        </div>
                    ) : (
                        // 파일이 없는 경우 업로드 UI 표시
                        <>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-600">
                                    환자의 음성을 업로드해주세요.
                                    <br />
                                    (mp3 파일, 최대 2.4mb)
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <label className="flex-1 relative">
                                    <input
                                        type="file"
                                        accept=".mp3,audio/mp3,audio/mpeg"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                    <div className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg text-sm cursor-pointer">
                        <span className="text-gray-500">
                            {selectedFile ? selectedFile.name : '파일 선택'}
                        </span>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 4V16M16 10H4" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                    </div>
                                </label>
                                {selectedFile && (
                                    <button
                                        onClick={handleFileUpload}
                                        className="px-4 py-2 bg-[#496E1B] text-white rounded-lg text-sm"
                                    >
                                        업로드
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* 계정 추가 버튼 */}
                <button className="w-full py-3 bg-white rounded-xl text-[#496E1B] text-sm">
                    + 가족 추가
                </button>
            </main>

            <Navigate />
        </div>
    );
};

export default MyInfo;