import React from 'react';

const GovernmentFooter = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-6 px-4 text-center text-sm text-gray-600 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        <p className="font-medium text-[var(--color-primary)]">
          Shiksha Saathi | Powered by DIKSHA | Ministry of Education, Govt. of India
        </p>
        <p className="text-xs">
          © 2025 | National Hackathon 2025 — EdTech Track
        </p>
        <div className="flex justify-center gap-4 mt-2 text-xs text-[var(--color-primary)]">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Help & Support</a>
        </div>
      </div>
    </footer>
  );
};

export default GovernmentFooter;
