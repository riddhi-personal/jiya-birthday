// Centralized music manager
// Handles page-specific tracks, prevents double-play, respects mute preference

const TRACKS = {
  mashup: '/audio/mashup.m4a',
  alfaaz01: '/audio/alfaaz01.mp3',
  alfaaz02: '/audio/alfaaz02.mp3',
  thodiDer: '/audio/Thodi_der.mp3',
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

    // Same track already playing — don't restart
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
    audio.loop = loop;          // native loop handles endless repeat
    audio.volume = this.isMuted ? 0 : 0.7;

    this.currentAudio = audio;

    audio.play().catch(() => {
      // Autoplay blocked — audio ready when user next interacts
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
      audio.src = '';
      return;
    }

    // Fade out over ~300 ms
    let vol = audio.volume;
    const step = vol / 6;
    const fadeInterval = setInterval(() => {
      vol = Math.max(0, vol - step);
      audio.volume = vol;
      if (vol <= 0) {
        clearInterval(fadeInterval);
        audio.pause();
        audio.src = '';
      }
    }, 50);
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

  // For Page 4: play alfaaz01 → alfaaz02 sequentially
  playSequential(tracks) {
    if (!this.isUserInteracted) {
      this.pendingTrack = tracks[0];
      this.pendingLoop = false;
      return;
    }

    this._stopCurrent(true);

    let index = 0;

    const playNext = () => {
      if (index >= tracks.length) return;

      const src = TRACKS[tracks[index]];
      if (!src) return;

      this.currentTrack = tracks[index];
      const audio = new Audio(src);
      audio.volume = this.isMuted ? 0 : 0.7;
      audio.loop = false;

      audio.addEventListener('ended', () => {
        index++;
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
