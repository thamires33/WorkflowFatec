// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAluno from './pages/LoginAluno';
import HomeAluno from './pages/HomeAluno';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginAluno />} />
        <Route path="/loginAluno" element={<LoginAluno />} />
        <Route path="/home" element={<HomeAluno />} />
      </Routes>
    </Router>
  );
}

export default App;
