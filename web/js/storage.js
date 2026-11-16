/* ========================================
   STORAGE — LocalStorage Progress Management
   Saves: current level, completed levels, stars, XP
   ======================================== */

const Storage = (() => {
  const KEY = 'z2h_progress_v1';

  const defaultState = {
    currentLevel: 1,      // next level to play
    completedLevels: {},  // { levelId: { stars: 1-3, bestTime: ms, completedAt: timestamp } }
    xp: 0,                // total experience points
    lastPlayed: null,     // timestamp of last play
    settings: {
      bgm: true,           // background music enabled
      sfx: true,           // sound effects enabled
    },
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Merge with defaults to handle new fields
        return {
          ...defaultState,
          ...parsed,
          completedLevels: { ...parsed.completedLevels },
          settings: { ...defaultState.settings, ...(parsed.settings || {}) },
        };
      }
    } catch (e) {
      console.error('Storage load error:', e);
    }
    return { ...defaultState, completedLevels: {} };
  }

  function save(state) {
    try {
      state.lastPlayed = Date.now();
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Storage save error:', e);
    }
  }

  function isLevelCompleted(state, levelId) {
    return !!(state.completedLevels[levelId] && state.completedLevels[levelId].stars > 0);
  }

  function isLevelUnlocked(state, levelId) {
    if (levelId === 1) return true;
    return isLevelCompleted(state, levelId - 1);
  }

  function getStars(state, levelId) {
    return state.completedLevels[levelId]?.stars || 0;
  }

  function completeLevel(state, levelId, stars, timeMs) {
    const existing = state.completedLevels[levelId];
    const bestStars = Math.max(existing?.stars || 0, stars);
    const bestTime = existing?.bestTime ? Math.min(existing.bestTime, timeMs) : timeMs;

    state.completedLevels[levelId] = {
      stars: bestStars,
      bestTime: bestTime,
      completedAt: Date.now(),
    };

    // Award XP
    const xpGain = stars * 10 + (stars === 3 ? 5 : 0);
    state.xp += xpGain - (existing ? Math.max(existing.stars, 0) * 10 + (existing.stars === 3 ? 5 : 0) : 0);

    // Advance current level
    if (levelId >= state.currentLevel) {
      state.currentLevel = levelId + 1;
    }

    save(state);
    return xpGain;
  }

  function reset() {
    localStorage.removeItem(KEY);
  }

  function updateSettings(state, settings) {
    state.settings = { ...state.settings, ...settings };
    save(state);
  }

  return {
    load,
    save,
    isLevelCompleted,
    isLevelUnlocked,
    getStars,
    completeLevel,
    reset,
    updateSettings,
  };
})();
