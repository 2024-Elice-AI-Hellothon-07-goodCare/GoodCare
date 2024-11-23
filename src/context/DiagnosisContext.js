import React, { createContext, useContext, useState, useCallback } from 'react';
import { getUserSession } from '../utils/auth';

const DiagnosisContext = createContext();

export const DiagnosisProvider = ({ children }) => {
    const userInfo = getUserSession();
    const [diagnosisData, setDiagnosisData] = useState({
        dailyCheckListDTO: {
            createdAt: new Date().toISOString().split('T')[0]
        },
        vitalSignsDTO: {
            temperature: 0,
            bloodPressureSys: 0,
            bloodPressureDia: 0,
            pulse: 0,
            oxygen: 0,
            respirationRate: 0
        },
        consciousnessDTO: {
            consciousnessLevel: 'CLEAR',  // 기본값 설정
            moodBehaviour: 'SAME_AS_USUAL'  // 기본값 설정
        },
        physicalStatusDTO: {
            skinCondition: 'NORMAL',  // 기본값 설정
            painLevel: 'NONE',  // 기본값 설정
            mobility: 'NORMAL'  // 기본값 설정
        },
        medicationsDTO: {
            medicationTaken: false,
            sideEffects: '없음'  // 기본값 설정
        },
        specialNotesDTO: {
            specialNotes: '-',  // 기본값 설정
        }
    });

    const updateDiagnosisData = useCallback((section, data) => {
        setDiagnosisData(prev => {
            const newData = {
                ...prev,
                [section]: {
                    ...prev[section],
                    ...data
                }
            };
            console.log('Updated diagnosis data:', newData);
            return newData;
        });
    }, []);

    const prepareSubmitData = useCallback(() => {
        // 제출 전 데이터 검증 및 정리
        const preparedData = {
            ...diagnosisData,
            specialNotesDTO: {
                specialNotes: diagnosisData.specialNotesDTO.specialNotes || '-'
            },
            medicationsDTO: {
                ...diagnosisData.medicationsDTO,
                sideEffects: diagnosisData.medicationsDTO.sideEffects || '없음'
            },
            physicalStatusDTO: {
                ...diagnosisData.physicalStatusDTO,
            }
        };

        return preparedData;
    }, [diagnosisData]);

    const submitDiagnosisData = useCallback(async () => {
        try {
            const patientCode = userInfo?.patientInfo?.code;
            if (!patientCode) {
                throw new Error('Patient code not available');
            }

            const dataToSubmit = prepareSubmitData();
            console.log('Submitting diagnosis data:', {
                url: `${process.env.REACT_APP_API_URL}/patient/daily-check/input?code=${patientCode}`,
                data: dataToSubmit
            });

            const response = await fetch(`${process.env.REACT_APP_API_URL}/patient/daily-check/input?code=${patientCode}`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSubmit)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error('API Error Response:', errorData);
                throw new Error(errorData?.message || 'Failed to submit diagnosis data');
            }

            const result = await response.json();
            console.log('Submit success:', result);
            return result;
        } catch (error) {
            console.error('Error submitting diagnosis:', error);
            throw error;
        }
    }, [userInfo, prepareSubmitData]);

    const contextValue = {
        diagnosisData,
        updateDiagnosisData,
        submitDiagnosisData
    };

    console.log('Current diagnosis data:', diagnosisData);

    return (
        <DiagnosisContext.Provider value={contextValue}>
            {children}
        </DiagnosisContext.Provider>
    );
};

export const useDiagnosis = () => {
    const context = useContext(DiagnosisContext);
    if (context === undefined) {
        throw new Error('useDiagnosis must be used within a DiagnosisProvider');
    }
    return context;
};