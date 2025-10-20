import React, { useRef, useEffect, useState, useMemo, CSSProperties } from 'react';

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  radius?: number;
  className?: string;
  style?: CSSProperties;
}

const MagnetLines: React.FC<MagnetLinesProps> = ({
  rows = 15,
  columns: initialColumns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '2px',
  lineHeight = '16px',
  baseAngle = -10,
  radius = 300,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerMove = (pointer: { x: number; y: number }) => {
      const items = container.querySelectorAll<HTMLSpanElement>('span');
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        if (c < radius) {
          item.style.setProperty('--rotate', `${r}deg`);
        } else {
          item.style.setProperty('--rotate', `${baseAngle}deg`);
        }
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove({ x: e.x, y: e.y });
    };

    window.addEventListener('pointermove', handlePointerMove);

    const items = container.querySelectorAll<HTMLSpanElement>('span');
    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [baseAngle, radius]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setColumns(Math.floor(width / 20));
      }
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const spans = useMemo(() => {
    const total = rows * columns;
    return Array.from({ length: total }, (_, i) => (
      <span
        key={i}
        className="block origin-center"
        style={{
          backgroundColor: lineColor,
          width: lineWidth,
          height: lineHeight,
          //@ts-expect-error CSS custom property
          '--rotate': `${baseAngle}deg`,
          transform: 'rotate(var(--rotate))',
          willChange: 'transform'
        }}
      />
    ));
  }, [rows, columns, lineColor, lineWidth, lineHeight, baseAngle]);

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 20px)`,
        gridTemplateRows: `repeat(${rows}, 20px)`,
        width: '100%',
        height: '500px',
        ...style
      }}
    >
      {spans}
    </div>
  );
};

export default MagnetLines;