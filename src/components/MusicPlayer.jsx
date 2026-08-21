import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music2,
} from "lucide-react";

function MusicPlayer() {
  const playerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // YouTube Playlist ID
  const PLAYLIST_ID = "PLc7Tj6W0jXh6WJ1pMETh0TVQDcHrA14RH";

  // When YouTube player is ready
  const onReady = (event) => {
    playerRef.current = event.target;

    event.target.setVolume(volume);

    // Load the playlist
    event.target.loadPlaylist({
      listType: "playlist",
      list: PLAYLIST_ID,
      index: 0,
      startSeconds: 0,
    });
  };

  // Track play / pause state
  const onStateChange = (event) => {
    // 1 = PLAYING
    if (event.data === 1) {
      setIsPlaying(true);
    }

    // 2 = PAUSED
    if (event.data === 2) {
      setIsPlaying(false);
    }
  };

  // Play / Pause
  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  // Next song
  const playNext = () => {
    if (!playerRef.current) return;

    playerRef.current.nextVideo();
  };

  // Previous song
  const playPrevious = () => {
    if (!playerRef.current) return;

    playerRef.current.previousVideo();
  };

  // Mute / Unmute
  const toggleMute = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  // Change volume
  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);

    setVolume(newVolume);

    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);

      if (newVolume > 0) {
        playerRef.current.unMute();
        setIsMuted(false);
      }
    }
  };

  // Update song progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (!playerRef.current) return;

      const time = playerRef.current.getCurrentTime();
      const songDuration = playerRef.current.getDuration();

      setCurrentTime(time);
      setDuration(songDuration);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Seek song
  const handleSeek = (e) => {
    if (!playerRef.current) return;

    const newTime = Number(e.target.value);

    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  // Format seconds to mm:ss
  const formatTime = (time) => {
    if (!time) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const opts = {
    height: "1",
    width: "1",

    playerVars: {
      autoplay: 0,
      controls: 0,
      playsinline: 1,
    },
  };

  return (
    <>
      {/* Hidden YouTube Player */}
      <div className="youtube-player">
        <YouTube
          videoId="Mmu-tj-psuk"
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>

      {/* Custom Music Player */}
      <div className="music-player">

        {/* Header */}
        <div className="music-header">

          <div className="music-icon">
            <Music2 size={18} />
          </div>

          <div>
            <p className="now-playing">
              NOW BREWING
            </p>

            <h3>Chai & Chill ☕</h3>

            <span className="song-name">
              Tapri Vibes
            </span>
          </div>

        </div>

        {/* Progress Bar */}
        <div className="progress-section">

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar"
          />

          <div className="time-info">
            <span>{formatTime(currentTime)}</span>

            <span>{formatTime(duration)}</span>
          </div>

        </div>

        {/* Music Controls */}
        <div className="player-controls">

          {/* Previous */}
          <button
            className="skip-button"
            onClick={playPrevious}
            aria-label="Previous song"
          >
            <SkipBack
              size={22}
              fill="currentColor"
            />
          </button>

          {/* Play / Pause */}
          <button
            className="play-button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={24} />
            ) : (
              <Play
                size={24}
                fill="currentColor"
              />
            )}
          </button>

          {/* Next */}
          <button
            className="skip-button"
            onClick={playNext}
            aria-label="Next song"
          >
            <SkipForward
              size={22}
              fill="currentColor"
            />
          </button>

        </div>

        {/* Volume Control */}
        <div className="volume-control">

          <button onClick={toggleMute}>
            {isMuted || volume === 0 ? (
              <VolumeX size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />

        </div>

      </div>
    </>
  );
}

export default MusicPlayer;