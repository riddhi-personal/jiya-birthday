// Centralized music manager
// Handles page-specific tracks, prevents double-play, respects mute preference, and guarantees infinite looping

// Base URL helper for GitHub Pages asset resolution
const BASE_URL = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const TRACKS = {
  mashup: `${BASE_URL}audio/mashup.m4a`,
  alfaaz01: `${BASE_URL}audio/alfaaz01.mp3`,
  alfaaz02: `${BASE_URL}audio/alfaaz02.mp3`,
  thodiDer: `${BASE_URL}audio/Thodi_der.mp3`,
};

class MusicManager {
  constructor() {
    this.currentAudio = null;
    this.currentTrack = null;
    this.isMuted = false;
    this.isUserInteracted = false;
    this.pendingTrack = null;
    this.pendingLoop = true;
    this.listeners = new Set();

    try {
      this.isMuted = localStorage.getItem('jiya_muted') === 'true';
    } catch (e) {
      this.isMuted = false;
    }
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notifyListeners() {
    this.listeners.forEach(fn =>
      fn({
        isMuted: this.isMuted,
        currentTrack: this.currentTrack,
        isPlaying: this.currentAudio && !this.currentAudio.paused,
      })
    );
  }

  setUserInteracted() {
    if (!this.isUserInteracted) {
      this.isUserInteracted = true;
      if (this.pendingTrack) {
        this.play(this.pendingTrack, this.pendingLoop);
        this.pendingTrack = null;
      }
    }
  }

  play(trackName, loop = true) {
    const src = TRACKS[trackName];
    if (!src) return;

    if (!this.isUserInteracted) {
      this.pendingTrack = trackName;
      this.pendingLoop = loop;
      return;
    }

    // Same track already playing — keep playing smoothly without restarting
    if (
      this.currentTrack === trackName &&
      this.currentAudio &&
      !this.currentAudio.paused &&
      !this.currentAudio.ended
    ) {
      return;
    }

    this._stopCurrent(true);

    this.currentTrack = trackName;
    const audio = new Audio(src);
    audio.volume = this.isMuted ? 0 : 0.7;

    if (loop) {
      audio.loop = true;
      // Double guarantee: if native loop stalls or ends, restart immediately
      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      });
    }

    this.currentAudio = audio;

    audio.play().catch(() => {
      // Audio queued for user click
    });

    this.notifyListeners();
  }

  _stopCurrent(immediate = false) {
    if (!this.currentAudio) return;
    const audio = this.currentAudio;
    this.currentAudio = null;
    this.currentTrack = null;

    if (immediate) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
      return;
    }

    // Quick smooth fade out
    let vol = audio.volume;
    const step = vol / 6;
    const fadeInterval = setInterval(() => {
      vol = Math.max(0, vol - step);
      audio.volume = vol;
      if (vol <= 0) {
        clearInterval(fadeInterval);
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
      }
    }, 40);
  }

  stop() {
    this._stopCurrent(false);
    this.notifyListeners();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('jiya_muted', this.isMuted);
    } catch (e) {}

    if (this.currentAudio) {
      this.currentAudio.volume = this.isMuted ? 0 : 0.7;
    }
    this.notifyListeners();
    return this.isMuted;
  }

  // Sequential playlist for Page 4 (alfaaz01 → alfaaz02 → repeats continuously)
  playSequential(tracks) {
    if (!this.isUserInteracted) {
      this.pendingTrack = tracks[0];
      this.pendingLoop = true;
      return;
    }

    this._stopCurrent(true);

    let index = 0;

    const playNext = () => {
      if (!tracks || tracks.length === 0) return;

      const trackKey = tracks[index];
      const src = TRACKS[trackKey];
      if (!src) return;

      this.currentTrack = trackKey;
      const audio = new Audio(src);
      audio.volume = this.isMuted ? 0 : 0.7;
      audio.loop = false;

      audio.addEventListener('ended', () => {
        // Continuous cycle: alfaaz01 -> alfaaz02 -> alfaaz01 ...
        index = (index + 1) % tracks.length;
        playNext();
      });

      this.currentAudio = audio;
      audio.play().catch(() => {});
      this.notifyListeners();
    };

    playNext();
  }

  getMuteState() {
    return this.isMuted;
  }

  getCurrentTrack() {
    return this.currentTrack;
  }
}

export const musicManager = new MusicManager();
export default musicManager;
