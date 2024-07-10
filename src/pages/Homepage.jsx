import Hero from '../components/Main/Hero/Hero';
import Features from '../components/Main/Features/Features';
import Testimonials from '../components/Main/Testimonials/Testimonials';

const Homepage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main>
        <Hero />
        <Features />
        <Testimonials />
      </main>
    </div>
  );
};

export default Homepage;
