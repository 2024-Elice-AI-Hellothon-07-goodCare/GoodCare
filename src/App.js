import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/caregiver/Home';
import DiagnosisStart from "./pages/caregiver/dailyDiagnosis /DiagnosisStart";
import DiagnosisInput from "./pages/caregiver/dailyDiagnosis /DiagnosisInput";
import DiagnosisChecklist from "./pages/caregiver/dailyDiagnosis /DiagnosisChecklist";
import PhysicalChecklist from "./pages/caregiver/dailyDiagnosis /PhysicalChecklist";
import FinalChecklist from "./pages/caregiver/dailyDiagnosis /FinalChecklist";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/diagnosis/start" element={<DiagnosisStart />} />
                <Route path="/diagnosis/input" element={<DiagnosisInput />} />
                <Route path="/diagnosis/checklist" element={<DiagnosisChecklist />} />
                <Route path="/diagnosis/physical" element={<PhysicalChecklist />} />
                <Route path="/diagnosis/final" element={<FinalChecklist />} />
                {/* 추가 라우트는 여기에 설정 */}
            </Routes>
        </Router>
    );
};

export default App;