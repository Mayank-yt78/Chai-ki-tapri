import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

function MusicPlayer() {
  const playerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [songTitle, setSongTitle] = useState("Loading...");
  const [thumbnail, setThumbnail] = useState("");

  // Working YouTube Playlist
  const PLAYLIST_ID = "PLcVfz1-_0rj_JexCJ4hcRldpO-yzOfM7f";

  // Update current song information
  const updateSongInfo = () => {
    if (!playerRef.current) return;

    const videoData = playerRef.current.getVideoData();
    const videoId = videoData.video_id;

    if (videoData.title) {
      setSongTitle(videoData.title);
    }

    if (videoId) {
      setThumbnail(
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      );
    }
  };

  // YouTube player ready
  const onReady = (event) => {
    playerRef.current = event.target;

    event.target.setVolume(volume);

    // Load playlist
    event.target.loadPlaylist({
      listType: "playlist",
      list: PLAYLIST_ID,
      index: 0,
      startSeconds: 0,
    });
  };

  // Player state changes
  const onStateChange = (event) => {
    // PLAYING
    if (event.data === 1) {
      setIsPlaying(true);
      updateSongInfo();
    }

    // PAUSED
    if (event.data === 2) {
      setIsPlaying(false);
    }

    // Video changed / ended
    if (event.data === 0) {
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

    // Reset progress while next song loads
    setCurrentTime(0);
    setDuration(0);
  };

  // Previous song
  const playPrevious = () => {
    if (!playerRef.current) return;

    playerRef.current.previousVideo();

    // Reset progress while previous song loads
    setCurrentTime(0);
    setDuration(0);
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

  // Volume change
  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);

    setVolume(newVolume);

    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);

      if (newVolume > 0) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        setIsMuted(true);
      }
    }
  };

  // Update progress every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      if (!playerRef.current) return;

      setCurrentTime(
        playerRef.current.getCurrentTime()
      );

      setDuration(
        playerRef.current.getDuration()
      );
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

  // Format seconds → mm:ss
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

        {/* Current Song */}
        <div className="music-header">

          {thumbnail && (
            <img
              src={thumbnail}
              alt={songTitle}
              className="song-thumbnail"
            />
          )}

          <div className="song-details">
            <p className="now-playing">
              NOW BREWING
            </p>

            <h3 title={songTitle}>
              {songTitle}
            </h3>

            <span className="song-name">
              Chai Ki Tapri Radio ☕
            </span>
          </div>

        </div>

        {/* Progress */}
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

        {/* Controls */}
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
            aria-label={
              isPlaying ? "Pause" : "Play"
            }
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

        {/* Volume */}
        <div className="volume-control">

          <button
            onClick={toggleMute}
            aria-label="Mute"
          >
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