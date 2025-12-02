
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { IntroSlide } from './presentation/components/slides/IntroSlide';
import { IdentitySlide } from './presentation/components/slides/IdentitySlide';
import { SkillsSlide } from './presentation/components/slides/SkillsSlide';
import { ContactSlide } from './presentation/components/slides/ContactSlide';
import { Navigation } from './presentation/components/ui/Navigation';
import { BackgroundEffects } from './presentation/components/ui/BackgroundEffects';
import { content } from './core/domain/content';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SLIDE_COUNT = 4;

const getScreenSize = () => ({
  isArticleMode: window.innerWidth < 1280, // Combined Mobile and Tablet (up to iPad Pro portrait)
});

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isArticleMode, setisArticleMode] = useState(getScreenSize().isArticleMode);
  const [showGoToTop, setShowGoToTop] = useState(false);
  
  // Refs for scrolling on mobile/tablet
  const identityRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      // Debounce resize events
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = window.setTimeout(() => {
        setisArticleMode(getScreenSize().isArticleMode);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (!mainContainerRef.current) return;
    setShowGoToTop(mainContainerRef.current.scrollTop > 300);
  }, []);

  const scrollToTop = useCallback(() => {
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const changeSlide = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating || isArticleMode) return;
    
    setIsAnimating(true);
    setCurrentSlide(prev => {
      if (direction === 'next') return Math.min(prev + 1, SLIDE_COUNT - 1);
      return Math.max(prev - 1, 0);
    });

    setTimeout(() => setIsAnimating(false), 1000); 
  }, [isAnimating, isArticleMode]);
  
  const handleNext = useCallback(() => {
    if (!isArticleMode) {
      changeSlide('next');
    } else {
      // Smooth scroll to identity section on mobile/tablet
      requestAnimationFrame(() => {
        identityRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [isArticleMode, changeSlide]);
  
  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isArticleMode || isAnimating || isScrolling.current) {
      e.preventDefault();
      return;
    }

    // Ignore small movements (trackpad noise, etc.)
    if (Math.abs(e.deltaY) < 30) return;

    e.preventDefault();
    isScrolling.current = true;
    const direction = e.deltaY > 0 ? 'next' : 'prev';
    changeSlide(direction);

    // Re-enable after animation + small buffer
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = window.setTimeout(() => {
      isScrolling.current = false;
    }, 1100);
  }, [isArticleMode, isAnimating, changeSlide]);


  useEffect(() => {
    if (isArticleMode) {
      isScrolling.current = false;
      const container = mainContainerRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }
      return;
    }

    const wheelListener = (e: WheelEvent) => handleWheel(e);
    window.addEventListener('wheel', wheelListener, { passive: false });

    return () => {
      window.removeEventListener('wheel', wheelListener);
      isScrolling.current = false;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleWheel, handleScroll, isArticleMode]);

  // Touch handlers for Desktop Swipe (only active if not mobile/tablet mode)
  const touchStartY = useRef(0);
  
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isArticleMode) return;
    touchStartY.current = e.touches[0].clientY;
  }, [isArticleMode]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (isArticleMode) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    if (Math.abs(diff) > 50) {
      changeSlide(diff > 0 ? 'next' : 'prev');
    }
  }, [isArticleMode, changeSlide]);

  useEffect(() => {
    if (isArticleMode) return;
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
  }, [changeSlide, isArticleMode]);
  
  const animationTimeoutRef = useRef<number | null>(null);
  
  const goToSlide = useCallback((slideIndex: number) => {
    if (isAnimating || slideIndex === currentSlide || isArticleMode) return;
    setIsAnimating(true);
    setCurrentSlide(slideIndex);
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    animationTimeoutRef.current = window.setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating, currentSlide, isArticleMode]);

  // On mobile/tablet: h-screen + overflow-y-auto + scrollbar-hide creates a scrollable container 
  // that hides the browser scrollbar while allowing scroll.
  const mainContainerClasses = useMemo(() => `relative w-full bg-fluent-bg text-white font-sans selection:bg-fluent-accent selection:text-black h-screen ${
    !isArticleMode ? 'overflow-hidden' : 'overflow-y-auto scrollbar-hide'
  }`, [isArticleMode]);

  const slideTransformStyle = useMemo(() => ({
    transform: !isArticleMode ? `translateY(-${currentSlide * 100}vh)` : undefined
  }), [isArticleMode, currentSlide]);

  const showNavigation = useMemo(() => !isArticleMode, [isArticleMode]);
  const showChevron = useMemo(() => !isArticleMode && currentSlide < SLIDE_COUNT - 1, [isArticleMode, currentSlide]);

  return (
    <div 
      ref={mainContainerRef}
      className={mainContainerClasses}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <BackgroundEffects 
        activeSlide={currentSlide} 
        isArticleMode={isArticleMode} 
      />
      
      <main className={`relative z-10 w-full ${!isArticleMode ? 'h-full' : ''}`}>
        <div 
          className={`w-full ${!isArticleMode ? 'h-full transition-transform duration-1000 ease-in-out' : 'flex flex-col gap-y-32 pb-32'}`}
          style={slideTransformStyle}
        >
          {/* Intro Section */}
          <section className="w-full h-screen flex items-center justify-center p-4 relative shrink-0">
            <IntroSlide isActive={!isArticleMode ? currentSlide === 0 : true} onNext={handleNext} />
          </section>

          {/* Identity Section */}
          <section ref={identityRef} className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8 relative shrink-0">
            <IdentitySlide isActive={!isArticleMode ? currentSlide === 1 : true} data={content.identity} />
          </section>

          {/* Skills Section */}
          <section className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8 relative shrink-0">
            <SkillsSlide isActive={!isArticleMode ? currentSlide === 2 : true} data={content.skills} />
          </section>

          {/* Contact Section */}
          <section className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8 relative shrink-0">
            <ContactSlide isActive={!isArticleMode ? currentSlide === 3 : true} data={content.contact} />
          </section>
        </div>
      </main>

      {showNavigation && (
        <>
          <Navigation 
            totalSlides={SLIDE_COUNT} 
            currentSlide={currentSlide} 
            onSelect={goToSlide} 
          />
          {showChevron && (
            <div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => changeSlide('next')}
            >
              <ChevronDown size={32} />
            </div>
          )}
        </>
      )}

      {isArticleMode && showGoToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-20 bg-white/5 text-white border-white/10 p-3 rounded-full hover:opacity-80 transition-opacity shadow-lg flex items-center justify-center"
          aria-label="Go to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;
