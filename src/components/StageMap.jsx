import React, { useState } from 'react'
import { stages, allLevels } from '../data/curriculum.js'
import { getState, isLevelUnlocked, getLevelResult } from '../lib/storage.js'
import { sfx } from '../lib/audio.js'

function StarRow({ count }) {
  return (
    <span className="text-xs">
      {[1, 2, 3].map(i => (
        <span key={i} style={{ color: i <= count ? 'var(--color-gold)' : 'rgba(29,43,69,0.15)' }}>★</span>
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
        aspect-square flex flex-col items-center justify-center rounded-2xl
        transition-transform active:scale-95
        ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
      `}
      style={{
        background: isCompleted
          ? 'linear-gradient(135deg, rgba(255,150,45,0.12), rgba(255,174,45,0.08))'
          : unlocked
            ? 'rgba(29,43,69,0.04)'
            : 'rgba(29,43,69,0.02)',
        border: isExam && unlocked
          ? '2px solid var(--color-orange)'
          : unlocked
            ? '1.5px solid rgba(29,43,69,0.1)'
            : '1.5px solid rgba(29,43,69,0.05)',
      }}
    >
      {unlocked ? (
        <>
          <span className="font-display text-base font-bold" style={{ color: isExam ? 'var(--color-orange)' : 'var(--color-navy)' }}>
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
        <span className="text-lg">🔒</span>
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
    <div className="min-h-screen px-4 py-5" style={{ minHeight: '100dvh', maxWidth: '28rem', margin: '0 auto' }}>
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={() => { sfx.click(); onBack(); }}
          className="px-4 py-2 rounded-full text-sm font-semibold transition-transform active:scale-95"
          style={{ background: 'rgba(29,43,69,0.06)', color: 'var(--color-navy)' }}
        >
          ← Wapas
        </button>
        <h1 className="font-display text-lg font-bold" style={{ color: 'var(--color-navy)' }}>
          LEVELS
        </h1>
        <span className="font-mono text-xs font-bold" style={{ color: 'var(--color-orange)' }}>
          {state.xp || 0} XP
        </span>
      </header>

      {/* Stages */}
      {stages.map(stage => {
        const stageLevels = allLevels.filter(l => l.stage === stage.id);
        const completedInStage = stageLevels.filter(l => state.completedLevels[l.id]).length;
        const isExpanded = expandedStage === stage.id;

        return (
          <section key={stage.id} className="mb-4">
            <button
              onClick={() => toggleStage(stage.id)}
              className="w-full flex items-center justify-between p-3 rounded-2xl transition-transform active:scale-98"
              style={{
                background: 'rgba(29,43,69,0.04)',
                border: '1px solid rgba(29,43,69,0.08)',
              }}
            >
              <div className="text-left">
                <h2 className="font-display text-base font-bold" style={{ color: 'var(--color-navy)' }}>
                  {stage.id}. {stage.name}
                </h2>
                <p className="text-xs" style={{ color: 'var(--color-gray-text)' }}>
                  {stage.tagline} · {completedInStage}/{stageLevels.length}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(29,43,69,0.08)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${stageLevels.length > 0 ? (completedInStage / stageLevels.length) * 100 : 0}%`,
                      background: 'linear-gradient(90deg, var(--color-orange), var(--color-orange-light))',
                    }}
                  />
                </div>
                <span className="text-sm" style={{ color: 'var(--color-gray-soft)' }}>
                  {isExpanded ? '▲' : '▼'}
                </span>
              </div>
            </button>

            {/* Level grid */}
            {isExpanded && (
              <div className="grid grid-cols-4 gap-2.5 mt-3 animate-slide-up">
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
