
import React, { memo, useMemo } from 'react';

interface BackgroundEffectsProps {
  activeSlide: number;
  isMobile: boolean;
}

const BackgroundEffectsComponent: React.FC<BackgroundEffectsProps> = ({ activeSlide, isMobile }) => {
  // Memoize gradient colors to prevent recalculation
  const orbColors = useMemo(() => ({
    top: {
      0: 'bg-blue-900',
      1: 'bg-purple-900',
      2: 'bg-cyan-900',
      3: 'bg-emerald-900',
    },
    bottom: {
      0: 'bg-gray-800',
      1: 'bg-blue-800',
      2: 'bg-indigo-900',
      3: 'bg-teal-800',
    },
  }), []);

  const topOrbClass = useMemo(() => {
    if (isMobile) return 'bg-purple-900 translate-x-0 translate-y-0 opacity-30 w-[80vw] h-[80vw]';
    const baseClass = 'transition-all duration-1000 opacity-40';
    const colorClass = orbColors.top[activeSlide as keyof typeof orbColors.top] || 'bg-blue-900';
    const positionClass = activeSlide === 0 ? 'translate-x-0 translate-y-0'
      : activeSlide === 1 ? 'translate-x-20 translate-y-20'
      : activeSlide === 2 ? 'translate-x-10 translate-y-40'
      : 'translate-x-30 translate-y-10';
    return `${baseClass} ${colorClass} ${positionClass}`;
  }, [activeSlide, isMobile, orbColors]);

  const bottomOrbClass = useMemo(() => {
    if (isMobile) return 'bg-cyan-800 scale-100 opacity-30 w-[90vw] h-[90vw]';
    const baseClass = 'transition-all duration-1000 opacity-30';
    const colorClass = orbColors.bottom[activeSlide as keyof typeof orbColors.bottom] || 'bg-gray-800';
    const scaleClass = activeSlide === 0 ? 'scale-100'
      : activeSlide === 1 ? 'scale-125'
      : activeSlide === 2 ? 'scale-100'
      : 'scale-110';
    return `${baseClass} ${colorClass} ${scaleClass}`;
  }, [activeSlide, isMobile, orbColors]);

  const noiseSvg = useMemo(() => `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-1000 ease-in-out">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: noiseSvg }}>
      </div>

      {/* Dynamic Orbs - Position changes based on slide (Desktop) or static cool config for Mobile */}
      <div className={`absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[100px] ${topOrbClass}`} />

      <div className={`absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] ${bottomOrbClass}`} />
      
      {/* Grid Overlay for Tech Feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] opacity-20" />
    </div>
  );
};

export const BackgroundEffects = memo(BackgroundEffectsComponent);
