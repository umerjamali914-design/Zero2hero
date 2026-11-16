/* ========================================
   AUDIO ENGINE
   - Procedural background music (Web Audio API)
   - SFX (correct, wrong, key, levelUp)
   - TTS via SpeechSynthesis for words without MP3
   - MP3 playback for pre-recorded words
   ======================================== */

const AudioEngine = (() => {
  let ctx = null;
  let bgmRunning = false;
  let masterGain = null;
  let bgmTimer = null;
  let bgmStep = 0;
  let bgmNextTime = 0;
  let sfxEnabled = true;
  let bgmEnabled = true;

  // Chord progressions (same as original Likhari)
  const chords = [
    [220, 261.63, 329.63],   // Am
    [174.61, 220, 261.63],   // F
    [196, 246.94, 293.66],   // G
    [130.81, 164.81, 196],   // C
  ];
  const melody = [440, 523.25, 659.25, 783.99, 659.25, 523.25];

  function ensureCtx() {
    if (ctx) return ctx;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { return null; }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }

  function unlock() { ensureCtx(); if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {}); }

  // === SFX ===
  function playTone(freq, start, dur, type, vol, dest) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(vol, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g).connect(dest);
    o.start(start);
    o.stop(start + dur + 0.05);
  }

  const sfx = {
    key() {
      if (!sfxEnabled) return;
      const c = ensureCtx(); if (!c) return;
      playTone(1200 + Math.random() * 200, c.currentTime, 0.05, 'square', 0.03, c.destination);
    },
    correct() {
      if (!sfxEnabled) return;
      const c = ensureCtx(); if (!c) return;
      const t = c.currentTime;
      playTone(660, t, 0.18, 'triangle', 0.18, c.destination);
      playTone(880, t + 0.1, 0.22, 'triangle', 0.18, c.destination);
      playTone(1320, t + 0.2, 0.3, 'sine', 0.14, c.destination);
    },
    wrong() {
      if (!sfxEnabled) return;
      const c = ensureCtx(); if (!c) return;
      const t = c.currentTime;
      playTone(220, t, 0.18, 'sawtooth', 0.12, c.destination);
      playTone(180, t + 0.12, 0.25, 'sawtooth', 0.12, c.destination);
    },
    levelUp() {
      if (!sfxEnabled) return;
      const c = ensureCtx(); if (!c) return;
      const t = c.currentTime;
      [523, 659, 784, 1047, 1319].forEach((n, i) => {
        playTone(n, t + i * 0.09, 0.5, 'triangle', 0.16, c.destination);
      });
    },
    milestone() {
      if (!sfxEnabled) return;
      const c = ensureCtx(); if (!c) return;
      const t = c.currentTime;
      [523, 659, 784, 1047, 1319, 1568, 2093].forEach((n, i) => {
        playTone(n, t + i * 0.06, 0.6, 'triangle', 0.14, c.destination);
        playTone(n * 1.5, t + i * 0.06, 0.6, 'sine', 0.08, c.destination);
      });
    },
  };

  // === BACKGROUND MUSIC (procedural, same as original) ===
  function bgmStart() {
    if (bgmRunning) return;
    const c = ensureCtx();
    if (!c) return;
    bgmRunning = true;
    if (!masterGain) {
      masterGain = c.createGain();
      masterGain.gain.value = 0;
      const filter = c.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2200;
      masterGain.connect(filter).connect(c.destination);
    }
    masterGain.gain.cancelScheduledValues(c.currentTime);
    masterGain.gain.setTargetAtTime(0.11, c.currentTime, 1.2);
    bgmNextTime = c.currentTime + 0.1;
    bgmStep = 0;

    const tick = () => {
      if (!bgmRunning) return;
      while (bgmNextTime < c.currentTime + 0.6) {
        scheduleBgm(bgmNextTime, bgmStep);
        bgmStep++;
        bgmNextTime += 0.34;
      }
      bgmTimer = window.setTimeout(tick, 200);
    };
    tick();
  }

  function bgmStop() {
    if (!bgmRunning) return;
    bgmRunning = false;
    if (bgmTimer) clearTimeout(bgmTimer);
    const c = ensureCtx();
    if (c && masterGain) masterGain.gain.setTargetAtTime(0, c.currentTime, 0.4);
  }

  function scheduleBgm(time, step) {
    const c = ensureCtx();
    if (!c || !masterGain) return;
    const chordIdx = Math.floor(step / 8) % chords.length;
    const chord = chords[chordIdx];

    if (step % 8 === 0) {
      // Chord pad
      chord.forEach(freq => {
        [-4, 4].forEach(detune => {
          const o = c.createOscillator();
          const g = c.createGain();
          o.type = 'triangle';
          o.frequency.value = freq;
          o.detune.value = detune;
          g.gain.setValueAtTime(0, time);
          g.gain.linearRampToValueAtTime(0.07, time + 0.6);
          g.gain.setValueAtTime(0.07, time + 2);
          g.gain.linearRampToValueAtTime(0, time + 2.7);
          o.connect(g).connect(masterGain);
          o.start(time);
          o.stop(time + 2.8);
        });
      });
      // Bass
      const bo = c.createOscillator();
      const bg = c.createGain();
      bo.type = 'sine';
      bo.frequency.value = chord[0] / 2;
      bg.gain.setValueAtTime(0.16, time);
      bg.gain.exponentialRampToValueAtTime(0.0001, time + 1.2);
      bo.connect(bg).connect(masterGain);
      bo.start(time);
      bo.stop(time + 1.3);
    }

    // Melody
    const melFreq = melody[step % melody.length] * (chordIdx === 1 ? 0.8 : chordIdx === 3 ? 0.6 : 1);
    const mo = c.createOscillator();
    const mg = c.createGain();
    mo.type = 'sine';
    mo.frequency.value = melFreq;
    mg.gain.setValueAtTime(0.09, time);
    mg.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);
    mo.connect(mg).connect(masterGain);
    mo.start(time);
    mo.stop(time + 0.55);
  }

  function setBgmEnabled(on) {
    bgmEnabled = on;
    if (on) bgmStart(); else bgmStop();
  }
  function setSfxEnabled(on) { sfxEnabled = on; }
  function isBgmEnabled() { return bgmEnabled; }
  function isSfxEnabled() { return sfxEnabled; }

  // === TTS (Web Speech API) ===
  // Roman Urdu phonetic pronunciation mapping
  const phoneticMap = {
    'aa': 'ā', 'ee': 'ī', 'oo': 'ū', 'ai': 'ai', 'au': 'au',
    'kh': 'kh', 'gh': 'gh', 'ch': 'ch', 'chh': 'chh', 'ph': 'ph',
    'th': 'th', 'dh': 'dh', 'bh': 'bh', 'sh': 'sh', 'zh': 'zh',
    'q': 'q', 'z': 'z',
  };

  // Build a natural-sounding utterance for Roman Urdu
  function speak(text, opts = {}) {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) { resolve(); return; }
      try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = opts.rate || 0.85;
        u.pitch = opts.pitch || 1.0;
        u.volume = opts.volume || 1.0;

        // Try to find a suitable voice (prefer en-US or en-GB for Latin script)
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
          const preferred = voices.find(v => v.lang === 'en-US' && v.localService) ||
                           voices.find(v => v.lang === 'en-US') ||
                           voices.find(v => v.lang.startsWith('en')) ||
                           voices[0];
          if (preferred) u.voice = preferred;
        }

        u.onend = () => resolve();
        u.onerror = () => resolve();
        speechSynthesis.speak(u);
      } catch (e) { resolve(); }
    });
  }

  // Speak with syllable breakdown (for phonics)
  async function speakSyllables(syllables, opts = {}) {
    for (let i = 0; i < syllables.length; i++) {
      if (opts.onSyllable) opts.onSyllable(i);
      await speak(syllables[i], { rate: opts.rate || 0.7 });
      await new Promise(r => setTimeout(r, 150));
    }
    if (opts.onSyllable) opts.onSyllable(-1);
  }

  // === MP3 PLAYBACK ===
  const audioCache = new Map();
  let currentAudio = null;

  function audioUrl(filename) {
    return `/audio/${filename}.mp3`;
  }

  function playMp3(filename) {
    return new Promise((resolve) => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      const audio = new Audio(audioUrl(filename));
      audio.preload = 'auto';
      audio.preservesPitch = true;
      currentAudio = audio;
      audio.addEventListener('ended', () => { resolve(); }, { once: true });
      audio.addEventListener('error', () => { resolve(); }, { once: true });
      audio.play().catch(() => resolve());
    });
  }

  // Try MP3 first, fall back to TTS
  async function speakWord(word, opts = {}) {
    const filename = word.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').trim();
    // Try to play the MP3 file
    try {
      const resp = await fetch(audioUrl(filename), { method: 'HEAD' });
      if (resp.ok) {
        return playMp3(filename);
      }
    } catch (e) { /* fall through to TTS */ }
    // Fall back to TTS
    return speak(word, opts);
  }

  // Check if an MP3 exists (cached)
  const mp3ExistsCache = new Map();
  async function checkMp3(filename) {
    if (mp3ExistsCache.has(filename)) return mp3ExistsCache.get(filename);
    try {
      const resp = await fetch(audioUrl(filename), { method: 'HEAD' });
      const exists = resp.ok;
      mp3ExistsCache.set(filename, exists);
      return exists;
    } catch (e) {
      mp3ExistsCache.set(filename, false);
      return false;
    }
  }

  return {
    unlock,
    sfx,
    speak,
    speakSyllables,
    speakWord,
    playMp3,
    setBgmEnabled,
    setSfxEnabled,
    isBgmEnabled,
    isSfxEnabled,
    checkMp3,
  };
})();
