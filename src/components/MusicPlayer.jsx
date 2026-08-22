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

  // YouTube Playlist ID
  const PLAYLIST_ID =
  "RDCLAK5uy_miAacfMxVybbt7ketqqnPPbH9LDn1TavU";
  // ================= UPDATE SONG INFO =================

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

  // ================= PLAYER READY =================

const onReady = (event) => {
  const player = event.target;

  playerRef.current = player;

  player.setVolume(volume);

  // Get playlist first
  player.cuePlaylist({
    listType: "playlist",
    list: PLAYLIST_ID,
  });

  setTimeout(() => {
    if (!playerRef.current) return;

    const playlist = playerRef.current.getPlaylist();

    if (!playlist || playlist.length === 0) return;

    // Generate random starting index
    const randomIndex = Math.floor(
      Math.random() * playlist.length
    );

    // Now load directly from random song
    playerRef.current.loadPlaylist({
      listType: "playlist",
      list: PLAYLIST_ID,
      index: randomIndex,
      startSeconds: 0,
    });

    // Shuffle remaining playlist
    playerRef.current.setShuffle(true);

    // Loop playlist
    playerRef.current.setLoop(true);
  }, 300);
};
  // ================= PLAYER STATE =================

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

    // ENDED
    if (event.data === 0) {
      setIsPlaying(false);
    }
  };

  // ================= PLAY / PAUSE =================

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  // ================= NEXT SONG =================

  const playNext = () => {
    if (!playerRef.current) return;

    playerRef.current.nextVideo();

    setCurrentTime(0);
    setDuration(0);
  };

  // ================= PREVIOUS SONG =================

  const playPrevious = () => {
    if (!playerRef.current) return;

    playerRef.current.previousVideo();

    setCurrentTime(0);
    setDuration(0);
  };

  // ================= MUTE / UNMUTE =================

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

  // ================= VOLUME =================

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);

    setVolume(newVolume);

    if (!playerRef.current) return;

    playerRef.current.setVolume(newVolume);

    if (newVolume > 0) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  // ================= PROGRESS =================

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

  // ================= SEEK =================

  const handleSeek = (e) => {
    if (!playerRef.current) return;

    const newTime = Number(e.target.value);

    playerRef.current.seekTo(newTime, true);

    setCurrentTime(newTime);
  };

  // ================= FORMAT TIME =================

  const formatTime = (time) => {
    if (!time || !Number.isFinite(time)) {
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
            <span>
              {formatTime(currentTime)}
            </span>

            <span>
              {formatTime(duration)}
            </span>
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