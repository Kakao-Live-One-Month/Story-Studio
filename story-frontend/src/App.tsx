// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './pages/MainPage'; // GeneratingPage 컴포넌트를 임포트합니다.
import GeneratingPage from './pages/GeneratingPage'; // GeneratingPage 컴포넌트를 임포트합니다.
import GeneratedPage from './pages/GeneratedPage'; // GeneratingPage 컴포넌트를 임포트합니다.


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/generating" element={<GeneratingPage />} />
        <Route path="/generated" element={<GeneratedPage />} />
      </Routes>
    </Router>
  );
};


export default App;
