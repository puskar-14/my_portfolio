// Cozy Web Audio API synthesizer for sound effects and gentle ambient music
// No external assets required; 100% self-contained and lightweight

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.ambientGain = null;
    this.isAmbientPlaying = false;
  }

  initCtx() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.03, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  playHover() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(587.33, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio context error ignore
    }
  }

  playDoorOpen() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Soft wooden resonance
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.exponentialRampToValueAtTime(260, now + 0.3);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.42);

      // Sweet pastel windchime chord (pentatonic: C, E, G, B)
      const notes = [523.25, 659.25, 783.99, 987.77];
      notes.forEach((freq, idx) => {
        const chimeOsc = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(freq, now + idx * 0.06);
        chimeGain.gain.setValueAtTime(0.04, now + idx * 0.06);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.5);
        chimeOsc.connect(chimeGain);
        chimeGain.connect(this.ctx.destination);
        chimeOsc.start(now + idx * 0.06);
        chimeOsc.stop(now + idx * 0.06 + 0.55);
      });
    } catch {
      // Audio error ignore
    }
  }

  playStep() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110 + Math.random() * 20, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Audio error ignore
    }
  }

  playTrophyChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Arpeggio C5, E5, G5, C6
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((f, i) => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(f, now + i * 0.09);
        g.gain.setValueAtTime(0.07, now + i * 0.09);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.6);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(now + i * 0.09);
        o.stop(now + i * 0.09 + 0.65);
      });
    } catch {
      // Audio error ignore
    }
  }

  toggleAmbientLofi() {
    if (this.isAmbientPlaying) {
      if (this.ambientGain) {
        this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      this.isAmbientPlaying = false;
      return false;
    } else {
      try {
        this.initCtx();
        if (!this.ctx) return false;
        const now = this.ctx.currentTime;
        
        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.025, now);
        this.ambientGain.connect(this.ctx.destination);

        // Warm cozy pad sound using gentle detuned sines
        this.ambientOsc1 = this.ctx.createOscillator();
        this.ambientOsc2 = this.ctx.createOscillator();
        
        this.ambientOsc1.type = 'sine';
        this.ambientOsc2.type = 'triangle';
        
        this.ambientOsc1.frequency.setValueAtTime(196.00, now); // G3
        this.ambientOsc2.frequency.setValueAtTime(293.66, now); // D4

        this.ambientOsc1.connect(this.ambientGain);
        this.ambientOsc2.connect(this.ambientGain);

        this.ambientOsc1.start(now);
        this.ambientOsc2.start(now);
        this.isAmbientPlaying = true;
        return true;
      } catch {
        return false;
      }
    }
  }
}

export const soundManager = new SoundManager();
