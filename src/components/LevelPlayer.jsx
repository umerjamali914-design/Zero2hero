import React, { useState, useEffect, useRef, useCallback } from 'react'
import { playWord, sfx, hasAudio as audioHasAudio } from '../lib/audio.js'
import { getLevelResult, completeLevel, getState } from '../lib/storage.js'
import { allLevels } from '../data/curriculum.js'
import DictationTest from './DictationTest.jsx'

const PASS_SCORE = 80;

const cardBg = { background: 'var(--color-card)', border: '1px solid var(--color-border)' };
const subtleBg = { background: 'var(--color-card-hover)', border: '1px solid var(--color-border)' };
const btnPrimary = {
  background: 'var(--color-orange)',
  color: '#1a1d29',
};
const btnGhost = {
  background: 'var(--color-card)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-navy)',
};

export default function LevelPlayer({ level, onComplete, onBack, onNextLevel }) {
  const [phase, setPhase] = useState('intro') // intro → practice → dictation → done
  const [itemIdx, setItemIdx] = useState(0)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const inputRef = useRef(null)

  const items = level.items || [];
  const currentItem = items[itemIdx];
  const isExam = level.mode === 'exam';
  const isBox = level.mode === 'box';
  const isBreak = level.mode === 'break';
  const isLetter = level.mode === 'letter';
  const isIntro = level.mode === 'intro';

  // Auto-play audio when item changes
  useEffect(() => {
    if (phase === 'practice' && currentItem) {
      playWord(currentItem.roman);
    }
  }, [phase, itemIdx, currentItem]);

  // Focus input
  useEffect(() => {
    if (phase === 'practice' && inputRef.current && !isBox && !isBreak) {
      inputRef.current.focus();
    }
  }, [phase, itemIdx, isBox, isBreak]);

  const handleStartLevel = useCallback(() => {
    sfx.click();
    if (items.length === 0) {
      setPhase('dictation');
    } else {
      setPhase('practice');
      setItemIdx(0);
    }
  }, [items.length]);

  const normalizeText = (text) => {
    return text.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.?!,]/g, '');
  };

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;
    const expected = normalizeText(currentItem.roman);
    const actual = normalizeText(input);
    const isCorrect = actual === expected;

    setTotalAttempts(t => t + 1);

    if (isCorrect) {
      sfx.correct();
      setFeedback('correct');
      setCorrectCount(c => c + 1);
      setScore(s => s + 100);
      setTimeout(() => {
        setFeedback(null);
        if (itemIdx + 1 < items.length) {
          setItemIdx(i => i + 1);
          setInput('');
          setShowHint(false);
        } else {
          setPhase('dictation');
        }
      }, 800);
    } else {
      sfx.wrong();
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setInput('');
      }, 800);
    }
  }, [input, currentItem, itemIdx, items.length]);

  const handlePlayAudio = useCallback(() => {
    if (currentItem) {
      playWord(currentItem.roman);
    }
  }, [currentItem]);

  const handleShowHint = useCallback(() => {
    sfx.click();
    setShowHint(true);
    setScore(s => Math.max(0, s - 20));
  }, []);

  const practiceScore = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;

  const handleDictationComplete = useCallback((dictationScore) => {
    const combinedScore = Math.round((practiceScore * 0.4 + dictationScore * 0.6));
    const stars = combinedScore >= 90 ? 3 : combinedScore >= 70 ? 2 : 1;
    sfx.levelUp();
    completeLevel(level.id, {
      stars,
      score: combinedScore,
      dictationScore,
    });
    setPhase('done');
    setTimeout(() => {
      onComplete(level.id, { stars, score: combinedScore, dictationScore });
    }, 100);
  }, [practiceScore, level.id, onComplete]);

  // --- INTRO PHASE ---
  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-5" style={{ minHeight: '100dvh', maxWidth: '28rem', margin: '0 auto' }}>
        <div className="w-full">
          {/* Top bar with back arrow and progress */}
          <header className="flex items-center justify-between mb-6">
            <button
              onClick={() => { sfx.click(); onBack(); }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-transform active:scale-95"
              style={btnGhost}
            >
              ← Wapas
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-orange)' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-border)' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-border)' }} />
            </div>
            <button
              onClick={() => { sfx.click(); handlePlayAudio?.(); }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-base"
              style={btnGhost}
            >🎵</button>
          </header>

          {/* Level header */}
          <div className="text-center mb-6 animate-pop-in">
            <p className="text-xs mb-1" style={{ color: 'var(--color-gray-soft)' }}>
              Level {level.id} · Stage {level.stage}
            </p>
            <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--color-navy)' }}>
              {level.title}
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-gray-text)' }}>
              {level.subtitle}
            </p>
          </div>

          {/* Intro card */}
          <div className="p-5 rounded-2xl mb-6 animate-slide-up" style={cardBg}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-gray-text)' }}>
              {level.intro}
            </p>
          </div>

          {/* Letters preview */}
          {level.letters && (
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {level.letters.map(l => (
                <div
                  key={l.key}
                  className="px-4 py-3 rounded-xl text-center"
                  style={{ background: 'rgba(255,204,102,0.08)', border: '1px solid rgba(255,204,102,0.2)' }}
                >
                  <span className="font-display text-2xl font-bold block" style={{ color: 'var(--color-orange)' }}>
                    {l.key}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-gray-text)' }}>
                    {l.sound}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Start button */}
          <button
            onClick={handleStartLevel}
            className="w-full py-4 rounded-full font-bold text-lg transition-transform active:scale-95"
            style={btnPrimary}
          >
            Aage →
          </button>

          {getLevelResult(level.id) && (
            <p className="text-center text-xs mt-4" style={{ color: 'var(--color-gray-soft)' }}>
              Pehle score: {getLevelResult(level.id).score}% ·{' '}
              {'★'.repeat(getLevelResult(level.id).stars || 0)}
            </p>
          )}
        </div>
      </div>
    );
  }

  // --- PRACTICE PHASE ---
  if (phase === 'practice' && currentItem) {
    if (isBox) {
      return <BoxGame level={level} item={currentItem} onComplete={() => {
        if (itemIdx + 1 < items.length) {
          setItemIdx(i => i + 1);
        } else {
          setPhase('dictation');
        }
      }} />;
    }

    if (isBreak) {
      return <BreakGame level={level} item={currentItem} onComplete={() => {
        if (itemIdx + 1 < items.length) {
          setItemIdx(i => i + 1);
        } else {
          setPhase('dictation');
        }
      }} />;
    }

    return (
      <div className="min-h-screen flex flex-col px-4 py-5" style={{ minHeight: '100dvh', maxWidth: '28rem', margin: '0 auto' }}>
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <button
            onClick={() => { sfx.click(); onBack(); }}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-transform active:scale-95"
            style={btnGhost}
          >
            ← Wapas
          </button>
          {/* Progress segments */}
          <div className="flex items-center gap-1">
            {items.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{
                background: i <= itemIdx ? 'var(--color-orange)' : 'var(--color-border)',
              }} />
            ))}
          </div>
          <span className="text-xs font-bold" style={{ color: 'var(--color-orange)' }}>
            {score}
          </span>
        </header>

        {/* Item display */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Audio button */}
          <button
            onClick={handlePlayAudio}
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-6 transition-transform active:scale-90 animate-bounce-soft"
            style={{
              background: 'rgba(255,204,102,0.12)',
              border: '2px solid var(--color-orange)',
            }}
          >
            🔊
          </button>

          {/* Show the text (not in exam mode unless hint shown) */}
          {(!isExam || showHint) && (
            <div className="text-center mb-4 animate-pop-in">
              <p className="font-display text-3xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
                {currentItem.roman}
              </p>
              <p className="text-lg" style={{ color: 'var(--color-gray-text)' }}>
                {currentItem.urdu}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-gray-soft)' }}>
                ({currentItem.hint})
              </p>
            </div>
          )}

          {isExam && !showHint && (
            <p className="text-sm mb-4" style={{ color: 'var(--color-gray-text)' }}>
              Awaz suno aur type karo!
            </p>
          )}

          {/* Letters preview for letter mode */}
          {isLetter && level.letters && (
            <div className="flex gap-2 mb-4">
              {level.letters.map(l => (
                <div key={l.key} className="px-3 py-2 rounded-xl text-center" style={{ background: 'rgba(255,204,102,0.08)' }}>
                  <span className="font-display text-xl font-bold" style={{ color: 'var(--color-orange)' }}>{l.key}</span>
                  <p className="text-xs" style={{ color: 'var(--color-gray-soft)' }}>{l.sound}</p>
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="w-full">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => { setInput(e.target.value); sfx.key(); }}
              onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
              placeholder="Yahan type karo..."
              className="w-full px-5 py-4 rounded-2xl text-center text-xl font-mono outline-none transition-all"
              style={{
                background: feedback === 'correct' ? 'rgba(74,222,128,0.1)'
                  : feedback === 'wrong' ? 'rgba(248,113,113,0.1)'
                  : 'var(--color-card)',
                border: feedback === 'correct' ? '2px solid var(--color-correct)'
                  : feedback === 'wrong' ? '2px solid var(--color-wrong)'
                  : '2px solid var(--color-border)',
                color: 'var(--color-navy)',
              }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>

          {/* Feedback */}
          {feedback === 'correct' && (
            <p className="mt-3 text-base font-bold animate-pop-in" style={{ color: 'var(--color-correct)' }}>
              ✅ Sahi! Acha kiya!
            </p>
          )}
          {feedback === 'wrong' && (
            <div className="mt-3 animate-shake">
              <p className="text-base font-bold" style={{ color: 'var(--color-wrong)' }}>
                ❌ Galat. Phir koshish karo.
              </p>
              {!showHint && (
                <button
                  onClick={handleShowHint}
                  className="mt-1 text-xs underline"
                  style={{ color: 'var(--color-gray-text)' }}
                >
                  Hint dekho (-20 score)
                </button>
              )}
            </div>
          )}

          {/* Hint button */}
          {!isExam && !showHint && (
            <button
              onClick={handleShowHint}
              className="mt-3 text-xs underline"
              style={{ color: 'var(--color-gray-text)' }}
            >
              Hint dekho
            </button>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || feedback !== null}
          className="w-full py-3.5 rounded-full font-bold text-base transition-transform active:scale-95 disabled:opacity-40"
          style={btnPrimary}
        >
          Check Karein
        </button>
      </div>
    );
  }

  // --- DICTATION PHASE ---
  if (phase === 'dictation') {
    return (
      <DictationTest
        level={level}
        items={items}
        onComplete={handleDictationComplete}
        onBack={onBack}
      />
    );
  }

  // --- DONE PHASE ---
  if (phase === 'done') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ minHeight: '100dvh', background: 'var(--color-bg)' }}>
        <div className="text-6xl mb-4 animate-star-burst">🎉</div>
        <h1 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
          Level Complete!
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-gray-text)' }}>
          Loading next...
        </p>
      </div>
    );
  }

  return null;
}

