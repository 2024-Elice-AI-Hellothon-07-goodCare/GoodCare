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
            consciousnessLevel: 'CLEAR',
            moodBehaviour: 'SAME_AS_USUAL'
        },
        physicalStatusDTO: {
            skinCondition: 'NORMAL',
            painLevel: 'NONE',
            mobility: 'NORMAL'
        },
        medicationsDTO: {
            medicationTaken: false,
            sideEffects: '없음'
        },
        specialNotesDTO: {
            specialNotes: '-',
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
            const patientCode = userInfo?.patientInfo?.code || userInfo?.code;
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

    const getAIAnalysis = useCallback(async () => {
        try {
            const today = new Date().toLocaleDateString('ko-KR', {
                timeZone: 'Asia/Seoul',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).replace(/\. /g, '-').replace('.', '');            const patientCode = userInfo?.patientInfo?.code || userInfo?.code;

            if (!patientCode) {
                throw new Error('Patient code not available');
            }

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/patient/daily-check/get/ai-analysis?date=${today}&code=${patientCode}`,
                { headers: { 'accept': '*/*' } }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error('AI Analysis API Error:', errorData);
                throw new Error(errorData?.message || 'Failed to get AI analysis');
            }

            const result = await response.json();
            console.log('AI Analysis success:', result);

            if (result.success) {
                return result.data;
            } else {
                throw new Error(result.message || 'Failed to get AI analysis');
            }
        } catch (error) {
            console.error('Error getting AI analysis:', error);
            throw error;
        }
    }, [userInfo]);

    const contextValue = {
        diagnosisData,
        updateDiagnosisData,
        submitDiagnosisData,
        getAIAnalysis
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