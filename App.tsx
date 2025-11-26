
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { IntroSlide } from './presentation/components/slides/IntroSlide';
import { IdentitySlide } from './presentation/components/slides/IdentitySlide';
import { SkillsSlide } from './presentation/components/slides/SkillsSlide';
import { ContactSlide } from './presentation/components/slides/ContactSlide';
import { Navigation } from './presentation/components/ui/Navigation';
import { BackgroundEffects } from './presentation/components/ui/BackgroundEffects';
import { content } from './core/domain/content';
import { ChevronDown } from 'lucide-react';

const SLIDE_COUNT = 4;

const getScreenSize = () => ({
  isMobile: window.innerWidth < 1024, // Combined Mobile and Tablet (up to iPad Pro portrait)
});

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [{ isMobile }, setScreenSize] = useState(getScreenSize());
  
  // Refs for scrolling on mobile/tablet
  const identityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const changeSlide = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating || isMobile) return;
    
    setIsAnimating(true);
    setCurrentSlide(prev => {
      if (direction === 'next') return Math.min(prev + 1, SLIDE_COUNT - 1);
      return Math.max(prev - 1, 0);
    });

    setTimeout(() => setIsAnimating(false), 1000); 
  }, [isAnimating, isMobile]);
  
  const handleNext = useCallback(() => {
    if (!isMobile) {
      changeSlide('next');
    } else {
      // Smooth scroll to identity section on mobile/tablet
      // Using a small timeout to ensure layout is stable if needed, but usually direct call works
      identityRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isMobile, changeSlide]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isMobile) return; 
    e.preventDefault();
    if (Math.abs(e.deltaY) > 25) {
      changeSlide(e.deltaY > 0 ? 'next' : 'prev');
    }
  }, [changeSlide, isMobile]);
  
  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel, isMobile]);

  // Touch handlers for Desktop Swipe (only active if not mobile/tablet mode)
  const touchStartY = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isMobile) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    if (Math.abs(diff) > 50) {
      changeSlide(diff > 0 ? 'next' : 'prev');
    }
  };

  useEffect(() => {
    if (isMobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        changeSlide('next');
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        changeSlide('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeSlide, isMobile]);
  
  const goToSlide = (slideIndex: number) => {
    if (isAnimating || slideIndex === currentSlide || isMobile) return;
    setIsAnimating(true);
    setCurrentSlide(slideIndex);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // On mobile/tablet: h-screen + overflow-y-auto + scrollbar-hide creates a scrollable container 
  // that hides the browser scrollbar while allowing scroll.
  const mainContainerClasses = `relative w-full bg-fluent-bg text-white font-sans selection:bg-fluent-accent selection:text-black h-screen ${
    !isMobile ? 'overflow-hidden' : 'overflow-y-auto scrollbar-hide'
  }`;

  return (
    <div 
      className={mainContainerClasses}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <BackgroundEffects 
        activeSlide={currentSlide} 
        isMobile={isMobile} 
      />
      
      <main className={`relative z-10 w-full ${!isMobile ? 'h-full' : ''}`}>
        <div 
          className={`w-full ${!isMobile ? 'h-full transition-transform duration-1000 ease-in-out' : 'flex flex-col gap-y-32 pb-32'}`}
          style={!isMobile ? { transform: `translateY(-${currentSlide * 100}vh)` } : {}}
        >
          {/* Intro Section */}
          <section className="w-full h-screen flex items-center justify-center p-4 relative shrink-0">
            <IntroSlide isActive={!isMobile ? currentSlide === 0 : true} onNext={handleNext} />
          </section>

          {/* Identity Section */}
          <section ref={identityRef} className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8 relative shrink-0">
            <IdentitySlide isActive={!isMobile ? currentSlide === 1 : true} data={content.identity} />
          </section>

          {/* Skills Section */}
          <section className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8 relative shrink-0">
            <SkillsSlide isActive={!isMobile ? currentSlide === 2 : true} data={content.skills} />
          </section>

          {/* Contact Section */}
          <section className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8 relative shrink-0">
            <ContactSlide isActive={!isMobile ? currentSlide === 3 : true} data={content.contact} />
          </section>
        </div>
      </main>

      {!isMobile && (
        <>
          <Navigation 
            totalSlides={SLIDE_COUNT} 
            currentSlide={currentSlide} 
            onSelect={goToSlide} 
          />
          {currentSlide < SLIDE_COUNT - 1 && (
            <div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => changeSlide('next')}
            >
              <ChevronDown size={32} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
