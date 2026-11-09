import React from 'react'
import { getResumeLevel } from '../lib/storage.js'
import { allLevels } from '../data/curriculum.js'
import { sfx } from '../lib/audio.js'

export default function Home({ onStart, onSettings, onStages, state }) {
  const hasProgress = state.lastPlayedLevel || Object.keys(state.completedLevels).length > 0;
  const totalLevels = allLevels.length;
  const completedCount = Object.keys(state.completedLevels).length;
  const progress = totalLevels > 0 ? Math.round((completedCount / totalLevels) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ minHeight: '100dvh' }}>
      {/* Star icon */}
      <div className="text-7xl mb-4 animate-float" style={{ filter: 'drop-shadow(0 6px 16px rgba(255,150,45,0.3))' }}>
        ⭐
      </div>

      {/* Title */}
      <h1 className="font-display text-4xl font-bold text-center mb-2" style={{ color: 'var(--color-navy)', letterSpacing: '-0.02em' }}>
        Zero to Hero
      </h1>
      <p className="text-center text-sm mb-1" style={{ color: 'var(--color-gray-text)' }}>
        Parhna aur likhna — bilkul shuru se
      </p>
      <p className="text-center text-xs mb-8" style={{ color: 'var(--color-gray-soft)' }}>
        Start From Zero. Become a Hero.
      </p>

      {/* Start button */}
      <button
        onClick={() => { sfx.click(); onStart(); }}
        className="px-10 py-4 rounded-full text-white font-bold text-lg flex items-center gap-2 transition-transform active:scale-95 animate-glow"
        style={{
          background: 'linear-gradient(135deg, var(--color-orange-light), var(--color-orange))',
          boxShadow: '0 8px 24px rgba(255,150,45,0.3)',
        }}
      >
        {hasProgress ? 'Jari Rakho →' : 'Shuru Karein →'}
      </button>

      {/* Audio prompt */}
      <p className="text-xs mt-4 flex items-center gap-1.5" style={{ color: 'var(--color-gray-soft)' }}>
        <span className="text-base">🔊</span>
        Awaaz on karein
      </p>

      {/* Progress indicator */}
      {hasProgress && (
        <div className="mt-8 w-full max-w-xs">
          <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--color-gray-text)' }}>
            <span> Taraagy: {state.totalStars || 0} ⭐</span>
            <span>XP: {state.xp || 0}</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(29,43,69,0.08)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, var(--color-orange), var(--color-orange-light))',
              }}
            />
          </div>
          <p className="text-center text-xs mt-2" style={{ color: 'var(--color-gray-soft)' }}>
            {completedCount} / {totalLevels} levels complete
          </p>
        </div>
      )}

      {/* Bottom buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => { sfx.click(); onStages(); }}
          className="px-5 py-2 rounded-full text-sm font-semibold transition-transform active:scale-95"
          style={{
            background: 'rgba(29,43,69,0.06)',
            color: 'var(--color-navy)',
          }}
        >
          📚 All Levels
        </button>
        <button
          onClick={() => { sfx.click(); onSettings(); }}
          className="px-5 py-2 rounded-full text-sm font-semibold transition-transform active:scale-95"
          style={{
            background: 'rgba(29,43,69,0.06)',
            color: 'var(--color-navy)',
          }}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Creator credit */}
      <p className="text-xs mt-10" style={{ color: 'var(--color-gray-soft)' }}>
        Created by Umer Jamali
      </p>
    </div>
  );
}
