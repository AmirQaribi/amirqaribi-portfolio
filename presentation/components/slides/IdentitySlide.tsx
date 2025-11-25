import React from 'react';
import { IdentityContent } from '../../../core/domain/types';
import { Code, Cpu, Award, MapPin, Mail } from 'lucide-react';

interface Props {
  isActive: boolean;
  data: IdentityContent;
}

export const IdentitySlide: React.FC<Props> = ({ isActive, data }) => {
  return (
    <div className={`w-full h-full flex items-center justify-center lg:p-8 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="space-y-6 order-2 lg:order-1">
          <div className="inline-block px-3 py-1 bg-fluent-accent/10 border border-fluent-accent/20 rounded-full text-fluent-accent text-sm font-semibold tracking-wider uppercase mb-2">
            Profile
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Hello,<br/>{data.greeting}
          </h2>
          <h3 className="text-xl text-gray-400 font-light">
            {data.role}<br/>{data.role2}<br/>{data.role3}
          </h3>
          <p className="text-md text-gray-300 leading-relaxed border-l-4 border-fluent-accent pl-4">
            {data.description}
          </p>
          
          <div className="grid grid-cols-3 gap-4 pt-4">
            {data.stats.map((stat, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-gray-200"><Award size={18} className="text-fluent-accent" /> Personal Skills</h4>
            <div className="flex flex-wrap gap-2">
              {data.personalSkills.map(skill => (
                <span key={skill} className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-sm text-gray-400">
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
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-fluent-accent/20 to-purple-600/20 rounded-full animate-pulse-slow blur-xl" />
            
            {/* Image container */}
            <div className="absolute inset-4 animate-float">
              <img 
                src={data.imageUrl} 
                alt="Amir Qaribi" 
                className="w-full h-full object-cover rounded-full shadow-2xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)]"
              />
               {/* Inner shadow/highlight */}
              <div className="absolute inset-0 rounded-full border-2 border-white/10 ring-1 ring-white/20 pointer-events-none" />
            </div>
             
            {/* Floating Icons */}
            <div className="absolute -top-4 -right-4 p-3 sm:p-4 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl animate-bounce">
                {/* FIX: Replaced invalid `sm:size` prop with responsive Tailwind classes `w-6 h-6 sm:w-8 sm:h-8` for consistent styling. */}
                <Code className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
            <div className="absolute -bottom-4 -left-4 p-3 sm:p-4 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl animate-bounce [animation-delay:'0.2s']">
                {/* FIX: Replaced invalid `sm:size` prop with responsive Tailwind classes `w-6 h-6 sm:w-8 sm:h-8` for consistent styling. */}
                <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};