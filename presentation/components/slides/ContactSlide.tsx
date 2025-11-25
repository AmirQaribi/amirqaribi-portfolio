import React from 'react';
import { PortfolioContent } from '../../../core/domain/types';
import { DynamicIcon } from '../ui/DynamicIcon';

interface Props {
  isActive: boolean;
  data: PortfolioContent['contact'];
}

export const ContactSlide: React.FC<Props> = ({ isActive, data }) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-8 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="mb-8 md:mb-12 text-center max-w-3xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{data.title}</h2>
        <p className="text-gray-400 text-md md:text-lg">{data.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl w-full">
        {data.links.map((item, idx) => (
          <a
            key={item.type}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl 
              transition-all duration-500 hover:border-fluent-accent/50 hover:bg-white/10 
              hover:-translate-y-2
              ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{ transitionDelay: `${100 + idx * 100}ms` }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-fluent-accent/10 rounded-full mb-4">
                <DynamicIcon name={item.icon} className="w-8 h-8 text-fluent-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-white">{item.label}</h3>
              <p className="text-sm text-gray-400 group-hover:text-fluent-accent transition-colors">
                {item.value}
              </p>
            </div>
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
              <DynamicIcon name={social.icon} className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};