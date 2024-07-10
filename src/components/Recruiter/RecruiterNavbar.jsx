import { Link, useLocation, useNavigate } from 'react-router-dom';

const RecruiterNavbar = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-md">
        <div className="navbar-start">
          <Link to="/">
            <div className="btn btn-ghost">
              <span>JOB SQUARE</span>
            </div>
          </Link>
        </div>

        <div className="navbar-end gap-4"></div>
      </div>
    </>
  );
};

export default RecruiterNavbar;
