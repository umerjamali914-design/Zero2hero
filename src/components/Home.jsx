import React from 'react'
import { getResumeLevel } from '../lib/storage.js'
import { allLevels, stages } from '../data/curriculum.js'
import { sfx } from '../lib/audio.js'

export default function Home({ onStart, onSettings, onStages, state }) {
  const hasProgress = state.lastPlayedLevel || Object.keys(state.completedLevels).length > 0;
  const totalLevels = allLevels.length;
  const completedCount = Object.keys(state.completedLevels).length;
  const progress = totalLevels > 0 ? Math.round((completedCount / totalLevels) * 100) : 0;
  const totalStars = state.totalStars || 0;
  const examsPassed = Object.entries(state.completedLevels || {}).filter(([id, _]) => {
    const lvl = allLevels.find(l => l.id == id);
    return lvl && lvl.mode === 'exam';
  }).length;

  return (
    <div className="min-h-screen px-4 py-5" style={{ minHeight: '100dvh', maxWidth: '30rem', margin: '0 auto' }}>
      {/* Top bar */}
      <header className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-display text-lg font-bold"
            style={{ background: 'var(--color-orange)', color: '#1a1d29' }}>Z</div>
          <div>
            <p className="font-display text-sm font-bold leading-none" style={{ color: 'var(--color-navy)' }}>ZERO TO HERO</p>
            <p className="text-xs leading-none mt-0.5" style={{ color: 'var(--color-gray-soft)' }}>ROMAN URDU</p>
          </div>
        </div>
        <button
          onClick={() => { sfx.click(); onSettings(); }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-base"
          style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
        >⚙️</button>
      </header>

      {/* Hero card */}
      <div
        className="p-5 rounded-2xl mb-5 animate-slide-up"
        style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
      >
        <h1 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
          Aaj pehla harf seekhein
        </h1>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-gray-text)' }}>
          Type karna, padhna aur Roman Urdu bolna — sab kuch asaan chhote chhote steps mein.
        </p>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => { sfx.click(); onStart(); }}
            className="px-6 py-3 rounded-full font-bold text-sm transition-transform active:scale-95"
            style={{ background: 'var(--color-orange)', color: '#1a1d29' }}
          >
            {hasProgress ? 'Jari Rakho' : 'Start Learning'}
          </button>
          <button
            onClick={() => { sfx.click(); onStages(); }}
            className="px-5 py-3 rounded-full font-semibold text-sm transition-transform active:scale-95"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-gray-text)' }}
          >
            Journey
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: `conic-gradient(var(--color-orange) ${progress * 3.6}deg, var(--color-border) 0deg)`,
            }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--color-card)' }}>
              <span className="text-xs font-bold" style={{ color: 'var(--color-orange)' }}>{progress}%</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-gray-soft)' }}>{progress}% complete</p>
            <p className="text-xs" style={{ color: 'var(--color-gray-text)' }}>{completedCount} / {totalLevels} Levels</p>
          </div>
        </div>

        <p className="text-xs mt-3" style={{ color: 'var(--color-gray-soft)' }}>Created by Umer Jamali</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <StatCard icon="✅" label="Levels Done" value={completedCount} />
        <StatCard icon="⭐" label="Stars" value={`${totalStars}`} />
        <StatCard icon="🔥" label="Exams Passed" value={examsPassed} />
      </div>

      {/* Stages heading */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--color-gray-text)' }}>Your 12 stages</h2>
        <button onClick={() => { sfx.click(); onStages(); }} className="text-xs underline" style={{ color: 'var(--color-orange)' }}>See all</button>
      </div>

      {/* Stage grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {stages.map(stage => {
          const stageLevels = allLevels.filter(l => l.stage === stage.id);
          const completedInStage = stageLevels.filter(l => state.completedLevels[l.id]).length;
          const stageIcons = ['⌨️','🔤','🔊','🎵','🔗','🧩','📚','🅰️','✂️','💬','✨','📖'];
          return (
            <button
              key={stage.id}
              onClick={() => { sfx.click(); onStages(); }}
              className="p-3.5 rounded-2xl text-left transition-transform active:scale-95"
              style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
            >
              <div className="text-2xl mb-1.5">{stageIcons[stage.id - 1]}</div>
              <p className="text-xs font-bold mb-0.5" style={{ color: 'var(--color-gray-soft)' }}>STAGE {stage.id}</p>
              <h3 className="font-display text-sm font-bold mb-1 leading-tight" style={{ color: 'var(--color-navy)' }}>{stage.name}</h3>
              <p className="text-xs mb-2 leading-tight" style={{ color: 'var(--color-gray-text)' }}>{stage.tagline}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
                  <div className="h-full rounded-full" style={{
                    width: `${stageLevels.length > 0 ? (completedInStage / stageLevels.length) * 100 : 0}%`,
                    background: 'var(--color-orange)',
                  }} />
                </div>
                <span className="text-xs font-mono" style={{ color: 'var(--color-gray-soft)' }}>{completedInStage}/{stageLevels.length}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="h-12" />
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="p-3 rounded-2xl text-center" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
      <div className="text-xl mb-1">{icon}</div>
      <p className="font-display text-lg font-bold" style={{ color: 'var(--color-navy)' }}>{value}</p>
      <p className="text-xs" style={{ color: 'var(--color-gray-soft)' }}>{label}</p>
    </div>
  );
}
