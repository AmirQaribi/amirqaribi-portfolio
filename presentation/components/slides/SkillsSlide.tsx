
import React from 'react';
import { PortfolioContent } from '../../../core/domain/types';
import { DynamicIcon } from '../ui/DynamicIcon';

interface Props {
  isActive: boolean;
  data: PortfolioContent['skills'];
}

export const SkillsSlide: React.FC<Props> = ({ isActive, data }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <div className="mb-8 md:mb-12 text-center max-w-3xl px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 cursor-default">{data.title}</h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg cursor-default">{data.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl w-full">
        {data.categories.map((category, catIdx) => (
          <div 
            key={category.name}
            className={`
              p-5 sm:p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl transition-all duration-500
              hover:bg-white/10 hover:border-fluent-accent/40 hover:shadow-lg hover:shadow-fluent-accent/20 hover:-translate-y-2 cursor-default
              ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{ transitionDelay: `${100 + catIdx * 100}ms` }}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-fluent-accent cursor-default">{category.name}</h3>
            <div className="space-y-3 sm:space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="flex items-start gap-3 sm:gap-4 cursor-default">
                  <DynamicIcon name={skill.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-1 flex-shrink-0 cursor-default" />
                  <div className="cursor-default">
                    <h4 className="font-medium text-sm sm:text-base text-white cursor-default">{skill.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-400 leading-snug cursor-default">{skill.description}</p>
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
