import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import DashBoard from "./pages/caregiver/DashBoard";
import RoutineAdd from "./pages/caregiver/routine/RoutineAdd";
import RoutineMain from "./pages/caregiver/routine/RoutineMain";
import RoutineCancelConfirm from "./pages/alert/RoutineCancelConfirm";
import RoutineConfirmation from "./pages/alert/RoutineConfirmation";
import SituationDetails from "./pages/alert/SituationDetails";
import SituationCheck from "./pages/alert/SituationCheck";
import AlertDemo from "./pages/alert/AlertDemo";
import Loading from "./common/component/Loading";
import DiagnosisDetail from "./pages/caregiver/dailyDiagnosis /DiagnosisDetail";
import DiagnosisResult from "./pages/caregiver/dailyDiagnosis /DiagnosisResult";
import FinalChecklist from "./pages/caregiver/dailyDiagnosis /FinalChecklist";
import PhysicalChecklist from "./pages/caregiver/dailyDiagnosis /PhysicalChecklist";
import DiagnosisChecklist from "./pages/caregiver/dailyDiagnosis /DiagnosisChecklist";
import DiagnosisInput from "./pages/caregiver/dailyDiagnosis /DiagnosisInput";
import DiagnosisStart from "./pages/caregiver/dailyDiagnosis /DiagnosisStart";
import {DiagnosisProvider} from "./context/DiagnosisContext";
import StatusCheck from "./pages/caregiver/StatusCheck";
import MyInfo from "./pages/caregiver/MyInfo";
import Register from "./auth/join";
import Home from "./pages/caregiver/Home";
import Login from "./auth/login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/myinfo",
        element: <MyInfo />,
    },
    // diagnosis 경로 수정
    {
        path: "diagnosis",
        element: <DiagnosisProvider />,
        children: [
            {
                path: "",
                element: <Navigate to="start" replace />,
            },
            {
                path: "start",
                element: <DiagnosisStart />,
                index: true,
            },
            {
                path: "input",
                element: <DiagnosisInput />,
            },
            {
                path: "checklist",
                element: <DiagnosisChecklist />,
            },
            {
                path: "physical",
                element: <PhysicalChecklist />,
            },
            {
                path: "final",
                element: <FinalChecklist />,
            },
            {
                path: "result",
                element: <DiagnosisResult />,
            },
            {
                path: "detail",
                element: <DiagnosisDetail />,
            },
            {
                path: "loading",
                element: <Loading />,
            },
        ],
    },
    // help 경로를 진단 경로 다음으로 이동
    {
        path: "/help",
        element: <StatusCheck />,
    },
    {
        path: "/alert/*",
        children: [
            {
                path: "",
                element: <AlertDemo />,
            },
            {
                path: "situation",
                element: <SituationCheck />,
            },
            {
                path: "details",
                element: <SituationDetails />,
            },
            {
                path: "routine",
                element: <RoutineConfirmation />,
            },
            {
                path: "cancel-confirm",
                element: <RoutineCancelConfirm />,
            },
        ],
    },
    {
        path: "/routine/*",
        children: [
            {
                path: "routine-main",
                element: <RoutineMain />,
            },
            {
                path: "add",
                element: <RoutineAdd />,
            },
        ],
    },
    {
        path: "/dashboard/health",
        element: <DashBoard />,
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;