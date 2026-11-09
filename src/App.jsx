import React, { useState, useEffect, useRef, useCallback } from 'react'
import { stages, allLevels } from './data/curriculum.js'
import { loadAudioManifest } from './data/audioMap.js'
import {
  loadState, subscribe, getState, isLevelUnlocked, getLevelResult,
  completeLevel, setMusicSettings, resetProgress, getResumeLevel, updateState
} from './lib/storage.js'
import {
  unlockAudio, playWord, sfx, startBgm, stopBgm, setBgmVolume, setSfxEnabled, setAudioManifest
} from './lib/audio.js'
import LoadingScreen from './components/LoadingScreen.jsx'
import Home from './components/Home.jsx'
import StageMap from './components/StageMap.jsx'
import LevelPlayer from './components/LevelPlayer.jsx'
import Celebration from './components/Celebration.jsx'
import Settings from './components/Settings.jsx'
import MusicBar from './components/MusicBar.jsx'

export default function App() {
  const [screen, setScreen] = useState('loading')
  const [currentLevelId, setCurrentLevelId] = useState(null)
  const [celebrationData, setCelebrationData] = useState(null)
  const [, forceUpdate] = useState(0)
  const stateRef = useRef(getState())

  // Subscribe to storage changes
  useEffect(() => {
    const unsub = subscribe(s => {
      stateRef.current = s
      forceUpdate(n => n + 1)
    })
    return unsub
  }, [])

  // Initialize: load audio manifest, load state, start BGM
  useEffect(() => {
    let mounted = true
    async function init() {
      const s = loadState();
      // Load audio manifest
      const audioSet = await loadAudioManifest();
      setAudioManifest(Array.from(audioSet));

      // Apply audio settings
      setSfxEnabled(s.sfxOn);
      setBgmVolume(s.musicVolume);

      // Simulate minimum loading time for UX
      await new Promise(r => setTimeout(r, 800));

      if (mounted) {
        setScreen('home');
      }
    }
    init();
    return () => { mounted = false };
  }, []);

  // Handle BGM based on screen and settings
  useEffect(() => {
    const s = stateRef.current;
    if (screen === 'loading') return;
    if (s.musicOn) {
      startBgm();
    } else {
      stopBgm();
    }
  }, [screen, stateRef.current.musicOn]);

  // Handle first user interaction to unlock audio
  useEffect(() => {
    const handler = () => {
      unlockAudio();
      const s = stateRef.current;
      if (s.musicOn) startBgm();
    };
    window.addEventListener('pointerdown', handler, { once: true });
    return () => window.removeEventListener('pointerdown', handler);
  }, []);

  const handleStart = useCallback(() => {
    const s = stateRef.current;
    if (s.lastPlayedLevel || Object.keys(s.completedLevels).length > 0) {
      const resume = getResumeLevel(allLevels);
      setCurrentLevelId(resume.id);
      setScreen('level');
    } else {
      setScreen('stages');
    }
  }, []);

  const handleSelectStage = useCallback(() => {
    setScreen('stages');
  }, []);

  const handleSelectLevel = useCallback((levelId) => {
    setCurrentLevelId(levelId);
    setScreen('level');
  }, []);

  const handleLevelComplete = useCallback((levelId, results) => {
    completeLevel(levelId, results);
    const levelIdx = allLevels.findIndex(l => l.id === levelId);
    const completedCount = Object.keys(getState().completedLevels).length;

    // Every 5 levels → celebration
    if (completedCount > 0 && completedCount % 5 === 0) {
      setCelebrationData({ levelId, completedCount });
      setScreen('celebration');
      return;
    }

    // Go to next level or back to stages
    const nextLevel = allLevels[levelIdx + 1];
    if (nextLevel) {
      setCurrentLevelId(nextLevel.id);
      setScreen('level');
    } else {
      setScreen('stages');
    }
  }, []);

  const handleCelebrationContinue = useCallback(() => {
    setCelebrationData(null);
    const lastId = celebrationData?.levelId;
    if (lastId) {
      const idx = allLevels.findIndex(l => l.id === lastId);
      const next = allLevels[idx + 1];
      if (next) {
        setCurrentLevelId(next.id);
        setScreen('level');
        return;
      }
    }
    setScreen('stages');
  }, [celebrationData]);

  const handleBackHome = useCallback(() => {
    setScreen('home');
  }, []);

  const handleOpenSettings = useCallback(() => {
    setScreen('settings');
  }, []);

  const handleSaveSettings = useCallback((settings) => {
    setMusicSettings(settings);
    setSfxEnabled(settings.sfxOn);
    if (settings.musicVolume !== undefined) setBgmVolume(settings.musicVolume);
    const s = getState();
    if (s.musicOn) startBgm(); else stopBgm();
    setScreen('home');
  }, []);

  const handleReset = useCallback(() => {
    resetProgress();
    setScreen('home');
  }, []);

  const currentLevel = allLevels.find(l => l.id === currentLevelId);

  return (
    <>
      {screen === 'loading' && <LoadingScreen />}
      {screen === 'home' && (
        <Home
          onStart={handleStart}
          onSettings={handleOpenSettings}
          onStages={handleSelectStage}
          state={stateRef.current}
        />
      )}
      {screen === 'stages' && (
        <StageMap
          onBack={handleBackHome}
          onSelectLevel={handleSelectLevel}
          onSettings={handleOpenSettings}
        />
      )}
      {screen === 'level' && currentLevel && (
        <LevelPlayer
          level={currentLevel}
          onComplete={handleLevelComplete}
          onBack={() => setScreen('stages')}
          onNextLevel={(id) => { setCurrentLevelId(id); setScreen('level'); }}
        />
      )}
      {screen === 'celebration' && (
        <Celebration
          data={celebrationData}
          onContinue={handleCelebrationContinue}
        />
      )}
      {screen === 'settings' && (
        <Settings
          state={stateRef.current}
          onSave={handleSaveSettings}
          onReset={handleReset}
          onBack={handleBackHome}
        />
      )}
      {screen !== 'loading' && <MusicBar />}
    </>
  );
}
