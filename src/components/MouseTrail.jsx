import React, { useEffect, useRef, useState } from 'react';

const TRAIL_LENGTH = 32; // 내부 lerp용
const VISIBLE_LENGTH = 12; // 실제로 보이는 최대 길이
const DELAY = 2; // 큐에서 몇 프레임마다 한 번씩 따라오게 할지 (크면 더 느림)

const MouseTrail = () => {
  const [trail, setTrail] = useState(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  );
  const mousePath = useRef([]); // 마우스가 이동한 경로 큐
  const frame = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePath.current.push({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let raf;
    const animate = () => {
      frame.current += 1;
      setTrail(prev => {
        const next = [...prev];
        // 큐에 좌표가 충분히 쌓였을 때만 따라감
        if (mousePath.current.length > 0 && frame.current % DELAY === 0) {
          // 맨 앞 점이 큐의 첫 좌표로 이동
          next[0] = mousePath.current.shift();
        }
        // 나머지는 앞 점을 따라감
        for (let i = 1; i < TRAIL_LENGTH; i++) {
          next[i] = {
            x: next[i].x + (next[i - 1].x - next[i].x) * 0.5,
            y: next[i].y + (next[i - 1].y - next[i].y) * 0.5,
          };
        }
        return next;
      });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => raf && cancelAnimationFrame(raf);
  }, []);

  // 마지막 N개만 보이게
  const visibleTrail = trail.slice(0, VISIBLE_LENGTH);
  const points = visibleTrail.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <polyline
        points={points}
        fill="none"
        stroke="rgba(30,40,80,0.18)" // 더 진하게
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: 'blur(2.5px)',
        }}
      />
      <polyline
        points={points}
        fill="none"
        stroke="rgba(30,40,80,0.09)" // 더 진하게
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: 'blur(8px)',
        }}
      />
    </svg>
  );
};

export default MouseTrail; 