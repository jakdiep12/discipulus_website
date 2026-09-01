"use client";

import React, { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  webmSrc?: string;
  mp4Src?: string;
  poster?: string;
  /** Overlay content drawn above the video, e.g. the navbar. */
  children?: React.ReactNode;
}

const DEFAULT_WEBM = "/videos/2026_Spring_web.webm";
const DEFAULT_MP4 = "/videos/2026_Spring_web.mp4";
const DEFAULT_POSTER = "/videos/2026_Spring_poster.jpg";

const CONTROL_CLASS =
  "absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 bg-black/50 backdrop-blur-md text-white/80 hover:text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg flex items-center gap-2 text-[0.7rem] sm:text-[0.8rem] font-medium transition-all duration-200 ease-8vc hover:bg-black/70 min-h-[44px]";

const SpeakerMutedIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-3.707a1 1 0 011.414.07zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const SpeakerOnIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-3.707a1 1 0 011.414.07zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
  </svg>
);

/**
 * The hero loop shared by the home page and the cohort page.
 *
 * Nothing is fetched until the frame is near the viewport, so visitors who
 * bounce or never scroll here never pay for the video at all. Playback pauses
 * once the frame scrolls away, and `prefers-reduced-motion` turns autoplay into
 * an explicit play button rather than starting a download unasked.
 */
const HeroVideo: React.FC<HeroVideoProps> = ({
  webmSrc = DEFAULT_WEBM,
  mp4Src = DEFAULT_MP4,
  poster = DEFAULT_POSTER,
  children,
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLoaded = useRef(false);
  const [attached, setAttached] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setNeedsTap(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible) setAttached(true);
        setShouldPlay(visible);
      },
      { rootMargin: "150px" },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !attached) return;

    // <source> children only take effect after an explicit load().
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      video.muted = true;
      video.load();
    }

    if (shouldPlay) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [attached, shouldPlay]);

  function start() {
    setNeedsTap(false);
    setAttached(true);
    setShouldPlay(true);
  }

  // load() + play() can lose the race on slow connections, leaving the poster
  // up with a video that is ready but paused; picking playback back up on
  // canplay covers that without polling.
  function onCanPlay() {
    const video = videoRef.current;
    if (video && shouldPlay && video.paused) video.play().catch(() => {});
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }

  return (
    <div
      ref={frameRef}
      className="relative w-full aspect-video sm:aspect-auto sm:h-[65vh] md:h-[80vh] lg:h-[90vh] overflow-hidden"
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          onCanPlay={onCanPlay}
        >
          {attached && (
            <>
              <source src={webmSrc} type="video/webm" />
              <source src={mp4Src} type="video/mp4" />
            </>
          )}
        </video>
      </div>
      {/* Bottom fade — blends into navy below */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-navy to-transparent pointer-events-none" />

      {children}

      {needsTap ? (
        <button onClick={start} aria-label="Play video" className={CONTROL_CLASS}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M6 4l10 6-10 6V4z" />
          </svg>
          Play video
        </button>
      ) : (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className={CONTROL_CLASS}
        >
          {isMuted ? <SpeakerMutedIcon /> : <SpeakerOnIcon />}
          {isMuted ? "Unmute" : "Mute"}
        </button>
      )}
    </div>
  );
};

export default HeroVideo;
