import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserInputPage } from './pages/UserInputPage';
import { ProfilePage } from './pages/ProfilePage';
import { AppLayout } from './components/layout/AppLayout';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<UserInputPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;