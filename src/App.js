import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/caregiver/Home';
import DiagnosisStart from "./pages/caregiver/dailyDiagnosis /DiagnosisStart";
import DiagnosisInput from "./pages/caregiver/dailyDiagnosis /DiagnosisInput";
import DiagnosisChecklist from "./pages/caregiver/dailyDiagnosis /DiagnosisChecklist";
import PhysicalChecklist from "./pages/caregiver/dailyDiagnosis /PhysicalChecklist";
import FinalChecklist from "./pages/caregiver/dailyDiagnosis /FinalChecklist";
import AlertDemo from "./pages/alert/AlertDemo";
import SituationCheck from "./pages/alert/SituationCheck";
import SituationDetails from "./pages/alert/SituationDetails";
import RoutineConfirmation from "./pages/alert/RoutineConfirmation";
import RoutineCancelConfirm from "./pages/alert/RoutineCancelConfirm";
import RoutineMain from "./pages/caregiver/routine/RoutineMain";

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
                <Route path="/alert" element={<AlertDemo />} /> {/* 임시로 알럿창 확인을 위한 라우트 */}
                <Route path="/alert/situation" element={<SituationCheck />} />
                <Route path="/alert/details" element={<SituationDetails />} />
                <Route path="/alert/routine" element={<RoutineConfirmation />} />
                <Route path="/alert/cancel-confirm" element={<RoutineCancelConfirm />} />
                <Route path="/routine/routine-main" element={<RoutineMain />} />





                {/* 추가 라우트는 여기에 설정 */}
            </Routes>
        </Router>
    );
};

export default App;