
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface IntroSlideProps {
  isActive: boolean;
  onNext: () => void;
}

export const IntroSlide: React.FC<IntroSlideProps> = ({ isActive, onNext }) => {
  return (
    <div className={`w-full h-full flex flex-col gap-y-8 items-center justify-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <h1 className="text-4xl pb-5 sm:text-5xl md:text-6xl h-25 lg:text-7xl font-light leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 text-center animate-fade-in px-4 max-w-5xl cursor-default">
        Are you looking for Amir?
      </h1>
      
      <button 
        onClick={onNext}
        className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden transition-all hover:bg-white/10 hover:border-fluent-accent/50 hover:shadow-[0_0_20px_rgba(96,205,255,0.2)] animate-slide-up flex cursor-pointer"
      >
        <span className="relative z-10 flex items-center gap-3 font-medium tracking-wide text-base sm:text-lg">
          Yes, I am
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </div>
  );
};
