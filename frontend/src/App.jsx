import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserInputPage } from './pages/UserInputPage';
import { ProfilePage } from './pages/ProfilePage';
import { AppLayout } from './components/layout/AppLayout';
import NotFoundPage from './pages/404';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<UserInputPage />} />
          <Route path="/profile/:username/"  element={<ProfilePage />} />
          <Route path="/*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={<NotFoundPage/>} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;