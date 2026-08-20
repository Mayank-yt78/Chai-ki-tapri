import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import {
  Play,
  Pause,
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

  const VIDEO_ID = "Mmu-tj-psuk";

  const onReady = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volume);
  };

  const onStateChange = (event) => {
    // 1 = playing
    // 2 = paused

    if (event.data === 1) {
      setIsPlaying(true);
    }

    if (event.data === 2) {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

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

      setCurrentTime(playerRef.current.getCurrentTime());
      setDuration(playerRef.current.getDuration());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);

    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

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
          videoId={VIDEO_ID}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>

      {/* Custom Player UI */}
      <div className="music-player">

        <div className="music-header">

          <div className="music-icon">
            <Music2 size={18} />
          </div>

          <div>
            <p className="now-playing">NOW BREWING</p>

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


        {/* Play Button */}

        <div className="player-controls">

          <button
            className="play-button"
            onClick={togglePlay}
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

        </div>


        {/* Volume */}

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