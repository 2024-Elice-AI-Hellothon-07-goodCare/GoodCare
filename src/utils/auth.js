// src/utils/auth.js
export const setUserSession = (userInfo) => {
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    if (userInfo.patientInfo) {
        sessionStorage.setItem('patientInfo', JSON.stringify(userInfo.patientInfo));
    }
};

export const getUserSession = () => {
    const userInfo = sessionStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
};

export const getPatientSession = () => {
    const patientInfo = sessionStorage.getItem('patientInfo');
    return patientInfo ? JSON.parse(patientInfo) : null;
};

export const clearUserSession = () => {
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('patientInfo');
};

export const isLoggedIn = () => {
    return !!getUserSession();
};