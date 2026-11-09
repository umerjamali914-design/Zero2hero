import React, { useEffect, useState, useMemo } from 'react'
import { sfx } from '../lib/audio.js'

const COLORS = ['#FF962D', '#FFAE2D', '#F5B400', '#8B5CF6', '#4A90D9', '#34A853', '#EA4335'];
const SHAPES = ['⭐', '🎉', '✨', '🌟', '🎊', '💫', '🏆'];

export default function Celebration({ data, onContinue }) {
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const confetti = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 1.5,
      color: COLORS[i % COLORS.length],
      shape: SHAPES[i % SHAPES.length],
      size: 12 + Math.random() * 16,
    }));
  }, []);

  useEffect(() => {
    sfx.levelUp();
    const t1 = setTimeout(() => setShowText(true), 400);
    const t2 = setTimeout(() => setShowButton(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{
        minHeight: '100dvh',
        background: 'linear-gradient(135deg, #FDF9E9 0%, #FDFBF5 50%, #EBF6F9 100%)',
      }}
    >
      {/* Confetti */}
      {confetti.map(c => (
        <div
          key={c.id}
          className="absolute"
          style={{
            left: `${c.left}%`,
            top: '-5%',
            fontSize: `${c.size}px`,
            color: c.color,
            animation: `confetti-fall ${c.duration}s ease-in ${c.delay}s forwards`,
          }}
        >
          {c.shape}
        </div>
      ))}

      {/* Big star */}
      <div
        className="text-8xl mb-6 animate-star-burst"
        style={{ filter: 'drop-shadow(0 8px 24px rgba(255,150,45,0.4))' }}
      >
        🏆
      </div>

      {/* Celebration text */}
      {showText && (
        <div className="text-center animate-pop-in">
          <h1 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--color-navy)' }}>
            Umer Jamali Beautiful
          </h1>
          <div className="flex gap-2 justify-center mb-4">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="text-3xl animate-star-burst"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                ⭐
              </span>
            ))}
          </div>
          <p className="text-lg mb-2" style={{ color: 'var(--color-orange)' }}>
            {data?.completedCount || 0} Levels Complete!
          </p>
          <p className="text-sm" style={{ color: 'var(--color-gray-text)' }}>
            Aap bohat acha kar rahe hain! Jari rakho!
          </p>
        </div>
      )}

      {/* Continue button */}
      {showButton && (
        <button
          onClick={() => { sfx.click(); onContinue(); }}
          className="mt-8 px-10 py-4 rounded-full text-white font-bold text-lg transition-transform active:scale-95 animate-glow"
          style={{
            background: 'linear-gradient(135deg, var(--color-orange-light), var(--color-orange))',
            boxShadow: '0 8px 24px rgba(255,150,45,0.3)',
          }}
        >
          Jari Rakho →
        </button>
      )}

      {/* Reward badges */}
      {showButton && (
        <div className="flex gap-3 mt-6">
          {['🎯', '📚', '⭐'].map((badge, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl animate-pop-in"
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '2px solid rgba(255,150,45,0.3)',
                animationDelay: `${0.2 + i * 0.1}s`,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
