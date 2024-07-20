import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Main/Header/Header';
import Footer from './components/Main/Footer/Footer';
import JobListingsPage from './pages/JobListingsPage';
import TalentProfile from './pages/Applicant/TalentProfile';
import BookmarkedJobsPage from './pages/Applicant/BookmarkedJobsPage';
import YourApplicationsPage from './pages/Applicant/YourApplicationsPage';
import JobDetailsPage from './pages/Applicant/JobDetailsPage';
import JobApplicationPage from './pages/Applicant/JobApplicationPage';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/job-listings" element={<JobListingsPage />} />
        <Route path="/talent/profile" element={<TalentProfile />} />
        <Route
          path="/talent/your-applications"
          element={<YourApplicationsPage />}
        />
        {/* <Route path="/bookmarked-jobs" element={<BookmarkedJobsPage />} /> */}
        <Route path="/job-listings/:jobId" element={<JobDetailsPage />} />
        <Route
          path="/job-listings/:jobId/apply"
          element={<JobApplicationPage />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
