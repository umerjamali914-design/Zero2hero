import React, { useState } from 'react'
import { sfx, startBgm, stopBgm } from '../lib/audio.js'

const btnGhost = { background: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-navy)' };
const cardBg = { background: 'var(--color-card)', border: '1px solid var(--color-border)' };

export default function Settings({ state, onSave, onReset, onBack }) {
  const [musicOn, setMusicOn] = useState(state.musicOn !== false);
  const [musicVolume, setMusicVolume] = useState(state.musicVolume ?? 0.11);
  const [sfxOn, setSfxOn] = useState(state.sfxOn !== false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleMusicToggle = (v) => {
    setMusicOn(v);
    if (v) startBgm(); else stopBgm();
  };

  const handleSave = () => {
    sfx.click();
    onSave({ musicOn, musicVolume, sfxOn });
  };

  const handleReset = () => {
    sfx.click();
    onReset();
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-5" style={{ minHeight: '100dvh', maxWidth: '28rem', margin: '0 auto' }}>
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <button
          onClick={() => { sfx.click(); onBack(); }}
          className="px-4 py-2 rounded-full text-sm font-semibold transition-transform active:scale-95"
          style={btnGhost}
        >
          ← Wapas
        </button>
        <h1 className="font-display text-lg font-bold uppercase tracking-wide" style={{ color: 'var(--color-navy)' }}>
          SETTINGS
        </h1>
        <div className="w-16" />
      </header>

      {/* Music toggle */}
      <div className="p-4 rounded-2xl mb-4" style={cardBg}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--color-navy)' }}>
              🎵 Background Music
            </p>
            <p className="text-xs" style={{ color: 'var(--color-gray-text)' }}>
              {musicOn ? 'On' : 'Off'}
            </p>
          </div>
          <button
            onClick={() => handleMusicToggle(!musicOn)}
            className="w-14 h-8 rounded-full transition-colors relative"
            style={{ background: musicOn ? 'var(--color-orange)' : 'var(--color-border)' }}
          >
            <span
              className="absolute top-1 w-6 h-6 rounded-full transition-all shadow-sm"
              style={{ left: musicOn ? '30px' : '4px', background: musicOn ? '#1a1d29' : '#6b6d7a' }}
            />
          </button>
        </div>

        {musicOn && (
          <div className="mt-2">
            <label className="text-xs" style={{ color: 'var(--color-gray-text)' }}>
              Volume
            </label>
            <input
              type="range"
              min="0"
              max="0.3"
              step="0.01"
              value={musicVolume}
              onChange={e => setMusicVolume(parseFloat(e.target.value))}
              className="w-full mt-1"
              style={{ accentColor: 'var(--color-orange)' }}
            />
          </div>
        )}
      </div>

      {/* SFX toggle */}
      <div className="p-4 rounded-2xl mb-4" style={cardBg}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--color-navy)' }}>
              🔊 Sound Effects
            </p>
            <p className="text-xs" style={{ color: 'var(--color-gray-text)' }}>
              Button aur success sounds
            </p>
          </div>
          <button
            onClick={() => { setSfxOn(!sfxOn); if (!sfxOn) sfx.click(); }}
            className="w-14 h-8 rounded-full transition-colors relative"
            style={{ background: sfxOn ? 'var(--color-orange)' : 'var(--color-border)' }}
          >
            <span
              className="absolute top-1 w-6 h-6 rounded-full transition-all shadow-sm"
              style={{ left: sfxOn ? '30px' : '4px', background: sfxOn ? '#1a1d29' : '#6b6d7a' }}
            />
          </button>
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-full font-bold text-base transition-transform active:scale-95 mb-4"
        style={{ background: 'var(--color-orange)', color: '#1a1d29' }}
      >
        Save Karein
      </button>

      {/* Reset progress */}
      <div className="mt-auto">
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-3 rounded-full text-sm font-semibold transition-transform active:scale-95"
            style={{
              background: 'rgba(248,113,113,0.08)',
              color: 'var(--color-wrong)',
              border: '1px solid rgba(248,113,113,0.2)',
            }}
          >
            🗑️ Progress Reset Karein
          </button>
        ) : (
          <div className="p-4 rounded-2xl" style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <p className="text-sm mb-3 text-center" style={{ color: 'var(--color-wrong)' }}>
              Kya aap waqai sab progress reset karna chahte hain?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-full text-white font-semibold text-sm transition-transform active:scale-95"
                style={{ background: 'var(--color-wrong)' }}
              >
                Haan, Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold transition-transform active:scale-95"
                style={btnGhost}
              >
                Nahi
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-center mt-4" style={{ color: 'var(--color-gray-soft)' }}>
        ZERO TO HERO · Created by Umer Jamali
      </p>
    </div>
  );
}
