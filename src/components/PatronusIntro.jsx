import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

/**
 * Real Harry Potter "Expecto Patronum" Movie Clip Intro:
 * 1. Shows a cinematic Hogwarts incantation prompt.
 * 2. On user gesture / auto-trigger, plays the real movie scene of Harry Potter shouting
 *    "EXPECTO PATRONUM!" by the lake as his Patronus erupts.
 * 3. At the blinding white Patronus flash, smoothly dissolves to unveil the portfolio.
 */
export default function PatronusIntro({ onComplete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const videoRef = useRef(null);

  // Trigger real movie clip playback with full audio
  const startMovieClip = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .catch((err) => {
          console.warn("Autoplay with sound prevented, playing muted:", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
          }
        });
    }
  };

  // When video approaches the blinding white Patronus light explosion
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 13;

    // Start graceful fade-out into the Great Hall as the white light erupts (last 1.5s)
    if (current >= duration - 1.5 && !isFading) {
      setIsFading(true);
    }
  };

  const handleVideoEnded = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 800);
  };

  const handleSkip = (e) => {
    if (e) e.stopPropagation();
    setIsFading(true);
    setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 400);
  };

  // Listen for user interaction (click or keypress) to start playback
  useEffect(() => {
    const handleFirstGesture = () => {
      startMovieClip();
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });

    // Safety timeout: auto-reveal portfolio after 15s in case video hangs
    const safetyTimer = setTimeout(() => {
      handleSkip();
    }, 15000);

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="real-patronus-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: isFading ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none"
      >
        {/* Real Movie Clip Video */}
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL || "/"}harry_expecto_patronum.mp4`}
          playsInline
          preload="auto"
          onError={() => {
            console.warn("Video failed to load or play; transitioning to portfolio");
            handleSkip();
          }}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Ambient Dark Theatre Curtain before playback starts */}
        {!isPlaying && (
          <div
            onClick={startMovieClip}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/95 cursor-pointer px-4 text-center"
          >
            {/* Background glowing particles */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15)_0%,rgba(6,9,17,0.95)_70%,#000000_100%)] pointer-events-none" />

            {/* Glowing Hogwarts Wand Beacon */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                boxShadow: [
                  "0 0 30px rgba(56,189,248,0.4)",
                  "0 0 60px rgba(56,189,248,0.8)",
                  "0 0 30px rgba(56,189,248,0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full bg-cyan-950/80 border-2 border-cyan-300 flex items-center justify-center text-cyan-200 mb-6 shadow-[0_0_40px_rgba(56,189,248,0.5)]"
            >
              <HiSparkles className="text-3xl text-cyan-200 animate-spin" style={{ animationDuration: "8s" }} />
            </motion.div>

            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-cyan-300/80 mb-2">
              The Wizarding World Archives
            </span>

            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-widest uppercase text-white mb-4 drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]">
              Expecto Patronum
            </h1>

            <p className="font-cinzel text-sm sm:text-base text-parchment-muted tracking-wider italic mb-8 max-w-md">
              "You must think of a memory. A very happy memory..."
            </p>

            {/* Play Button */}
            <button
              onClick={startMovieClip}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 border-2 border-cyan-400 hover:border-cyan-200 text-white font-cinzel text-sm tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_50px_rgba(56,189,248,0.9)] hover:scale-105 flex items-center gap-3"
            >
              <span className="text-gold text-lg">⚡</span>
              <span>Cast Spell • Enter Hogwarts</span>
            </button>

            <span className="text-[11px] font-mono text-parchment-faint tracking-widest uppercase mt-4">
              (Click anywhere or tap Space to watch Harry cast the spell)
            </span>
          </div>
        )}

        {/* Blinding Silver Burst as the spell reaches peak intensity */}
        {isFading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-white pointer-events-none z-30"
          />
        )}

        {/* Skip Intro Button */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-30 text-xs font-cinzel tracking-widest text-parchment-faint hover:text-gold uppercase px-3 py-1.5 rounded border border-white/20 hover:border-gold/50 bg-black/40 backdrop-blur-sm transition-all"
        >
          Skip Intro ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
