import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-[var(--color-background)] pb-12">
      {/* Section 1 - Hero */}
      <section className="bg-white relative overflow-hidden">
        {/* Ashoka Chakra watermark mock */}
        <div className="absolute right-[-10%] top-0 opacity-5 pointer-events-none w-[50vw] h-[50vw]">
          <svg viewBox="0 0 100 100" fill="var(--color-primary)"><circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] mb-6 leading-tight">
            Shiksha Saathi — <br className="hidden md:block" />
            <span className="text-[var(--color-accent)]">Transforming How You Teach</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            A comprehensive professional development platform for every Indian teacher. Get personalized coaching in your language, right on your phone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">Register Now</Link>
            <Link to="/signin" className="btn-outline text-lg px-8 py-3 bg-white">Sign In</Link>
          </div>
        </div>
      </section>

      {/* Section 2 - Platform Features */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-primary)] mb-10">What Shiksha Saathi Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card border-t-4 border-[var(--color-primary)]">
            <h3 className="font-bold text-lg mb-2 text-[var(--color-primary)]">Personalized Coaching</h3>
            <p className="text-gray-600 text-sm mb-4">Content tailored exactly to your Grade, Subject, Language, and State. We provide specific, actionable insights that you can apply immediately in your classroom.</p>
          </div>
          <div className="card border-t-4 border-[var(--color-accent)]">
            <h3 className="font-bold text-lg mb-2 text-[var(--color-accent)]">Continuous Support</h3>
            <p className="text-gray-600 text-sm mb-4">Receive regular micro-tips sourced from NCERT guidelines. Keep improving your skills with consistent, bite-sized learning that fits into your busy schedule.</p>
          </div>
          <div className="card border-t-4 border-[var(--color-success)]">
            <h3 className="font-bold text-lg mb-2 text-green-700">Peer Learning Groups</h3>
            <p className="text-gray-600 text-sm mb-4">Connect with verified peers teaching the same subjects. Share insights, discuss classroom challenges, and learn what works for others in similar environments.</p>
          </div>
          <div className="card border-t-4 border-purple-600">
            <h3 className="font-bold text-lg mb-2 text-purple-700">Reflection & Growth</h3>
            <p className="text-gray-600 text-sm mb-4">Maintain a teaching journal to track your progress over time. Our AI helps auto-generate reflections based on your interactions and module completions.</p>
          </div>
        </div>
      </section>

      {/* Trust & Privacy */}
      <section className="bg-[var(--color-primary)] text-white py-16 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Built on Trust & Privacy</h2>
          <p className="mb-4">"Your individual classroom interactions are entirely private."</p>
          <p className="text-white/80">Only anonymized aggregate data is used to improve the system. Built specifically for the empowerment of Indian teachers.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
