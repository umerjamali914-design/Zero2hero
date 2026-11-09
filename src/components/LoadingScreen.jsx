import React, { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--color-cream)' }}>
      {/* Animated star */}
      <div className="relative mb-8">
        <div
          className="text-6xl animate-float"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(255,150,45,0.4))' }}
        >
          ⭐
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-full animate-spin-slow"
            style={{
              border: '3px solid rgba(255,150,45,0.15)',
              borderTopColor: 'var(--color-orange)',
              animationDuration: '0.8s',
            }}
          />
        </div>
      </div>

      <h1 className="font-display text-3xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
        ZERO TO HERO
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--color-gray-text)' }}>
        Start From Zero. Become a Hero.
      </p>

      {/* Progress bar */}
      <div className="w-48 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(29,43,69,0.1)' }}>
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(90deg, var(--color-orange), var(--color-orange-light))',
          }}
        />
      </div>
      <p className="text-xs mt-3" style={{ color: 'var(--color-gray-soft)' }}>
        {Math.min(Math.floor(progress), 100)}%
      </p>
    </div>
  );
}
