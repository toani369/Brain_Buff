import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import MemoryHubPage from '../pages/MemoryHubPage';
import ExercisesPage from '../pages/ExercisesPage';
import ProgramsPage from '../pages/ProgramsPage';
import TrainingSessionPage from '../pages/TrainingSessionPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing & Auth Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes nested in AppLayout */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/memory" element={<MemoryHubPage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/training/:id" element={<TrainingSessionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Top-Level Catch-All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
