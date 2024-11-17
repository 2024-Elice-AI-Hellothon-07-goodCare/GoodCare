import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Header from '../../../common/component/Header';
import Loading from "../../../common/component/Loading";

const FinalChecklist = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [note, setNote] = useState('');
    const [bleeding, setBleeding] = useState(null);
    const [medication, setMedication] = useState(null);
    const [sideEffects, setSideEffects] = useState(null);

    const handleSubmit = () => {
        setIsLoading(true);
        // 실제 API 호출이나 데이터 처리 로직이 들어갈 자리
        setTimeout(() => {
            navigate('/diagnosis/result');
        }, 2000);
    };

    if (isLoading) {
        return (
            <Loading
                spinnerSize="w-32 h-32"
                message={
                    <>
                        진단 결과를<br />
                        분석하고 있어요
                    </>
                }
                showHeader={true}
                headerTitle="일일 진단하기"
            />
        );
    }


    // 라디오 버튼 스타일의 체크 아이템
    const RadioCheckItem = ({ label, checked, onChange }) => (
        <button
            onClick={onChange}
            className={`
        w-full p-4 rounded-xl mb-3 flex justify-between items-center
        ${checked ? 'bg-blue-50' : 'bg-gray-50'}
        transition-colors duration-200
      `}
        >
            <span className="text-gray-900">{label}</span>
            {checked && <Check size={20} className="text-blue-500" />}
        </button>
    );

    // 가로 배치 라디오 버튼
    const HorizontalRadioGroup = ({ options, value, onChange }) => (
        <div className="flex gap-3">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`
            flex-1 p-4 rounded-xl flex justify-center items-center
            ${value === option.value ? 'bg-blue-50' : 'bg-gray-50'}
            transition-colors duration-200
          `}
                >
                    <span className="text-gray-900">{option.label}</span>
                    {value === option.value && <Check size={20} className="ml-2 text-blue-500" />}
                </button>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <Header
                title="일일 진단하기"
                showBack={true}
                showNotification={false}
            />

            <main className="px-4 pt-[104px] pb-24">
                <h2 className="text-lg mb-6">
                    성원님의 기타 확인 사항을 체크해주세요.
                </h2>

                {/* 상처 또는 감염 징후 */}
                <div className="mb-8">
                    <h3 className="text-gray-600 text-sm mb-3">상처 또는 감염 징후 여부</h3>
                    <RadioCheckItem
                        label="없음"
                        checked={bleeding === 'none'}
                        onChange={() => setBleeding('none')}
                    />
                    <RadioCheckItem
                        label="발적"
                        checked={bleeding === 'redness'}
                        onChange={() => setBleeding('redness')}
                    />
                    <RadioCheckItem
                        label="고름 / 분비물"
                        checked={bleeding === 'discharge'}
                        onChange={() => setBleeding('discharge')}
                    />
                </div>

                {/* 아침 약 복용 여부 */}
                <div className="mb-8">
                    <h3 className="text-gray-600 text-sm mb-3">아침 약 복용 여부</h3>
                    <HorizontalRadioGroup
                        options={[
                            { label: '미완료', value: 'incomplete' },
                            { label: '완료', value: 'complete' }
                        ]}
                        value={medication}
                        onChange={setMedication}
                    />
                </div>

                {/* 복용하는 약 부작용 여부 */}
                <div className="mb-8">
                    <h3 className="text-gray-600 text-sm mb-3">복용하는 약 부작용 여부</h3>
                    <HorizontalRadioGroup
                        options={[
                            { label: '있음', value: 'yes' },
                            { label: '없음', value: 'no' }
                        ]}
                        value={sideEffects}
                        onChange={setSideEffects}
                    />
                </div>

                {/* 특이사항 메모 */}
                <div>
                    <h3 className="text-gray-600 text-sm mb-3">특이사항 및 간호기록</h3>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="추가로 기록할 사항을 적어주세요."
                        className="w-full h-32 p-4 rounded-xl bg-gray-50 resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>
            </main>

            {/* 하단 네비게이션 버튼 */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
                <div className="flex gap-3 max-w-md mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 py-4 bg-gray-100 rounded-xl text-gray-900 font-medium
                     active:bg-gray-200 transition-colors duration-200"
                    >
                        이전
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 py-4 bg-gray-100 rounded-xl text-gray-900 font-medium
                     active:bg-gray-200 transition-colors duration-200"
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinalChecklist;