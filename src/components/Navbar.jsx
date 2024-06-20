import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GuestNavbar from './GuestNavbar';
import ApplicantNavbar from './Applicant/ApplicantNavbar';
import RecruiterNavbar from './Recruiter/RecruiterNavbar';

const Navbar = () => {
  const [loginStatus, setloginStatus] = useState('Applicant');
  return (
    <div>
      {loginStatus === 'Guest' && <GuestNavbar />}
      {loginStatus === 'Applicant' && <ApplicantNavbar />}
      {loginStatus === 'Recruiter' && <RecruiterNavbar />}
    </div>
  );
};

export default Navbar;
