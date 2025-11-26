
import React, { useState } from 'react';
import { IdentityContent } from '../../../core/domain/types';
import { Code, Cpu, Award, MapPin, Mail } from 'lucide-react';

interface Props {
  isActive: boolean;
  data: IdentityContent;
}

export const IdentitySlide: React.FC<Props> = ({ isActive, data }) => {
  const [hovered, setHovered] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className={`w-full flex items-center justify-center transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        
        {/* Text Content - Centered on mobile/tablet if needed, or left aligned */}
        <div className="space-y-6 order-2 lg:order-1 text-center lg:text-left">
          <div className="inline-block px-3 py-1 bg-fluent-accent/10 border border-fluent-accent/20 rounded-full text-fluent-accent text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2">
            Profile
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Hello,<br/>{data.greeting}
          </h2>
          <h3 className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light">
            {data.role}<br/>{data.role2}<br/>{data.role3}
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed border-l-4 border-fluent-accent pl-4 mx-auto lg:mx-0 text-left max-w-prose">
            {data.description}
          </p>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4">
            {data.stats.map((stat, i) => (
              <div key={i} className="p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col lg:items-start items-center">
            <h4 className="font-semibold text-base sm:text-lg mb-3 flex items-center gap-2 text-gray-200"><Award size={18} className="text-fluent-accent" /> Personal Skills</h4>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {data.personalSkills.map(skill => (
                <span key={skill} className="px-3 py-1 text-xs sm:text-sm bg-white/5 border border-white/10 rounded-full text-gray-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs sm:text-sm text-gray-400 justify-center lg:justify-start">
             <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                {data.location}
             </div>
             <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                {data.email}
             </div>
          </div>

        </div>

        {/* Visual - Portrait */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div
            className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-fluent-accent/20 to-purple-600/20 rounded-full animate-pulse-slow blur-xl" />
            
            {/* Image container */}
            <div className="select-none absolute inset-2 sm:inset-4 animate-float relative overflow-hidden rounded-full w-full h-full">
              {/* Base image (fades out on hover) */}
              <img
                src={data.imageUrl}
                alt="Amir Qaribi"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                className={`select-none absolute inset-0 w-full h-full object-cover rounded-full shadow-2xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] transition-opacity duration-200 ease-in-out ${
                  hovered ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {/* Hover image (base64) */}
              <img
                src={data.imageHoverUrl}
                alt="Amir hover"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                className={`select-none absolute inset-0 w-full h-full object-cover rounded-full shadow-2xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] transition-opacity duration-200 ease-in-out ${
                  hovered ? 'opacity-100' : 'opacity-0'
                }`}
              />

               {/* Inner shadow/highlight */}
              <div className="absolute inset-0 rounded-full border-2 border-white/10 ring-1 ring-white/20 pointer-events-none" />
            </div>
             
            {/* Floating Icons */}
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 p-2 sm:p-3 bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl animate-bounce">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 p-2 sm:p-3 bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl animate-bounce [animation-delay:'0.2s']">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
