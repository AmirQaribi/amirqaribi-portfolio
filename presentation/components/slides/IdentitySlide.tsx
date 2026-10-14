import React, { useState, useEffect, useRef, useId, memo, useCallback } from 'react';
import { IdentityContent } from '../../../core/domain/types';
import { Code, Cpu, Award, MapPin, Mail } from 'lucide-react';

interface Props {
  isActive: boolean;
  data: IdentityContent;
}

// Eye coordinates and skin tones match the two original 1024px portraits.
const PORTRAIT_EYES = [
  [
    { x: 435, y: 338, leftX: 406, leftY: 347, rightX: 466, rightY: 335, topY: 325, bottomY: 355, closedY: 352, shade: '#bc847b', skin: '#efbb99' },
    { x: 574, y: 329, leftX: 543, leftY: 330, rightX: 605, rightY: 335, topY: 313, bottomY: 344, closedY: 340, shade: '#b77c72', skin: '#cf917d' },
  ],
  [
    { x: 428, y: 332, leftX: 399, leftY: 342, rightX: 459, rightY: 330, topY: 316, bottomY: 349, closedY: 346, shade: '#bb8478', skin: '#ecb895' },
    { x: 566, y: 323, leftX: 535, leftY: 323, rightX: 596, rightY: 327, topY: 308, bottomY: 334, closedY: 331, shade: '#b77f72', skin: '#cc8d7a' },
  ],
];

const getEyeOpeningPath = (eye: typeof PORTRAIT_EYES[number][number], openness: number) => {
  // Keep both corners fixed while the upper and lower lids meet along the closing curve.
  const topY = eye.closedY + (eye.topY - eye.closedY) * openness;
  const bottomY = eye.closedY + (eye.bottomY - eye.closedY) * openness;
  return `M${eye.leftX} ${eye.leftY} Q${eye.x} ${topY} ${eye.rightX} ${eye.rightY} Q${eye.x} ${bottomY} ${eye.leftX} ${eye.leftY}Z`;
};

