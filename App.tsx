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

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isTablet;
};

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [introActive, setIntroActive] = useState(true);
  const touchStartY = useRef(0);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = !isMobile && !isTablet;
  const isMobileOrTablet = isMobile || isTablet;

  const changeSlide = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating || !isDesktop) return;
    
    setIsAnimating(true);
    setCurrentSlide(prev => {
      if (direction === 'next') return Math.min(prev + 1, SLIDE_COUNT - 1);
      return Math.max(prev - 1, 0);
    });

    setTimeout(() => setIsAnimating(false), 1000); // Debounce duration matching transition
  }, [isAnimating, isDesktop]);
  
  const handleNext = useCallback(() => {
    if (isDesktop) {
      changeSlide('next');
    } else {
      setIntroActive(false);
    }
  }, [isDesktop, changeSlide]);


  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (Math.abs(e.deltaY) > 25) {
      changeSlide(e.deltaY > 0 ? 'next' : 'prev');
    }
  }, [changeSlide]);
  
  useEffect(() => {
    if (!isDesktop) return;
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel, isDesktop]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isDesktop) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDesktop) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    
    if (Math.abs(diff) > 50) {
      changeSlide(diff > 0 ? 'next' : 'prev');
    }
  };

  useEffect(() => {
    if (!isDesktop) return;
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
  }, [changeSlide, isDesktop]);
  
  const goToSlide = (slideIndex: number) => {
    if (isAnimating || slideIndex === currentSlide || !isDesktop) return;
    setIsAnimating(true);
    setCurrentSlide(slideIndex);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const mainContainerClasses = `relative w-full bg-fluent-bg text-white font-sans selection:bg-fluent-accent selection:text-black ${
    isDesktop || (isMobileOrTablet && introActive) ? 'h-screen overflow-hidden' : ''
  }`;

  return (
    <div 
      className={mainContainerClasses}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <BackgroundEffects 
        activeSlide={isMobileOrTablet && !introActive ? -1 : currentSlide} 
        isArticleMode={isMobileOrTablet && !introActive} 
      />
      
      <main className={`relative z-10 w-full ${isDesktop ? 'h-full' : ''}`}>
        <div 
          className={`w-full ${isDesktop ? 'h-full transition-transform duration-1000 ease-in-out' : ''}`}
          style={isDesktop ? { transform: `translateY(-${currentSlide * 100}vh)` } : {}}
        >
          <div className={`w-full min-h-screen lg:h-screen flex items-center justify-center p-4 ${isMobileOrTablet && !introActive ? 'hidden' : ''}`}>
            <IntroSlide isActive={isDesktop ? currentSlide === 0 : true} onNext={handleNext} />
          </div>
          <div className={`w-full min-h-screen lg:h-screen flex items-center justify-center p-4 sm:p-8 ${isMobileOrTablet && introActive ? 'hidden' : ''}`}>
            <IdentitySlide isActive={isDesktop ? currentSlide === 1 : true} data={content.identity} />
          </div>
          <div className={`w-full min-h-screen lg:h-screen flex items-center justify-center p-4 sm:p-8 ${isMobileOrTablet && introActive ? 'hidden' : ''}`}>
            <SkillsSlide isActive={isDesktop ? currentSlide === 2 : true} data={content.skills} />
          </div>
          <div className={`w-full min-h-screen lg:h-screen flex items-center justify-center p-4 sm:p-8 ${isMobileOrTablet && introActive ? 'hidden' : ''}`}>
            <ContactSlide isActive={isDesktop ? currentSlide === 3 : true} data={content.contact} />
          </div>
        </div>
      </main>

      {isDesktop && (
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