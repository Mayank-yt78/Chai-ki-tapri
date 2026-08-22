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

  // Prevent initial playlist logic from running multiple times
  const hasInitialized = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [songTitle, setSongTitle] = useState("Loading...");
  const [thumbnail, setThumbnail] = useState("");

  const PLAYLIST_ID =
    "RDCLAK5uy_miAacfMxVybbt7ketqqnPPbH9LDn1TavU";

  // ================= UPDATE SONG INFO =================

  const updateSongInfo = () => {
    const player = playerRef.current;

    if (!player) return;

    const videoData = player.getVideoData();

    if (videoData?.title) {
      setSongTitle(videoData.title);
    }

    if (videoData?.video_id) {
      setThumbnail(
        `https://img.youtube.com/vi/${videoData.video_id}/hqdefault.jpg`
      );
    }

    const videoDuration = player.getDuration();

    if (
      Number.isFinite(videoDuration) &&
      videoDuration > 0
    ) {
      setDuration(videoDuration);
    }
  };

  // ================= PLAYER READY =================

  const onReady = (event) => {
    const player = event.target;

    playerRef.current = player;

    player.setVolume(volume);

    // Load playlist without immediately playing
    player.cuePlaylist({
      listType: "playlist",
      list: PLAYLIST_ID,
      index: 0,
    });
  };

  // ================= PLAYER STATE =================

  const onStateChange = (event) => {
    const player = playerRef.current;

    if (!player) return;

    /*
      -1 = UNSTARTED
       0 = ENDED
       1 = PLAYING
       2 = PAUSED
       3 = BUFFERING
       5 = VIDEO CUED
    */

    // Playlist/video is ready
    if (event.data === 5 && !hasInitialized.current) {
      const playlist = player.getPlaylist();

      if (!playlist || playlist.length === 0) return;

      hasInitialized.current = true;

      // Choose a random song
      const randomIndex = Math.floor(
        Math.random() * playlist.length
      );

      // Try YouTube shuffle for subsequent songs
      player.setShuffle(true);
      player.setLoop(true);

      // Load the random song
      player.playVideoAt(randomIndex);

      // Wait for video metadata
      setTimeout(() => {
        updateSongInfo();
      }, 700);
    }

    // PLAYING
    if (event.data === 1) {
      setIsPlaying(true);

      updateSongInfo();
    }

    // PAUSED
    if (event.data === 2) {
      setIsPlaying(false);
    }

    // BUFFERING
    if (event.data === 3) {
      setTimeout(() => {
        updateSongInfo();
      }, 500);
    }

    // ENDED
    if (event.data === 0) {
      setIsPlaying(false);
    }
  };

  // ================= PLAY / PAUSE =================

  const togglePlay = () => {
    const player = playerRef.current;

    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  // ================= NEXT =================

  const playNext = () => {
    const player = playerRef.current;

    if (!player) return;

    setCurrentTime(0);
    setDuration(0);

    player.nextVideo();

    setTimeout(() => {
      updateSongInfo();
    }, 700);
  };

  // ================= PREVIOUS =================

  const playPrevious = () => {
    const player = playerRef.current;

    if (!player) return;

    setCurrentTime(0);
    setDuration(0);

    player.previousVideo();

    setTimeout(() => {
      updateSongInfo();
    }, 700);
  };

  // ================= MUTE =================

  const toggleMute = () => {
    const player = playerRef.current;

    if (!player) return;

    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  // ================= VOLUME =================

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);

    setVolume(newVolume);

    const player = playerRef.current;

    if (!player) return;

    player.setVolume(newVolume);

    if (newVolume > 0) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  // ================= PROGRESS =================

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;

      if (!player) return;

      const time = player.getCurrentTime();
      const videoDuration = player.getDuration();

      if (Number.isFinite(time)) {
        setCurrentTime(time);
      }

      if (
        Number.isFinite(videoDuration) &&
        videoDuration > 0
      ) {
        setDuration(videoDuration);
      }

      // Update title/image as soon as metadata is available
      const videoData = player.getVideoData();

      if (videoData?.title && songTitle === "Loading...") {
        updateSongInfo();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [songTitle]);

  // ================= SEEK =================

  const handleSeek = (e) => {
    const player = playerRef.current;

    if (!player) return;

    const newTime = Number(e.target.value);

    player.seekTo(newTime, true);

    setCurrentTime(newTime);
  };

  // ================= FORMAT TIME =================

  const formatTime = (time) => {
    if (!Number.isFinite(time) || time <= 0) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // ================= YOUTUBE OPTIONS =================

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
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>

      {/* Custom Music Player */}

      <div className="music-player">
        {/* Song Info */}

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
            value={Math.min(currentTime, duration || 0)}
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