// Auto-generated audio manifest: lists all available MP3 filenames (without extension)
// Audio files are in /public/audio/

// This list is built at build time from the actual files in public/audio/
// For now, we provide a helper that checks at runtime

let _audioSet = null;

export async function loadAudioManifest() {
  if (_audioSet) return _audioSet;
  try {
    const resp = await fetch('/audio-manifest.json');
    if (resp.ok) {
      const arr = await resp.json();
      _audioSet = new Set(arr);
      return _audioSet;
    }
  } catch {
    // Fall back to trying to play and handling errors
  }
  _audioSet = new Set(); // empty = will use speech fallback
  return _audioSet;
}

export function audioKey(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function hasAudio(text, audioSet) {
  if (!audioSet) return false;
  return audioSet.has(audioKey(text));
}
