import React from 'react';
import { ArrowRight } from 'lucide-react';

interface IntroSlideProps {
  isActive: boolean;
  onNext: () => void;
}

export const IntroSlide: React.FC<IntroSlideProps> = ({ isActive, onNext }) => {
  return (
    <div className={`w-full h-full flex flex-col gap-y-4 items-center justify-center ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light leading-30 text-transparent bg-clip-text bg-gradient-to-r h-20 lg:h-24 from-white via-gray-200 to-gray-500 text-center animate-fade-in">
        Are you looking for Amir?
      </h1>
      
      <button 
        onClick={onNext}
        className="group relative px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden transition-all hover:bg-white/10 hover:border-fluent-accent/50 hover:shadow-[0_0_20px_rgba(96,205,255,0.2)] animate-slide-up flex"
      >
        <span className="relative z-10 flex items-center gap-2 font-medium tracking-wide">
          Yes, I am
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </button>

      <p className="absolute bottom-12 text-sm text-gray-500 animate-pulse-slow">
        Click to discover
      </p>
    </div>
  );
};