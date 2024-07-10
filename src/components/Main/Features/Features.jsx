import React from 'react';
import FeatureCard from './FeatureCard';
import { FaSearch, FaBriefcase, FaUsers } from 'react-icons/fa';

const Features = () => (
  <div className="flex flex-wrap justify-center gap-8">
    <FeatureCard
      icon={<FaSearch />}
      title="Easy Job Search"
      description="Find relevant job listings quickly and easily."
    />
    <FeatureCard
      icon={<FaBriefcase />}
      title="Career Growth"
      description="Discover opportunities that align with your career goals."
    />
    <FeatureCard
      icon={<FaUsers />}
      title="Network"
      description="Connect with employers and professionals in your field."
    />
  </div>
);

export default Features;
