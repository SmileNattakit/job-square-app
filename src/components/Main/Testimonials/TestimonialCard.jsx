import React from 'react';

const TestimonialCard = ({ name, role, quote }) => (
  <div className="bg-white text-gray-800 rounded-lg shadow-md p-6 w-80">
    <p className="italic mb-4">"{quote}"</p>
    <p className="font-bold">{name}</p>
    <p className="text-sm text-gray-600">{role}</p>
  </div>
);

export default TestimonialCard;
