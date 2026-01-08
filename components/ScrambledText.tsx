import React, { useEffect, useRef } from 'react';

export interface ScrambledTextProps {
  radius?: number;
  // duration is less relevant without GSAP tween, but we can keep it for API compatibility or unused
  duration?: number;
  // speed can control the scramble update rate
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: string; // Enforce string children for splitting
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  scrambleChars = 'CreativeTechStack',
  className = '',
  style = {},
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const originalChars = useRef<string[]>([]);
  const runningRef = useRef<boolean>(false);

  useEffect(() => {
    // Populate refs
    originalChars.current = children.split('');
  }, [children]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let params = {
      mouseX: -9999,
      mouseY: -9999
    };

    // Track mouse
    const handleMove = (e: PointerEvent) => {
      params.mouseX = e.clientX;
      params.mouseY = e.clientY;
      if (!runningRef.current) {
        startLoop();
      }
    };

    let animationFrameId: number;

    const startLoop = () => {
      runningRef.current = true;
      const loop = () => {
        let active = false;

        spansRef.current.forEach((span, i) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const dx = params.mouseX - centerX;
          const dy = params.mouseY - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            active = true;
            // Probability to scramble based on distance? 
            // Or just scramble constantly if near.
            // Let's scramble randomly if close.
            if (Math.random() < 0.3) {
              const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
              if (span.textContent !== randomChar) {
                span.textContent = randomChar;
              }
            }
          } else {
            // Reset to original
            const orig = originalChars.current[i];
            if (span.textContent !== orig) {
              span.textContent = orig;
            }
          }
        });

        if (active) {
          animationFrameId = requestAnimationFrame(loop);
        } else {
          runningRef.current = false;
        }
      };
      loop();
    };

    window.addEventListener('pointermove', handleMove);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(animationFrameId);
    };

  }, [radius, scrambleChars]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={style} aria-label={children}>
      <p aria-hidden="true">
        {children.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => { spansRef.current[i] = el; }}
            className="inline-block will-change-contents"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </p>
    </div>
  );
};

export default ScrambledText;