// ============ BOX GAME ============
function BoxGame({ level, item, onComplete }) {
  const [placed, setPlaced] = useState([]);
  const [available, setAvailable] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const letters = item.roman.split('');

  useEffect(() => {
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setAvailable(shuffled);
    setPlaced(Array(letters.length).fill(null));
    playWord(item.roman);
  }, [item]);

  const handleSlotClick = (slotIdx) => {
    if (feedback || !placed[slotIdx]) return;
    sfx.click();
    const newAvailable = [...available, placed[slotIdx]];
    const newPlaced = [...placed];
    newPlaced[slotIdx] = null;
    setAvailable(newAvailable);
    setPlaced(newPlaced);
  };

  const handleLetterClick = (letter, availIdx) => {
    if (feedback) return;
    const emptyIdx = placed.findIndex(p => p === null);
    if (emptyIdx < 0) return;
    sfx.key();
    const newPlaced = [...placed];
    newPlaced[emptyIdx] = letter;
    const newAvailable = available.filter((_, i) => i !== availIdx);
    setPlaced(newPlaced);
    setAvailable(newAvailable);

    if (newPlaced.every(l => l !== null)) {
      if (newPlaced.join('') === item.roman) {
        sfx.correct();
        setFeedback('correct');
        playWord(item.roman);
        setTimeout(() => onComplete(), 1200);
      } else {
        sfx.wrong();
        setFeedback('wrong');
        setTimeout(() => {
          setFeedback(null);
          setAvailable([...letters].sort(() => Math.random() - 0.5));
          setPlaced(Array(letters.length).fill(null));
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-5" style={{ minHeight: '100dvh', maxWidth: '28rem', margin: '0 auto' }}>
      <h2 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
        Box Game
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--color-gray-text)' }}>
        Sahi harf sahi jagah par rakhdo
      </p>

      {/* Audio button */}
      <button
        onClick={() => playWord(item.roman)}
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-6 transition-transform active:scale-90"
        style={{ background: 'rgba(255,204,102,0.12)', border: '2px solid var(--color-orange)' }}
      >
        🔊
      </button>

      {/* Boxes */}
      <div className="flex gap-2 mb-8">
        {letters.map((letter, idx) => (
          <button
            key={idx}
            onClick={() => handleSlotClick(idx)}
            className="w-14 h-14 rounded-xl flex items-center justify-center font-display text-2xl font-bold transition-all"
            style={{
              background: feedback === 'correct' ? 'rgba(74,222,128,0.15)'
                : feedback === 'wrong' ? 'rgba(248,113,113,0.15)'
                : placed[idx] ? 'rgba(255,204,102,0.1)' : 'var(--color-card-hover)',
              border: placed[idx] ? '2px solid var(--color-orange)' : '2px dashed var(--color-border)',
              color: 'var(--color-navy)',
            }}
          >
            {placed[idx] || ''}
          </button>
        ))}
      </div>

      {/* Available letters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {available.map((letter, idx) => (
          <button
            key={idx}
            onClick={() => handleLetterClick(letter, idx)}
            className="w-12 h-12 rounded-xl flex items-center justify-center font-display text-xl font-bold transition-transform active:scale-90 animate-pop-in"
            style={{
              background: 'rgba(255,204,102,0.12)',
              border: '1.5px solid rgba(255,204,102,0.3)',
              color: 'var(--color-orange)',
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      {feedback === 'correct' && (
        <p className="mt-6 text-lg font-bold animate-pop-in" style={{ color: 'var(--color-correct)' }}>
          ✅ Sahi! {item.roman} = {item.urdu}
        </p>
      )}
      {feedback === 'wrong' && (
        <p className="mt-6 text-lg font-bold animate-shake" style={{ color: 'var(--color-wrong)' }}>
          ❌ Galat. Phir koshish karo.
        </p>
      )}

      <p className="mt-6 text-xs" style={{ color: 'var(--color-gray-soft)' }}>
        Hint: {item.hint} · {item.urdu}
      </p>
    </div>
  );
}

// ============ BREAK GAME ============
function BreakGame({ level, item, onComplete }) {
  const [phase, setPhase] = useState('show'); // show → break → rebuild → done
  const [broken, setBroken] = useState([]);
  const [rebuild, setRebuild] = useState([]);
  const [available, setAvailable] = useState([]);
  const letters = item.roman.split('');

  useEffect(() => {
    playWord(item.roman);
    setPhase('show');
    setBroken([]);
    setRebuild(Array(letters.length).fill(null));
    setAvailable([]);
  }, [item]);

  const handleBreak = () => {
    sfx.correct();
    setBroken(letters);
    setTimeout(() => {
      setPhase('rebuild');
      setAvailable([...letters].sort(() => Math.random() - 0.5));
    }, 1500);
  };

  const handlePlaceLetter = (letter, availIdx) => {
    sfx.key();
    const emptyIdx = rebuild.findIndex(r => r === null);
    if (emptyIdx < 0) return;
    const newRebuild = [...rebuild];
    newRebuild[emptyIdx] = letter;
    const newAvailable = available.filter((_, i) => i !== availIdx);
    setRebuild(newRebuild);
    setAvailable(newAvailable);

    if (newRebuild.every(l => l !== null)) {
      if (newRebuild.join('') === item.roman) {
        sfx.levelUp();
        playWord(item.roman);
        setTimeout(() => onComplete(), 1200);
      } else {
        sfx.wrong();
        setTimeout(() => {
          setRebuild(Array(letters.length).fill(null));
          setAvailable([...letters].sort(() => Math.random() - 0.5));
        }, 800);
      }
    }
  };

  const handleSlotClick = (idx) => {
    if (!rebuild[idx]) return;
    sfx.click();
    const newAvailable = [...available, rebuild[idx]];
    const newRebuild = [...rebuild];
    newRebuild[idx] = null;
    setAvailable(newAvailable);
    setRebuild(newRebuild);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-5" style={{ minHeight: '100dvh', maxWidth: '28rem', margin: '0 auto' }}>
      <h2 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
        Lafz Todo
      </h2>

      {phase === 'show' && (
        <>
          <button
            onClick={() => playWord(item.roman)}
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 transition-transform active:scale-90"
            style={{ background: 'rgba(255,204,102,0.12)', border: '2px solid var(--color-orange)' }}
          >
            🔊
          </button>
          <p className="font-display text-3xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
            {item.roman}
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--color-gray-text)' }}>
            {item.urdu} ({item.hint})
          </p>
          <button
            onClick={handleBreak}
            className="px-8 py-3 rounded-full font-bold transition-transform active:scale-95"
            style={btnPrimary}
          >
            Todo →
          </button>
        </>
      )}

      {phase === 'show' && broken.length > 0 && (
        <div className="flex gap-2 mt-6">
          {broken.map((l, i) => (
            <span
              key={i}
              className="w-12 h-12 rounded-xl flex items-center justify-center font-display text-2xl font-bold animate-pop-in"
              style={{
                background: 'rgba(255,204,102,0.1)',
                border: '2px solid var(--color-orange)',
                color: 'var(--color-orange)',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {l}
            </span>
          ))}
        </div>
      )}

      {phase === 'rebuild' && (
        <>
          <p className="text-sm mb-4" style={{ color: 'var(--color-gray-text)' }}>
            Haroof jod kar {item.roman} banao
          </p>
          <div className="flex gap-2 mb-6">
            {letters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSlotClick(idx)}
                className="w-12 h-12 rounded-xl flex items-center justify-center font-display text-xl font-bold transition-all"
                style={{
                  background: rebuild[idx] ? 'rgba(255,204,102,0.1)' : 'var(--color-card-hover)',
                  border: rebuild[idx] ? '2px solid var(--color-orange)' : '2px dashed var(--color-border)',
                  color: 'var(--color-navy)',
                }}
              >
                {rebuild[idx] || ''}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {available.map((letter, idx) => (
              <button
                key={idx}
                onClick={() => handlePlaceLetter(letter, idx)}
                className="w-11 h-11 rounded-xl flex items-center justify-center font-display text-lg font-bold transition-transform active:scale-90 animate-pop-in"
                style={{
                  background: 'rgba(255,204,102,0.12)',
                  border: '1.5px solid rgba(255,204,102,0.3)',
                  color: 'var(--color-orange)',
                }}
              >
                {letter}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
