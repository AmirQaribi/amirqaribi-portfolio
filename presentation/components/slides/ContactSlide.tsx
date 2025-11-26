
import React from 'react';
import { PortfolioContent } from '../../../core/domain/types';
import { DynamicIcon } from '../ui/DynamicIcon';

interface Props {
  isActive: boolean;
  data: PortfolioContent['contact'];
}

export const ContactSlide: React.FC<Props> = ({ isActive, data }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <div className="mb-8 md:mb-12 text-center max-w-3xl px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 cursor-default">{data.title}</h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg cursor-default">{data.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl w-full px-4 sm:px-0">
        {data.links.map((item, idx) => (
          <a
            key={item.type}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl 
              transition-all duration-500 hover:border-fluent-accent/50 hover:bg-white/10 
              hover:-translate-y-2 flex flex-col items-center text-center
              ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{ transitionDelay: `${100 + idx * 100}ms` }}
          >
            <div className="p-3 sm:p-4 bg-fluent-accent/10 rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <DynamicIcon name={item.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-fluent-accent" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-1 text-white cursor-default">{item.label}</h3>
            <p className="text-xs sm:text-sm text-gray-400 group-hover:text-fluent-accent transition-colors break-all cursor-default">
              {item.value}
            </p>
          </a>
        ))}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-center gap-6">
          {data.socials.map((social, idx) => (
             <a 
              key={social.type}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-gray-500 hover:text-white transition-all duration-300 hover:scale-110
                 ${isActive ? 'opacity-100' : 'opacity-0'}
              `}
              style={{ transitionDelay: `${300 + idx * 100}ms` }}
              aria-label={`Visit my ${social.type} profile`}
             >
              <DynamicIcon name={social.icon} className="w-6 h-6 sm:w-8 sm:h-8" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
