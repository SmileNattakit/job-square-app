import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Main/Header/Header';
import Footer from './components/Main/Footer/Footer';
import JobListingsPage from './pages/JobListingsPage';
import { Toaster } from 'react-hot-toast';

// Talent Components
import TalentProfile from './pages/Applicant/TalentProfile';
import YourApplicationsPage from './pages/Applicant/YourApplicationsPage';
import JobDetailsPage from './pages/Applicant/JobDetailsPage';

// Recruiter Components (placeholders)
import RecruiterDashboard from './pages/Recruiter/RecruiterDashboard';
import CompanyProfile from './pages/Recruiter/CompanyProfile';

const TalentRoutes = () => (
  <Routes>
    <Route path="/profile" element={<TalentProfile />} />
    <Route path="/your-applications" element={<YourApplicationsPage />} />
  </Routes>
);

const RecruiterRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<RecruiterDashboard />} />
    <Route path="/company-profile/:companyId" element={<CompanyProfile />} />
  </Routes>
);

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
        <Route path="/job-listings/:jobId" element={<JobDetailsPage />} />

        <Route path="/talent/*" element={<TalentRoutes />} />
        <Route path="/recruiter/*" element={<RecruiterRoutes />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
