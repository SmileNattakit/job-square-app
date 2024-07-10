import React from 'react';

const Hero = () => (
  <section className="container mx-auto px-6 py-16 text-center">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
      Discover Your Career Path at{' '}
      <span className="text-blue-500">JobSquare</span>
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
      Connect with real employers, explore genuine opportunities, and take the
      next step in your professional journey.
    </p>
    <div className="flex justify-center mb-12">
      <input
        type="text"
        placeholder="Search for jobs..."
        className="w-1/2 px-4 py-2 rounded-l-lg border-2 border-blue-500 focus:outline-none"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-r-lg">
        Search
      </button>
    </div>
  </section>
);

export default Hero;
