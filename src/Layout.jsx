import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import RecruiterDashboard from './pages/Recruiter/RecruiterDashboard';
import ApplicantDashboard from './pages/Applicant/ApplicantDashboard';

const Layout = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/applicant-dashboard/*" element={<ApplicantDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Layout;
