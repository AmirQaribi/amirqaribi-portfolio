import React, { memo, useCallback, useMemo } from 'react';

interface NavigationProps {
  totalSlides: number;
  currentSlide: number;
  onSelect: (index: number) => void;
}

const NavigationComponent: React.FC<NavigationProps> = ({ totalSlides, currentSlide, onSelect }) => {
  const navigationButtons = useMemo(
    () => Array.from({ length: totalSlides }).map((_, idx) => ({ idx })),
    [totalSlides]
  );

  const NavigationButton = useCallback(({ idx }: { idx: number }) => {
    const isActive = currentSlide === idx;
    const handleClick = () => onSelect(idx);
    
    return (
      <button
        key={idx}
        onClick={handleClick}
        className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/20 hover:scale-125 hover:bg-fluent-accent ${
          isActive ? 'bg-fluent-accent scale-125 shadow-[0_0_10px_rgba(96,205,255,0.5)]' : 'bg-white/10'
        }`}
        aria-label={`Go to slide ${idx + 1}`}
      />
    );
  }, [currentSlide, onSelect]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
      {navigationButtons.map((button) => (
        <NavigationButton key={button.idx} idx={button.idx} />
      ))}
    </div>
  );
};

export const Navigation = memo(NavigationComponent);