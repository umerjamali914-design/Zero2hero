// Audio engine: pre-recorded MP3s, sound effects, and procedural background music

let audioCtx = null;
const audioCache = new Map();
let currentAudio = null;
let bgmRunning = false;
let bgmTimer = null;
let bgmGain = null;
let bgmStep = 0;
let bgmNextTime = 0;

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function unlockAudio() {
  getCtx();
}

// --- Pre-recorded MP3 playback ---
function audioKey(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Build a Set of available audio files from the manifest
let availableAudio = null;
export function setAudioManifest(keys) {
  availableAudio = new Set(keys);
}

export function hasAudio(text) {
  if (!availableAudio) return false;
  return availableAudio.has(audioKey(text));
}

export function playWord(text, { rate = 1 } = {}) {
  if (typeof window === 'undefined') return Promise.resolve();
  const key = audioKey(text);
  if (!availableAudio || !availableAudio.has(key)) {
    return playSpeech(text);
  }
  if (!audioCache.has(key)) {
    const a = new Audio(`/audio/${key}.mp3`);
    a.preload = 'auto';
    audioCache.set(key, a);
  }
  const a = audioCache.get(key);
  if (currentAudio && currentAudio !== a) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = a;
  a.currentTime = 0;
  a.preservesPitch = true;
  a.playbackRate = rate;
  return new Promise(resolve => {
    const done = () => {
      a.removeEventListener('ended', done);
      a.removeEventListener('error', done);
      resolve();
    };
    a.addEventListener('ended', done);
    a.addEventListener('error', done);
    a.play().catch(() => resolve());
  });
}

// --- Web Speech API fallback ---
export function playSpeech(text) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return Promise.resolve();
  return new Promise(resolve => {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      // Try to find an Urdu or Hindi voice
      const voices = window.speechSynthesis.getVoices();
      const ur = voices.find(v => v.lang.startsWith('ur'));
      const hi = voices.find(v => v.lang.startsWith('hi'));
      u.voice = ur || hi || voices[0];
      u.rate = 0.8;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      window.speechSynthesis.speak(u);
    } catch {
      resolve();
    }
  });
}

// --- Sound effects (Web Audio API oscillators) ---
let sfxEnabled = true;
export function setSfxEnabled(v) { sfxEnabled = v; }

function tone(freq, start, dur, type, gain, dest) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g).connect(dest);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

export const sfx = {
  key() {
    if (!sfxEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    tone(1200 + Math.random() * 200, ctx.currentTime, 0.05, 'square', 0.03, ctx.destination);
  },
  correct() {
    if (!sfxEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    tone(660, t, 0.18, 'triangle', 0.15, ctx.destination);
    tone(880, t + 0.1, 0.22, 'triangle', 0.15, ctx.destination);
    tone(1320, t + 0.2, 0.3, 'sine', 0.12, ctx.destination);
  },
  wrong() {
    if (!sfxEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    tone(220, t, 0.18, 'sawtooth', 0.1, ctx.destination);
    tone(180, t + 0.12, 0.25, 'sawtooth', 0.1, ctx.destination);
  },
  levelUp() {
    if (!sfxEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    [523, 659, 784, 1047, 1319].forEach((n, i) => {
      tone(n, t + i * 0.09, 0.5, 'triangle', 0.14, ctx.destination);
    });
  },
  click() {
    if (!sfxEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    tone(800, ctx.currentTime, 0.03, 'sine', 0.06, ctx.destination);
  },
  star() {
    if (!sfxEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    tone(880, t, 0.1, 'sine', 0.1, ctx.destination);
    tone(1100, t + 0.08, 0.12, 'sine', 0.1, ctx.destination);
    tone(1400, t + 0.16, 0.2, 'sine', 0.08, ctx.destination);
  },
};

// --- Procedural background music (Web Audio API) ---
// Chord progressions and melody inspired by the original app's chiptune style
const chords = [
  [220, 261.63, 329.63],
  [174.61, 220, 261.63],
  [196, 246.94, 293.66],
  [130.81, 164.81, 196],
];
const melody = [440, 523.25, 659.25, 783.99, 659.25, 523.25];

let bgmVolume = 0.11;

export function setBgmVolume(v) {
  bgmVolume = v;
  const ctx = getCtx();
  if (ctx && bgmGain) {
    bgmGain.gain.setTargetAtTime(v, ctx.currentTime, 0.4);
  }
}

export function startBgm() {
  const ctx = getCtx();
  if (!ctx || bgmRunning) return;
  bgmRunning = true;

  if (!bgmGain) {
    bgmGain = ctx.createGain();
    bgmGain.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2200;
    bgmGain.connect(filter).connect(ctx.destination);
  }

  bgmGain.gain.cancelScheduledValues(ctx.currentTime);
  bgmGain.gain.setTargetAtTime(bgmVolume, ctx.currentTime, 1.2);
  bgmNextTime = ctx.currentTime + 0.1;
  bgmStep = 0;

  const tick = () => {
    if (!bgmRunning) return;
    while (bgmNextTime < ctx.currentTime + 0.6) {
      scheduleBgmNote(bgmNextTime, bgmStep);
      bgmStep++;
      bgmNextTime += 0.34;
    }
    bgmTimer = setTimeout(tick, 200);
  };
  tick();
}

export function stopBgm() {
  if (!bgmRunning) return;
  bgmRunning = false;
  if (bgmTimer) clearTimeout(bgmTimer);
  const ctx = getCtx();
  if (ctx && bgmGain) {
    bgmGain.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
  }
}

function scheduleBgmNote(time, step) {
  const ctx = getCtx();
  if (!ctx || !bgmGain) return;
  const chordIdx = Math.floor(step / 8) % chords.length;
  const chord = chords[chordIdx];

  // Play chord on every 8th step
  if (step % 8 === 0) {
    chord.forEach(freq => {
      [-4, 4].forEach(detune => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        osc.detune.value = detune;
        g.gain.setValueAtTime(0, time);
        g.gain.linearRampToValueAtTime(0.07, time + 0.6);
        g.gain.setValueAtTime(0.07, time + 2);
        g.gain.linearRampToValueAtTime(0, time + 2.7);
        osc.connect(g).connect(bgmGain);
        osc.start(time);
        osc.stop(time + 2.8);
      });
    });
    // Bass note
    const bass = ctx.createOscillator();
    const bg = ctx.createGain();
    bass.type = 'sine';
    bass.frequency.value = chord[0] / 2;
    bg.gain.setValueAtTime(0.16, time);
    bg.gain.exponentialRampToValueAtTime(0.0001, time + 1.2);
    bass.connect(bg).connect(bgmGain);
    bass.start(time);
    bass.stop(time + 1.3);
  }

  // Melody note
  const volMult = chordIdx === 1 ? 0.8 : chordIdx === 3 ? 0.6 : 1;
  const melFreq = melody[step % melody.length] * volMult;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = melFreq;
  g.gain.setValueAtTime(0.09, time);
  g.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);
  osc.connect(g).connect(bgmGain);
  osc.start(time);
  osc.stop(time + 0.55);
}
