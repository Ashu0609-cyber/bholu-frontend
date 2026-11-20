import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

/**
 * Synthesizes a cinema-grade Patronus spell sound using Web Audio API:
 * 1. Deep cinematic sub-bass shockwave thump
 * 2. Ethereal silver harmonic shimmer (432Hz / 864Hz resonance)
 * 3. High-frequency celestial crystal chime sweep
 */
function playPatronusAudioFX() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const now = ctx.currentTime;

    // 1. Deep Sub-bass Impact / Shockwave
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(110, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 1.6);

    subGain.gain.setValueAtTime(0.01, now);
    subGain.gain.linearRampToValueAtTime(0.6, now + 0.08);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 2.3);

    // 2. Ethereal Silver Shimmer (Harmonic Chord)
    const frequencies = [432, 648, 864, 1296];
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, now + 0.1);
      osc.frequency.linearRampToValueAtTime(freq * 1.05, now + 2.0);

      gain.gain.setValueAtTime(0.001, now + 0.1);
      gain.gain.linearRampToValueAtTime(0.18 / (idx + 1), now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.6);

      if (panner) {
        panner.pan.setValueAtTime((idx - 1.5) * 0.4, now);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(ctx.destination);
      } else {
        osc.connect(gain);
        gain.connect(ctx.destination);
      }

      osc.start(now + 0.1);
      osc.stop(now + 2.7);
    });

    // 3. Shimmering Crystal Wand Sparkle (Bandpass filtered noise sweep)
    const sparkleOsc = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkleOsc.type = "sawtooth";
    sparkleOsc.frequency.setValueAtTime(1800, now + 0.2);
    sparkleOsc.frequency.exponentialRampToValueAtTime(3600, now + 1.8);

    sparkleGain.gain.setValueAtTime(0.001, now + 0.2);
    sparkleGain.gain.linearRampToValueAtTime(0.08, now + 0.5);
    sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    const bpf = ctx.createBiquadFilter();
    bpf.type = "bandpass";
    bpf.frequency.setValueAtTime(2400, now);
    bpf.Q.setValueAtTime(6, now);

    sparkleOsc.connect(bpf);
    bpf.connect(sparkleGain);
    sparkleGain.connect(ctx.destination);

    sparkleOsc.start(now + 0.2);
    sparkleOsc.stop(now + 2.1);
  } catch (err) {
    console.warn("Web Audio FX blocked or unavailable:", err);
  }
}

/**
 * Speaks "Expecto Patronum!" using Web Speech Synthesis.
 * Prefers British English (en-GB) voices to capture the authentic Hogwarts incantation.
 */
function speakExpectoPatronum() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel(); // clear previous queues

    const utterance = new SpeechSynthesisUtterance("Expecto Patronum!");
    utterance.rate = 0.86; // deliberate, powerful pace
    utterance.pitch = 0.92; // heroic pitch
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    // Prioritize British voices for authentic Harry Potter casting
    const britishVoice = voices.find(
      (v) =>
        (v.lang === "en-GB" || v.lang.startsWith("en-GB")) &&
        (v.name.toLowerCase().includes("male") ||
          v.name.toLowerCase().includes("george") ||
          v.name.toLowerCase().includes("daniel") ||
          v.name.toLowerCase().includes("oliver"))
    ) || voices.find((v) => v.lang === "en-GB") || voices.find((v) => v.lang.startsWith("en"));

    if (britishVoice) {
      utterance.voice = britishVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("Speech synthesis error:", err);
  }
}