const IdentitySlideComponent: React.FC<Props> = ({ isActive, data }) => {
  const [hovered, setHovered] = useState(false);
  const portraitRef = useRef<HTMLDivElement>(null);
  const eyeId = useId();

  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait || !isActive) return;

    let frame = 0;
    let blinkFrame = 0;
    let blinkTimer = 0;
    let gazeOpenness = 1;
    let blinkAmount = 0;
    const eyes = PORTRAIT_EYES.flat();
    const eyePaths = portrait.querySelectorAll<SVGPathElement>('[data-eye-opening]');

    const updateEyelids = () => {
      // Combine the relaxed or happy expression with gaze and blink closure.
      eyePaths.forEach((path) => {
        const eyeIndex = Number(path.dataset.eyeOpening);
        const eye = eyes[eyeIndex];
        const moodOpenness = eyeIndex < 2 ? 0.88 : 1.12;
        path.setAttribute('d', getEyeOpeningPath(eye, (gazeOpenness + moodOpenness - 1) * (1 - blinkAmount)));
      });
    };

    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        const bounds = portrait.getBoundingClientRect();
        if (document.hidden || bounds.bottom <= 0 || bounds.top >= window.innerHeight) {
          scheduleBlink();
          return;
        }

        const started = performance.now();
        const animateBlink = (now: number) => {
          const elapsed = now - started;
          // Close in 70ms, pause briefly, then reopen more gently over 130ms.
          blinkAmount = elapsed < 70 ? elapsed / 70 : elapsed < 105 ? 1 : Math.max(0, 1 - (elapsed - 105) / 130);
          updateEyelids();
          if (elapsed < 235) {
            blinkFrame = requestAnimationFrame(animateBlink);
          } else {
            scheduleBlink();
          }
        };
        blinkFrame = requestAnimationFrame(animateBlink);
      }, 2000 + Math.random() * 1000);
    };

    const resetEyes = () => {
      cancelAnimationFrame(frame);
      portrait.style.removeProperty('--eye-x');
      portrait.style.removeProperty('--eye-y');
      gazeOpenness = 1;
      updateEyelids();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = portrait.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;

        // Measure the cursor from the eyes in proportion to the responsive portrait.
        const x = (event.clientX - bounds.left - bounds.width * 0.49) / (bounds.width * 0.75);
        const y = (event.clientY - bounds.top - bounds.height * 0.325) / (bounds.height * 0.75);
        // Keep the pupils inside a small ellipse, even when the cursor is far away.
        const distance = Math.max(1, Math.hypot(x, y));
        portrait.style.setProperty('--eye-x', `${(x / distance) * 12}px`);
        portrait.style.setProperty('--eye-y', `${(y / distance) * 6}px`);
        // Raise the upper lid when looking up and narrow the eye when looking down.
        gazeOpenness = 1 - (y / distance) * 0.35;
        updateEyelids();
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.documentElement.addEventListener('pointerleave', resetEyes);
    window.addEventListener('blur', resetEyes);
    scheduleBlink();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', resetEyes);
      window.removeEventListener('blur', resetEyes);
      window.clearTimeout(blinkTimer);
      cancelAnimationFrame(blinkFrame);
      blinkAmount = 0;
      resetEyes();
    };
  }, [isActive]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <div
      className={`w-full flex items-center justify-center transition-all duration-500 ${
        isActive
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">

        {/* Text Content */}
        <div className="space-y-6 order-2 lg:order-1 text-center lg:text-left">

          <div className="inline-block px-3 py-1 bg-fluent-accent/10 border border-fluent-accent/20 rounded-full text-fluent-accent text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 cursor-default">
            Profile
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight cursor-default">
            Hello,
            <br />
            {data.greeting}
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light cursor-default">
            {data.role}
            <br />
            {data.role2}
            <br />
            {data.role3}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed border-l-4 border-fluent-accent pl-4 mx-auto lg:mx-0 text-left max-w-prose cursor-default">
            {data.description}
          </p>

          {/* Professional Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4">
            {data.stats.map((stat, i) => (
              <div
                key={`${stat.label}-${i}`}
                className="
                  p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/10
                  backdrop-blur-sm text-center transition-all duration-300
                  hover:bg-white/10 hover:border-fluent-accent/40
                  hover:shadow-lg hover:shadow-fluent-accent/20
                  hover:-translate-y-1 cursor-default
                "
              >
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </div>

                <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Core Strengths */}
          <div className="pt-4 flex flex-col lg:items-start items-center">
            <h3 className="font-semibold text-base sm:text-lg mb-3 flex items-center gap-2 text-gray-200 cursor-default">
              <Award size={18} className="text-fluent-accent" />
              Core Strengths
            </h3>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {data.personalSkills.map((skill) => (
                <span
                  key={skill}
                  className="
                    px-3 py-1 text-xs sm:text-sm bg-white/5
                    border border-white/10 rounded-full text-gray-300 cursor-default
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs sm:text-sm text-gray-400 justify-center lg:justify-start">

            <div className="flex items-center gap-2 cursor-default">
              <MapPin size={16} className="text-gray-500" />
              {data.location}
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />

              <a
                href={`mailto:${data.email}`}
                className="hover:text-fluent-accent transition-colors"
              >
                {data.email}
              </a>
            </div>

          </div>
        </div>

        {/* Portrait */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div
            className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >

            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-br from-fluent-accent/20 to-purple-600/20 rounded-full animate-pulse-slow blur-xl" />

            {/* Image container */}
            <div className="select-none absolute inset-2 sm:inset-4 relative overflow-hidden rounded-full w-full h-full">
              {/* Move the character inside the fixed circular window. */}
              <div
                ref={portraitRef}
                data-hovered={hovered}
                className="portrait-motion absolute inset-0"
                style={{ animationPlayState: isActive ? 'running' : 'paused' }}
              >

              {/* Match each eye opening to its original 1024px portrait. */}
              {[
                {
                  src: data.imageUrl,
                  visible: !hovered,
                  eyes: PORTRAIT_EYES[0],
                },
                {
                  src: data.imageHoverUrl,
                  visible: hovered,
                  eyes: PORTRAIT_EYES[1],
                },
              ].map((portrait, portraitIndex) => (
                <div
                  key={portraitIndex}
                  className={`absolute inset-0 transition-opacity duration-200 ease-in-out ${portrait.visible ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img
                    src={portrait.src}
                    alt={portraitIndex === 0 ? 'Amir Qaribi — Enterprise Software Engineer' : ''}
                    aria-hidden={portraitIndex === 1 ? true : undefined}
                    onContextMenu={handleContextMenu}
                    onDragStart={handleDragStart}
                    className="select-none absolute inset-0 w-full h-full object-cover shadow-2xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)]"
                  />
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1024 1024" aria-hidden="true">
                    <defs>
                      {/* Blend the skin overlay into the original portrait around the lids. */}
                      <filter id={`${eyeId}-lid-soften-${portraitIndex}`}>
                        <feGaussianBlur stdDeviation="1.2" />
                      </filter>
                      <radialGradient id={`${eyeId}-iris-${portraitIndex}`} cx="50%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#171313" />
                        <stop offset="100%" stopColor="#3b3131" />
                      </radialGradient>
                      {portraitIndex === 0 && (
                        <clipPath id={`${eyeId}-mouth`}>
                          <ellipse cx="512" cy="455" rx="70" ry="34" />
                        </clipPath>
                      )}
                      {portrait.eyes.map((eye, eyeIndex) => (
                        <React.Fragment key={eyeIndex}>
                          <linearGradient id={`${eyeId}-lid-${portraitIndex}-${eyeIndex}`} gradientUnits="userSpaceOnUse" x1="0" y1={eye.y - 24} x2="0" y2={eye.y + 20}>
                            <stop offset="0%" stopColor={eye.skin} />
                            <stop offset="50%" stopColor={eye.shade} />
                            <stop offset="100%" stopColor={eye.skin} />
                          </linearGradient>
                          <clipPath id={`${eyeId}-eye-${portraitIndex}-${eyeIndex}`}>
                            <path data-eye-opening={portraitIndex * 2 + eyeIndex} d={getEyeOpeningPath(eye, portraitIndex === 0 ? 0.88 : 1.12)} />
                          </clipPath>
                        </React.Fragment>
                      ))}
                    </defs>
                    {portrait.eyes.map((eye, eyeIndex) => (
                      <g key={eyeIndex}>
                        {/* Cover the original bitmap eye so it stays hidden during a blink. */}
                        <path d={getEyeOpeningPath(eye, 1.8)} fill={`url(#${eyeId}-lid-${portraitIndex}-${eyeIndex})`} stroke={`url(#${eyeId}-lid-${portraitIndex}-${eyeIndex})`} strokeWidth="7" filter={`url(#${eyeId}-lid-soften-${portraitIndex})`} />
                        <g clipPath={`url(#${eyeId}-eye-${portraitIndex}-${eyeIndex})`}>
                          <rect x={eye.leftX} y={eye.y - 32} width={eye.rightX - eye.leftX} height="64" fill="#e9e4da" />
                          <g style={{ transform: 'translate(var(--eye-x, 0px), var(--eye-y, 0px))', transition: 'transform 100ms ease-out' }}>
                            <circle cx={eye.x} cy={eye.y} r="14" fill={`url(#${eyeId}-iris-${portraitIndex})`} stroke="#171313" strokeWidth="2" />
                            <circle cx={eye.x} cy={eye.y - 1} r="6" fill="#080909" />
                            <ellipse cx={eye.x - 4} cy={eye.y - 5} rx="2.5" ry="2" fill="#c4b4a5" opacity="0.65" />
                          </g>
                        </g>
                        <path data-eye-opening={portraitIndex * 2 + eyeIndex} d={getEyeOpeningPath(eye, portraitIndex === 0 ? 0.88 : 1.12)} fill="none" stroke="#171313" strokeWidth="2.5" strokeLinejoin="round" />
                      </g>
                    ))}
                    {portraitIndex === 0 && (
                      <g clipPath={`url(#${eyeId}-mouth)`}>
                        {/* Animate the original lip texture inside a fixed mouth area. */}
                        <g className="portrait-mouth" style={{ animationPlayState: isActive && !hovered ? 'running' : 'paused' }}>
                          <image href={data.imageUrl} width="1024" height="1024" />
                        </g>
                      </g>
                    )}
                  </svg>
                </div>
              ))}
              </div>

              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-full border-2 border-white/10 ring-1 ring-white/20 pointer-events-none" />
            </div>

            {/* Floating icons */}
            <div
              className="
                absolute -top-2 -right-2 sm:-top-4 sm:-right-4
                p-2 sm:p-3 bg-gray-900/80 backdrop-blur-md rounded-2xl
                border border-gray-700 shadow-xl animate-bounce cursor-default
              "
              aria-hidden="true"
            >
              <Code className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>

            <div
              className="
                absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4
                p-2 sm:p-3 bg-gray-900/80 backdrop-blur-md rounded-2xl
                border border-gray-700 shadow-xl animate-bounce
                [animation-delay:'0.2s'] cursor-default
              "
              aria-hidden="true"
            >
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export const IdentitySlide = memo(IdentitySlideComponent);
