import React from 'react';

const GovernmentHeader = () => {
  return (
    <div className="w-full">
      {/* Tricolor Strip */}
      <div className="tricolor-strip"></div>
      
      {/* Official Header */}
      <header className="official-header py-2 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mock Emblem */}
          <div className="w-8 h-10 bg-white/20 rounded flex items-center justify-center text-xs text-center leading-tight font-bold">
            Emblem
          </div>
          <div className="flex flex-col text-sm md:text-base">
            <span className="font-semibold tracking-wide">भारत सरकार | Government of India</span>
            <span className="text-white/80 text-xs md:text-sm">Ministry of Education | शिक्षा मंत्रालय</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs opacity-90">
          <span>A-</span>
          <span>A</span>
          <span>A+</span>
          <div className="w-px h-4 bg-white/30 mx-2"></div>
          <span>English</span>
        </div>
      </header>
    </div>
  );
};

export default GovernmentHeader;
