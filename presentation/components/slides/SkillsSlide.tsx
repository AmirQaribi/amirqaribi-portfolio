import React from 'react';
import { PortfolioContent } from '../../../core/domain/types';
import { DynamicIcon } from '../ui/DynamicIcon';

interface Props {
  isActive: boolean;
  data: PortfolioContent['skills'];
}

export const SkillsSlide: React.FC<Props> = ({ isActive, data }) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-8 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="mb-8 md:mb-12 text-center max-w-3xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{data.title}</h2>
        <p className="text-gray-400 text-md md:text-lg">{data.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl w-full">
        {data.categories.map((category, catIdx) => (
          <div 
            key={category.name}
            className={`
              p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl transition-all duration-500
              ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{ transitionDelay: `${100 + catIdx * 100}ms` }}
          >
            <h3 className="text-xl font-semibold mb-4 text-fluent-accent">{category.name}</h3>
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="flex items-start gap-4">
                  <DynamicIcon name={skill.icon} className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">{skill.name}</h4>
                    <p className="text-sm text-gray-400">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};