export default function PatronusIntro({ onComplete }) {
  const [stage, setStage] = useState("ready"); // 'ready' | 'casting' | 'revealing' | 'done'
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioTriggeredRef = useRef(false);

  // Cast the spell: triggers voice, audio FX, shockwave light, and fades out
  const castSpell = () => {
    if (audioTriggeredRef.current) return;
    audioTriggeredRef.current = true;
    setHasInteracted(true);
    setStage("casting");

    // 1. Play magical sound FX and speak incantation
    playPatronusAudioFX();
    speakExpectoPatronum();

    // 2. Expand silver light shockwave after spell vocalization
    setTimeout(() => {
      setStage("revealing");
    }, 1200);

    // 3. Fade out completely and unveil portfolio
    setTimeout(() => {
      setStage("done");
      if (onComplete) onComplete();
    }, 2800);
  };

  // Attempt automatic casting on mount if permitted by browser,
  // or listen for any key / click interaction
  useEffect(() => {
    // Attempt instant cast on first user gesture anywhere
    const handleFirstGesture = () => {
      castSpell();
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });

    // Fallback: If no interaction happens after 5s, gently fade out so user isn't stuck
    const autoTimer = setTimeout(() => {
      if (!audioTriggeredRef.current) {
        castSpell();
      }
    }, 4500);

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      clearTimeout(autoTimer);
    };
  }, []);

  if (stage === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="patronus-overlay"
        initial={{ opacity: 1 }}
        animate={{
          opacity: stage === "revealing" ? 0 : 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none cursor-pointer"
        onClick={castSpell}
      >
        {/* Deep Gothic Midnight Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.18)_0%,rgba(6,9,17,0.95)_60%,#000000_100%)]" />

        {/* Floating Silver Patronus Mist Particles */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full bg-cyan-400/10 blur-[100px] top-1/4 left-1/4 animate-pulse" />
          <div className="absolute w-[32rem] h-[32rem] rounded-full bg-silver/15 blur-[120px] bottom-1/4 right-1/4 animate-pulse" style={{ animationDuration: '4s' }} />
        </div>

        {/* Center Wand & Incantation Chamber */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl">
          {/* Wand Light Apex */}
          <div className="relative mb-8">
            {/* Pulsing Silver Core */}
            <motion.div
              animate={{
                scale: stage === "casting" ? [1, 2.5, 30] : [1, 1.25, 1],
                opacity: stage === "casting" ? [1, 1, 0.9] : [0.7, 1, 0.7],
              }}
              transition={{
                duration: stage === "casting" ? 1.4 : 2,
                repeat: stage === "casting" ? 0 : Infinity,
                ease: "easeOut",
              }}
              className="w-16 h-16 rounded-full bg-cyan-200/90 shadow-[0_0_50px_20px_rgba(56,189,248,0.8),0_0_100px_40px_rgba(255,255,255,0.9)] flex items-center justify-center border-2 border-white"
            >
              <HiSparkles className="text-midnight text-2xl animate-spin" style={{ animationDuration: '6s' }} />
            </motion.div>

            {/* Concentric Ethereal Silver Rings (Patronus Shockwave) */}
            {stage === "casting" && (
              <>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0.9 }}
                  animate={{ scale: 25, opacity: 0 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-4 border-cyan-200/80 pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 0.2, opacity: 1 }}
                  animate={{ scale: 35, opacity: 0 }}
                  transition={{ duration: 2.2, delay: 0.2, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-white/90 pointer-events-none"
                />
              </>
            )}
          </div>

          {/* Incantation Typography */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: stage === "casting" ? 1.08 : 1,
                textShadow:
                  stage === "casting"
                    ? "0 0 30px rgba(56,189,248,1), 0 0 60px rgba(255,255,255,1), 0 0 90px rgba(186,230,253,0.9)"
                    : "0 0 15px rgba(197,160,89,0.4)",
              }}
              transition={{ duration: 0.6 }}
              className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-widest uppercase text-white"
            >
              {stage === "casting" ? "EXPECTO PATRONUM!" : "EXPECTO PATRONUM"}
            </motion.h1>
          </div>

          {/* Subtext Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === "casting" ? 0 : 0.85 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="font-cinzel text-sm sm:text-base text-parchment-muted tracking-wider italic">
              "Focus your happiest memory..."
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                castSpell();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-midnight/80 border border-cyan-400/50 hover:border-cyan-300 text-cyan-200 hover:text-white font-cinzel text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] flex items-center gap-2 group"
            >
              <span className="text-gold group-hover:scale-125 transition-transform">⚡</span>
              <span>Cast Spell to Enter Hogwarts</span>
            </button>

            <span className="text-[11px] font-mono text-parchment-faint tracking-widest uppercase mt-2">
              (Click anywhere or press any key)
            </span>
          </motion.div>
        </div>

        {/* Skip Button in Top-Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setStage("done");
            if (onComplete) onComplete();
          }}
          className="absolute top-6 right-6 z-20 text-xs font-cinzel tracking-widest text-parchment-faint hover:text-gold uppercase px-3 py-1.5 rounded border border-white/10 hover:border-gold/40 transition-all"
        >
          Skip Intro ✕
        </button>

        {/* Blinding Silver Burst on Unveil */}
        {stage === "revealing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0] }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-t from-cyan-100 via-white to-cyan-50 pointer-events-none z-30"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
