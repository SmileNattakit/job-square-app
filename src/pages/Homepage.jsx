const Homepage = () => {
  return (
    <div>
      <section className="bg-gray-100 h-[90vh] flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-500 mb-4">
            Discover your career
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-500 mb-8">
            path at&nbsp;
            <span className="text-blue-500">Job Square</span>&nbsp;
          </h1>
          <p className="text-gray-800 text-xl lg:text-2xl mb-8">
            Our intuitive platform connects you directly with real employers and
            genuine opportunities, making your job search simple and effective.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
            onClick={() => navigate('/register')}
          >
            Create an account now
          </button>
          <div className="mt-12">
            <p>image</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
