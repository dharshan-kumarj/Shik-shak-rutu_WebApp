import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const LandingPage = () => {
  const { t } = useLanguage();

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
            <span className="text-[var(--color-accent)]">30 Days That Transform How You Teach</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Personalized coaching for every Indian teacher, in your language, on your phone — starting the moment your DIKSHA training ends.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">Register Now</Link>
            <Link to="/signin" className="btn-outline text-lg px-8 py-3 bg-white">Sign In</Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base font-medium text-gray-700 bg-gray-50 py-4 rounded-xl border border-gray-100">
            <span>🎓 9.7M Teachers Reached</span>
            <span>🇮🇳 28 States</span>
            <span>🗣️ 22 Languages</span>
            <span>🏆 EdTech Hackathon 2025</span>
          </div>
        </div>
      </section>

      {/* Section 2 - The Problem We Solve */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-primary)] mb-10">The Problem We Solve</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card border-l-4 border-[var(--color-primary)]">
            <div className="flex items-center gap-2 mb-2"><span className="text-red-500 font-bold">❌ Generic</span> <span className="text-gray-400">→</span> <span className="text-green-600 font-bold">✅ 6-Parameter Personalization</span></div>
            <p className="text-gray-600 text-sm">Tailored by Grade, Subject, Language, School Type, State, and specific Module.</p>
          </div>
          <div className="card border-l-4 border-[var(--color-primary)]">
            <div className="flex items-center gap-2 mb-2"><span className="text-red-500 font-bold">❌ One-Time</span> <span className="text-gray-400">→</span> <span className="text-green-600 font-bold">✅ 30-Day Continuous Coaching</span></div>
            <p className="text-gray-600 text-sm">Triggered the second your DIKSHA training ends for sustained impact.</p>
          </div>
          <div className="card border-l-4 border-[var(--color-primary)]">
            <div className="flex items-center gap-2 mb-2"><span className="text-red-500 font-bold">❌ Disconnected</span> <span className="text-gray-400">→</span> <span className="text-green-600 font-bold">✅ Context-Aware Check-ins</span></div>
            <p className="text-gray-600 text-sm">Check-in fires 2–3 hrs after the teacher's own class time for fresh reflections.</p>
          </div>
          <div className="card border-l-4 border-[var(--color-primary)]">
            <div className="flex items-center gap-2 mb-2"><span className="text-red-500 font-bold">❌ Abandoned Apps</span> <span className="text-gray-400">→</span> <span className="text-green-600 font-bold">✅ WhatsApp First</span></div>
            <p className="text-gray-600 text-sm">Zero install friction initially. Trust built over 3 days before app download.</p>
          </div>
        </div>
      </section>

      {/* Section 3 - The 30-Day Journey */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-primary)] mb-10">The 30-Day Journey</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-orange-100 text-[var(--color-accent)] font-bold rounded-full flex items-center justify-center">1</div>
              <div><h3 className="font-bold text-lg">Micro-Tip Delivered</h3><p className="text-gray-600">NCERT-sourced, voice + text, in the teacher's language.</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-orange-100 text-[var(--color-accent)] font-bold rounded-full flex items-center justify-center">3</div>
              <div><h3 className="font-bold text-lg">Class Check-In</h3><p className="text-gray-600">3 diagnostic questions about where students got lost.</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-orange-100 text-[var(--color-accent)] font-bold rounded-full flex items-center justify-center">7</div>
              <div><h3 className="font-bold text-lg">1-to-1 Verified Peer Match</h3><p className="text-gray-600">Connect with a peer of the same grade, subject, and state.</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-orange-100 text-[var(--color-accent)] font-bold rounded-full flex items-center justify-center">15</div>
              <div><h3 className="font-bold text-lg">Interactive Module</h3><p className="text-gray-600">Scenario-based learning only during free windows (7-8am, 1-2pm, 8-9pm).</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-orange-100 text-[var(--color-accent)] font-bold rounded-full flex items-center justify-center">30</div>
              <div><h3 className="font-bold text-lg">Exit + DIKSHA Sync</h3><p className="text-gray-600">CPD credit auto-generated, HM dashboard updated, next cycle begins.</p></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust & Privacy */}
      <section className="bg-[var(--color-primary)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Built on Trust & Privacy</h2>
          <p className="mb-4">"Your classroom struggles are NEVER visible to your HM, DEO, or SCERT."</p>
          <p className="text-white/80">Only anonymized aggregate data goes upward. In partnership with DIKSHA.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
