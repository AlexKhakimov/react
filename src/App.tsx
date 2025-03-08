import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import HomePage from '@pages/HomePage';
import SynchronizationPage from '@pages/SynchronizationPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sync" element={<SynchronizationPage />} />
          <Route path="/upload" element={<div>Загрузка</div>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
