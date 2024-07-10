import { useLocation } from 'react-router-dom';

const JobDetail = () => {
  const location = useLocation();
  const job = location.state?.job;

  if (!job) {
    return <div>ไม่พบข้อมูลงาน</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <div className="text-gray-600">{job.company[0].companyName}</div>
          </div>
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={job.companyLogo}
                alt={`${job.company[0].companyName} logo`}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">
            เงินเดือน: ฿{job.salary.toLocaleString()}/เดือน
          </p>
          <p className="text-gray-700">
            สถานที่: {job.location[0].district}, {job.location[0].province}
          </p>
          <p className="text-gray-700">ประกาศเมื่อ: {job.datePosted}</p>{' '}
        </div>

        {/* Tags */}
        <div className="mb-4">
          {job.tags.map((tag) => (
            <span key={tag} className="badge badge-outline mr-2">
              {tag}
            </span>
          ))}
        </div>

        {job.description && (
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">รายละเอียดงาน</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>
        )}

        <button className="btn btn-primary">สมัครงาน</button>
      </div>
    </div>
  );
};

export default JobDetail;
