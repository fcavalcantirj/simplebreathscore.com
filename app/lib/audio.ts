class AudioManager {
  private static instance: AudioManager;
  private sounds: { [key: string]: HTMLAudioElement } = {};

  private constructor() {
    // Initialize sounds
    this.sounds = {
      inhale: new Audio('/sounds/inhale.mp3'),
      pause: new Audio('/sounds/pause.mp3'),
      exhale: new Audio('/sounds/exhale.mp3'),
      complete: new Audio('/sounds/complete.mp3'),
    };

    // Preload all sounds
    Object.values(this.sounds).forEach(sound => {
      sound.load();
    });
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public playSound(type: 'inhale' | 'pause' | 'exhale' | 'complete'): void {
    const sound = this.sounds[type];
    if (sound) {
      // Reset the sound to the beginning if it's already playing
      sound.currentTime = 0;
      sound.play().catch(error => {
        console.warn('Error playing sound:', error);
      });
    }
  }

  public stopAll(): void {
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
}

export const audioManager = AudioManager.getInstance(); 