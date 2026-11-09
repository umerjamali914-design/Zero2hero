import React, { useState, useEffect, useRef, useCallback } from 'react'
import { playWord, sfx } from '../lib/audio.js'

const PASS_SCORE = 80;

const btnPrimary = { background: 'var(--color-orange)', color: '#1a1d29' };
const btnGhost = { background: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-navy)' };

export default function DictationTest({ level, items, onComplete, onBack }) {
  const [itemIdx, setItemIdx] = useState(0)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [finished, setFinished] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const inputRef = useRef(null)

  const dictItems = items.length > 0 ? items : [{ id: 'empty', roman: '', urdu: '', hint: '' }];
  const currentItem = dictItems[Math.min(itemIdx, dictItems.length - 1)];

  useEffect(() => {
    if (currentItem && currentItem.roman) {
      setHasPlayed(false);
      setShowAnswer(false);
      setInput('');
      const timer = setTimeout(() => {
        playWord(currentItem.roman);
        setHasPlayed(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [itemIdx, currentItem]);

  useEffect(() => {
    if (inputRef.current && !finished) {
      inputRef.current.focus();
    }
  }, [itemIdx, finished]);

  const normalizeText = (text) => {
    return text.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.?!,]/g, '');
  };

  const handlePlayAudio = useCallback(() => {
    if (currentItem) {
      playWord(currentItem.roman);
      setHasPlayed(true);
    }
  }, [currentItem]);

  const handleSubmit = useCallback(() => {
    if (!input.trim() || feedback) return;
    const expected = normalizeText(currentItem.roman);
    const actual = normalizeText(input);
    const isCorrect = actual === expected;

    setAttempts(a => a + 1);

    if (isCorrect) {
      sfx.correct();
      setFeedback('correct');
      setCorrectCount(c => c + 1);
      setTimeout(() => {
        setFeedback(null);
        if (itemIdx + 1 < dictItems.length) {
          setItemIdx(i => i + 1);
        } else {
          const score = Math.round((correctCount + 1) / dictItems.length * 100);
          setFinalScore(score);
          setFinished(true);
          if (score >= PASS_SCORE) {
            sfx.levelUp();
          }
        }
      }, 1000);
    } else {
      sfx.wrong();
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setInput('');
        setShowAnswer(true);
      }, 1000);
    }
  }, [input, currentItem, itemIdx, dictItems.length, correctCount, feedback]);

  const handleRetry = useCallback(() => {
    sfx.click();
    setFinished(false);
    setItemIdx(0);
    setCorrectCount(0);
    setAttempts(0);
    setInput('');
    setFeedback(null);
  }, []);

  // --- FINISHED SCREEN ---
  if (finished) {
    const passed = finalScore >= PASS_SCORE;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ minHeight: '100dvh', background: 'var(--color-bg)' }}>
        <div className={`text-7xl mb-4 animate-star-burst`}>
          {passed ? '🎉' : '💪'}
        </div>
        <h1 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
          {passed ? 'Dictation Pass!' : 'Phir Koshish Karein'}
        </h1>
        <div className="my-4 p-4 rounded-2xl" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <p className="text-center text-sm" style={{ color: 'var(--color-gray-text)' }}>
            Score
          </p>
          <p className="text-center font-display text-4xl font-bold" style={{ color: passed ? 'var(--color-correct)' : 'var(--color-orange)' }}>
            {finalScore}%
          </p>
          <p className="text-center text-xs mt-1" style={{ color: 'var(--color-gray-soft)' }}>
            {correctCount} / {dictItems.length} sahi
          </p>
        </div>
        <p className="text-sm mb-6 text-center" style={{ color: 'var(--color-gray-text)' }}>
          {passed
            ? `Pass ho gaye! (${PASS_SCORE}% chahiye tha)`
            : `Pass hone ke liye ${PASS_SCORE}% chahiye. Phir koshish karo!`}
        </p>

        {passed ? (
          <button
            onClick={() => onComplete(finalScore)}
            className="px-10 py-4 rounded-full font-bold text-lg transition-transform active:scale-95 animate-glow"
            style={btnPrimary}
          >
            Agla Level →
          </button>
        ) : (
          <button
            onClick={handleRetry}
            className="px-10 py-4 rounded-full font-bold text-lg transition-transform active:scale-95"
            style={btnPrimary}
          >
            Phir Koshish Karo →
          </button>
        )}
      </div>
    );
  }

  // --- DICTATION TEST ---
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
        <span className="font-display text-sm font-bold" style={{ color: 'var(--color-navy)' }}>
          ✍️ DICTATION
        </span>
        <span className="text-xs font-bold" style={{ color: 'var(--color-gray-text)' }}>
          {itemIdx + 1} / {dictItems.length}
        </span>
      </header>

      {/* Progress segments */}
      <div className="flex items-center gap-1 mb-6">
        {dictItems.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full" style={{
            background: i <= itemIdx ? 'var(--color-orange)' : 'var(--color-border)',
          }} />
        ))}
      </div>

      {/* Dictation content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-sm mb-6 text-center" style={{ color: 'var(--color-gray-text)' }}>
          Awaz dhyan se suno aur bilkul waisa hi type karo
        </p>

        {/* Audio button */}
        <button
          onClick={handlePlayAudio}
          className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-6 transition-transform active:scale-90 animate-bounce-soft"
          style={{
            background: 'rgba(255,204,102,0.12)',
            border: '2px solid var(--color-orange)',
          }}
        >
          🔊
        </button>

        <button
          onClick={handlePlayAudio}
          className="text-xs mb-4 underline"
          style={{ color: 'var(--color-gray-soft)' }}
        >
          Phir suno
        </button>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); sfx.key(); }}
          onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
          placeholder="Suno aur likho..."
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

        {/* Feedback */}
        {feedback === 'correct' && (
          <p className="mt-3 text-base font-bold animate-pop-in" style={{ color: 'var(--color-correct)' }}>
            ✅ Sahi!
          </p>
        )}
        {feedback === 'wrong' && (
          <div className="mt-3 animate-shake">
            <p className="text-base font-bold" style={{ color: 'var(--color-wrong)' }}>
              ❌ Galat.
            </p>
          </div>
        )}

        {/* Show answer after wrong */}
        {showAnswer && !feedback && (
          <div className="mt-4 p-3 rounded-xl text-center animate-pop-in" style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--color-gray-soft)' }}>
              Sahi jawab:
            </p>
            <p className="font-mono text-lg" style={{ color: 'var(--color-navy)' }}>
              {currentItem.roman}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-gray-text)' }}>
              {currentItem.urdu} ({currentItem.hint})
            </p>
          </div>
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
