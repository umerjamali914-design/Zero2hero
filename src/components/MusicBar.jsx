import React, { useState, useEffect } from 'react'
import { getState, subscribe } from '../lib/storage.js'
import { startBgm, stopBgm, sfx } from '../lib/audio.js'

export default function MusicBar() {
  const [state, setState] = useState(getState());

  useEffect(() => {
    const unsub = subscribe(s => setState(s));
    return unsub;
  }, []);

  const toggleMusic = () => {
    sfx.click();
    if (state.musicOn) {
      stopBgm();
      const event = new CustomEvent('music-toggle', { detail: false });
      window.dispatchEvent(event);
    } else {
      startBgm();
      const event = new CustomEvent('music-toggle', { detail: true });
      window.dispatchEvent(event);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-4 right-4 w-11 h-11 rounded-full flex items-center justify-center text-lg z-50 transition-transform active:scale-90"
      style={{
        background: 'var(--color-card)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      {state.musicOn ? '🎵' : '🔇'}
    </button>
  );
}
