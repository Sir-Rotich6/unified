import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Home from './pages/home';
import LoginPage from './pages/login';
import BacklogGrooming from './pages/backlog-grooming';
import Dashboard from './pages/dashboard';
import Reports from './pages/reports';
import DailyStandups from './pages/daily-standups';
import SprintPlanning from './pages/sprint-planning';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/backlog-grooming" element={<BacklogGrooming />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/daily-standups" element={<DailyStandups />} />
        <Route path="/sprint-planning" element={<SprintPlanning />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;