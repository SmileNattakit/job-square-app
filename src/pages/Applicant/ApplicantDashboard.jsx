import SearchField from '../../components/Applicant/SearchField';
import JobListing from '../../components/Applicant/JobListing';

const ApplicantDashboard = () => {
  return (
    <div className=" bg-base-200">
      <SearchField />
      <JobListing />
    </div>
  );
};

export default ApplicantDashboard;
