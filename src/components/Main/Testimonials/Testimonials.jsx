import TestimonialCard from './TestimonialCard';

const Testimonials = () => (
  <section className="bg-blue-500 text-white py-16 mt-10">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold mb-8">
        Join Thousands of Satisfied Job Seekers
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        <TestimonialCard
          name="John Doe"
          role="Software Developer"
          quote="JobSquare helped me find my dream job in just two weeks!"
        />
        <TestimonialCard
          name="Jane Smith"
          role="Marketing Specialist"
          quote="The platform's user-friendly interface made job hunting a breeze."
        />
      </div>
    </div>
  </section>
);

export default Testimonials;
