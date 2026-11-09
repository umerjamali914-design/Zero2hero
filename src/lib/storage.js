// Versioned LocalStorage progress system

const STORAGE_KEY = 'z2h_progress_v1';
const SCHEMA_VERSION = 1;

const DEFAULT_STATE = {
  version: SCHEMA_VERSION,
  currentLevelId: null,
  completedLevels: {},   // { levelId: { stars, score, dictationScore, completedAt } }
  xp: 0,
  musicOn: true,
  musicVolume: 0.11,
  sfxOn: true,
  lastPlayedLevel: null,
  totalStars: 0,
};

let state = null;
let listeners = new Set();

export function loadState() {
  if (state) return state;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migration: merge with defaults for any missing keys
      state = { ...DEFAULT_STATE, ...parsed, version: SCHEMA_VERSION };
      // Ensure nested objects exist
      if (!state.completedLevels) state.completedLevels = {};
    } else {
      state = { ...DEFAULT_STATE };
    }
  } catch {
    // Corrupted data — start fresh
    state = { ...DEFAULT_STATE };
  }
  return state;
}

export function saveState() {
  if (!state) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — silently fail
  }
  notifyListeners();
}

function notifyListeners() {
  listeners.forEach(fn => fn(state));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getState() {
  return state || loadState();
}

export function updateState(updater) {
  const prev = getState();
  const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
  state = next;
  saveState();
  return next;
}

// --- Domain-specific helpers ---

export function isLevelCompleted(levelId) {
  const s = getState();
  return !!s.completedLevels[levelId];
}

export function isLevelUnlocked(level, allLevels) {
  const s = getState();
  // First level is always unlocked
  const idx = allLevels.findIndex(l => l.id === level.id);
  if (idx === 0) return true;
  // Previous level must be completed (with dictation passed)
  const prev = allLevels[idx - 1];
  return !!s.completedLevels[prev.id];
}

export function getLevelResult(levelId) {
  return getState().completedLevels[levelId] || null;
}

export function completeLevel(levelId, { stars, score, dictationScore }) {
  const s = getState();
  const wasCompleted = !!s.completedLevels[levelId];
  const prevStars = wasCompleted ? (s.completedLevels[levelId].stars || 0) : 0;
  const bestStars = Math.max(prevStars, stars);
  const completedLevels = {
    ...s.completedLevels,
    [levelId]: {
      stars: bestStars,
      score: Math.max(s.completedLevels[levelId]?.score || 0, score),
      dictationScore: Math.max(s.completedLevels[levelId]?.dictationScore || 0, dictationScore),
      completedAt: Date.now(),
    },
  };
  const totalStars = Object.values(completedLevels).reduce((sum, r) => sum + (r.stars || 0), 0);
  const xpGain = wasCompleted ? Math.max(0, stars - prevStars) * 10 : stars * 10;
  updateState({
    completedLevels,
    totalStars,
    xp: s.xp + xpGain,
    lastPlayedLevel: levelId,
    currentLevelId: levelId,
  });
}

export function setMusicSettings({ musicOn, musicVolume, sfxOn }) {
  updateState(prev => ({
    musicOn: musicOn !== undefined ? musicOn : prev.musicOn,
    musicVolume: musicVolume !== undefined ? musicVolume : prev.musicVolume,
    sfxOn: sfxOn !== undefined ? sfxOn : prev.sfxOn,
  }));
}

export function resetProgress() {
  state = { ...DEFAULT_STATE };
  saveState();
}

export function getResumeLevel(allLevels) {
  const s = getState();
  if (s.lastPlayedLevel) {
    // Find the next uncompleted level after last played
    const idx = allLevels.findIndex(l => l.id === s.lastPlayedLevel);
    if (idx >= 0) {
      // Return last played if not completed, otherwise next level
      if (!s.completedLevels[s.lastPlayedLevel]) {
        return allLevels[idx];
      }
      if (idx + 1 < allLevels.length) {
        return allLevels[idx + 1];
      }
    }
  }
  // Find first uncompleted level
  return allLevels.find(l => !s.completedLevels[l.id]) || allLevels[0];
}
