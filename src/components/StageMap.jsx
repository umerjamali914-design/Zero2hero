import React, { useState } from 'react'
import { stages, allLevels } from '../data/curriculum.js'
import { getState, isLevelUnlocked, getLevelResult } from '../lib/storage.js'
import { sfx } from '../lib/audio.js'

const STAGE_ICONS = ['⌨️','🔤','🔊','🎵','🔗','🧩','📚','🅰️','✂️','💬','✨','📖'];

function StarRow({ count }) {
  return (
    <span className="text-xs">
      {[1, 2, 3].map(i => (
        <span key={i} style={{ color: i <= count ? 'var(--color-gold)' : 'rgba(255,255,255,0.15)' }}>★</span>
      ))}
    </span>
  );
}

function LevelNode({ level, unlocked, result, onClick }) {
  const isExam = level.mode === 'exam';
  const isLong = level.long;
  const isCompleted = !!result;

  return (
    <button
      onClick={unlocked ? () => { sfx.click(); onClick(level.id); } : undefined}
      disabled={!unlocked}
      className={`
        aspect-square flex flex-col items-center justify-center rounded-xl
        transition-transform active:scale-95
        ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}
      `}
      style={{
        background: isCompleted
          ? 'rgba(255,204,102,0.1)'
          : unlocked
            ? 'var(--color-card-hover)'
            : 'rgba(255,255,255,0.02)',
        border: isExam && unlocked
          ? '2px solid var(--color-orange)'
          : unlocked
            ? '1px solid var(--color-border)'
            : '1px solid var(--color-border-light)',
      }}
    >
      {unlocked ? (
        <>
          <span className="font-display text-sm font-bold" style={{ color: isExam ? 'var(--color-orange)' : 'var(--color-navy)' }}>
            {isExam ? '📝' : isLong ? '📖' : level.id}
          </span>
          {isCompleted && <StarRow count={result.stars || 0} />}
          {!isCompleted && unlocked && (
            <span className="text-xs mt-0.5" style={{ color: 'var(--color-gray-soft)' }}>
              {isExam ? 'Exam' : 'Play'}
            </span>
          )}
        </>
      ) : (
        <span className="text-base" style={{ opacity: 0.5 }}>🔒</span>
      )}
    </button>
  );
}

export default function StageMap({ onBack, onSelectLevel, onSettings }) {
  const state = getState();
  const [expandedStage, setExpandedStage] = useState(null);

  const toggleStage = (stageId) => {
    sfx.click();
    setExpandedStage(expandedStage === stageId ? null : stageId);
  };

  return (
    <div className="min-h-screen px-4 py-5" style={{ minHeight: '100dvh', maxWidth: '30rem', margin: '0 auto' }}>
      {/* Header */}
      <header className="flex items-center justify-between mb-5">
        <button
          onClick={() => { sfx.click(); onBack(); }}
          className="px-4 py-2 rounded-full text-sm font-semibold transition-transform active:scale-95"
          style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-navy)' }}
        >
          ← Wapas
        </button>
        <h1 className="font-display text-lg font-bold uppercase tracking-wide" style={{ color: 'var(--color-navy)' }}>
          Journey
        </h1>
        <button
          onClick={() => { sfx.click(); onSettings(); }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-base"
          style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
        >⚙️</button>
      </header>

      {/* Stages */}
      {stages.map(stage => {
        const stageLevels = allLevels.filter(l => l.stage === stage.id);
        const completedInStage = stageLevels.filter(l => state.completedLevels[l.id]).length;
        const isExpanded = expandedStage === stage.id;

        return (
          <section key={stage.id} className="mb-3">
            <button
              onClick={() => toggleStage(stage.id)}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl transition-transform active:scale-98"
              style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex items-center gap-3 text-left">
                <div className="text-2xl">{STAGE_ICONS[stage.id - 1]}</div>
                <div>
                  <p className="text-xs font-bold" style={{ color: 'var(--color-gray-soft)' }}>STAGE {stage.id}</p>
                  <h2 className="font-display text-sm font-bold leading-tight" style={{ color: 'var(--color-navy)' }}>
                    {stage.name}
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--color-gray-text)' }}>
                    {stage.tagline}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs font-mono" style={{ color: 'var(--color-orange)' }}>{completedInStage}/{stageLevels.length}</p>
                </div>
                <span className="text-sm" style={{ color: 'var(--color-gray-soft)' }}>
                  {isExpanded ? '▲' : '▼'}
                </span>
              </div>
            </button>

            {/* Level grid */}
            {isExpanded && (
              <div className="grid grid-cols-5 gap-2 mt-2.5 animate-slide-up">
                {stageLevels.map(level => {
                  const unlocked = isLevelUnlocked(level, allLevels);
                  const result = getLevelResult(level.id);
                  return (
                    <LevelNode
                      key={level.id}
                      level={level}
                      unlocked={unlocked}
                      result={result}
                      onClick={onSelectLevel}
                    />
                  );
                })}
              </div>
            )}
          </section>
        );
      })}

      <div className="h-20" />
    </div>
  );
}
