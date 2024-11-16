import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/caregiver/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* 추가 라우트는 여기에 설정 */}
            </Routes>
        </Router>
    );
};

export default App;