import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

const AudioContext = createContext(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const rafRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5); // Default volume 50%
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [showLyrics, setShowLyrics] = useState(true); // Lyric visibility
  const [currentTime, setCurrentTime] = useState(0); // Current playback time

  // Initialize audio element
  if (!audioRef.current) {
    audioRef.current = new Audio(`${import.meta.env.BASE_URL}music.mp3`);
    audioRef.current.loop = true;
    audioRef.current.volume = 0; // Start at 0 for fade-in
  }

  // Fade-in effect: gradually increase volume from 0 to target
  const fadeIn = useCallback((targetVolume = 0.4, duration = 8000) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const audio = audioRef.current;
    const steps = 30; // Number of volume increments
    const increment = targetVolume / steps;
    const interval = duration / steps;
    let currentStep = 0;

    audio.volume = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVolume = Math.min(currentStep * increment, targetVolume);
      audio.volume = newVolume;

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }, interval);
  }, []);

  // Start music playback with fade-in
  const start = useCallback(async () => {
    const audio = audioRef.current;

    try {
      await audio.play();
      setIsPlaying(true);
      fadeIn(isMuted ? 0 : volume);
      return { success: true };
    } catch (error) {
      console.error('Autoplay blocked:', error);
      return { success: false, error };
    }
  }, [volume, isMuted, fadeIn]);

  // Toggle play/pause
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);

        // If starting from paused state, set volume immediately (no fade-in)
        audio.volume = isMuted ? 0 : volume;
      } catch (error) {
        console.error('Playback error:', error);
      }
    }
  }, [isPlaying, volume, isMuted]);

  // Set volume
  const setVolume = useCallback((newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);

    if (audioRef.current && !isMuted) {
      audioRef.current.volume = clampedVolume;
    }
  }, [isMuted]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;

    if (isMuted) {
      // Unmute
      audio.volume = volume;
      setIsMuted(false);
    } else {
      // Mute
      setPreviousVolume(volume);
      audio.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  // Toggle lyrics visibility
  const toggleLyrics = useCallback(() => {
    setShowLyrics(prev => !prev);
  }, []);

  // RAF loop to track currentTime for lyric sync
  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current && isPlaying) {
        setCurrentTime(audioRef.current.currentTime);
      }
      rafRef.current = requestAnimationFrame(updateTime);
    };

    if (isPlaying) {
      rafRef.current = requestAnimationFrame(updateTime);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPlaying]);

  const value = {
    isPlaying,
    volume,
    isMuted,
    showLyrics,
    currentTime,
    audioElement: audioRef.current,
    start,
    togglePlay,
    setVolume,
    toggleMute,
    toggleLyrics,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
