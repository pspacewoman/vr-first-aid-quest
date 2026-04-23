import { useEffect, useRef } from "react";
import type { Scene } from "./useGameState";

/**
 * Lightweight procedural ambience generator using Web Audio API.
 * No external assets required. Each scene gets a subtle, looping pad
 * to reinforce immersion (driving = pleasant, accident = tense, etc.).
 */

type CueConfig = {
  // Base drone frequencies (Hz) layered together
  freqs: number[];
  // Oscillator type per layer
  type: OscillatorType;
  // Master gain (kept low for "light" cues)
  gain: number;
  // Optional slow LFO modulation depth (Hz)
  lfoDepth?: number;
  lfoRate?: number;
  // Optional noise layer (e.g. road hiss, tension)
  noise?: { gain: number; filterFreq: number };
  // Optional periodic pulse (e.g. siren-ish blip)
  pulse?: { freq: number; intervalMs: number; durationMs: number; gain: number };
};

const SCENE_CUES: Partial<Record<Scene, CueConfig>> = {
  "main-menu": {
    // Calm, welcoming "lobby" chord (A3 + C#4 + E4)
    freqs: [220, 277.2, 329.6],
    type: "sine",
    gain: 0.035,
    lfoDepth: 1.5,
    lfoRate: 0.12,
  },
  "rescue-chain": {
    // Focused, instructional — open fifth pad
    freqs: [146.8, 220, 293.6],
    type: "triangle",
    gain: 0.03,
    lfoDepth: 0.8,
    lfoRate: 0.07,
  },
  driving: {
    // Pleasant motion — bright pad + prominent road hiss
    freqs: [196, 293.6, 392],
    type: "sine",
    gain: 0.04,
    lfoDepth: 1,
    lfoRate: 0.2,
    noise: { gain: 0.05, filterFreq: 900 },
  },
  accident: {
    // Serious / tense — dissonant low sawtooth + dark rumble
    freqs: [55, 82.4, 87.3],
    type: "sawtooth",
    gain: 0.06,
    lfoDepth: 5,
    lfoRate: 0.3,
    noise: { gain: 0.04, filterFreq: 220 },
  },
  "safety-actions": {
    // Alert beacon — square pulse evoking warning lights
    freqs: [261.6, 392],
    type: "square",
    gain: 0.025,
    lfoDepth: 4,
    lfoRate: 0.6,
    pulse: { freq: 880, intervalMs: 1400, durationMs: 90, gain: 0.04 },
  },
  "emergency-call": {
    // Phone-line dial tone bed (350Hz + 440Hz like real telephony)
    freqs: [350, 440],
    type: "sine",
    gain: 0.03,
    lfoDepth: 0,
    lfoRate: 0,
    pulse: { freq: 480, intervalMs: 2000, durationMs: 250, gain: 0.025 },
  },
  "victim-assessment": {
    // Heartbeat-like pulse over a low, anxious pad
    freqs: [98, 146.8],
    type: "triangle",
    gain: 0.03,
    lfoDepth: 2,
    lfoRate: 0.18,
    pulse: { freq: 55, intervalMs: 850, durationMs: 140, gain: 0.09 },
  },
  feedback: {
    // Resolution chord — major triad C/E/G
    freqs: [261.6, 329.6, 392, 523.2],
    type: "sine",
    gain: 0.04,
    lfoDepth: 0.6,
    lfoRate: 0.08,
  },
  readiness: {
    // Triumphant — bright triangle stack
    freqs: [329.6, 493.9, 659.3],
    type: "triangle",
    gain: 0.045,
    lfoDepth: 1,
    lfoRate: 0.15,
  },
  "unity-preview": {
    // Cinematic / sci-fi reveal
    freqs: [110, 164.8, 246.9, 329.6],
    type: "sawtooth",
    gain: 0.025,
    lfoDepth: 2.5,
    lfoRate: 0.05,
    noise: { gain: 0.015, filterFreq: 1200 },
  },
};

function createNoiseBuffer(ctx: AudioContext, seconds = 2): AudioBuffer {
  const length = ctx.sampleRate * seconds;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

export function useSceneAudio(scene: Scene, muted: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    // Tear down previous scene's audio
    nodesRef.current?.stop();
    nodesRef.current = null;

    if (muted) return;
    const cue = SCENE_CUES[scene];
    if (!cue) return;

    // Lazy-create the AudioContext on first scene mount
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      ctxRef.current = new AC();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    // Gentle fade-in
    master.gain.linearRampToValueAtTime(cue.gain, ctx.currentTime + 1.2);

    const stoppers: Array<() => void> = [];

    // Drone layers
    cue.freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = cue.type;
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 1 / cue.freqs.length;
      osc.connect(g).connect(master);

      if (cue.lfoDepth && cue.lfoRate) {
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = cue.lfoRate + i * 0.03;
        lfoGain.gain.value = cue.lfoDepth;
        lfo.connect(lfoGain).connect(osc.frequency);
        lfo.start();
        stoppers.push(() => lfo.stop());
      }
      osc.start();
      stoppers.push(() => osc.stop());
    });

    // Noise layer
    if (cue.noise) {
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 2);
      noise.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = cue.noise.filterFreq;
      const ng = ctx.createGain();
      ng.gain.value = cue.noise.gain;
      noise.connect(filter).connect(ng).connect(master);
      noise.start();
      stoppers.push(() => noise.stop());
    }

    // Pulse layer (e.g. heartbeat)
    let pulseInterval: number | null = null;
    if (cue.pulse) {
      const fire = () => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = cue.pulse!.freq;
        g.gain.value = 0;
        osc.connect(g).connect(master);
        const t = ctx.currentTime;
        g.gain.linearRampToValueAtTime(cue.pulse!.gain, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + cue.pulse!.durationMs / 1000);
        osc.start(t);
        osc.stop(t + cue.pulse!.durationMs / 1000 + 0.05);
      };
      fire();
      pulseInterval = window.setInterval(fire, cue.pulse.intervalMs);
    }

    nodesRef.current = {
      stop: () => {
        if (pulseInterval) clearInterval(pulseInterval);
        try {
          master.gain.cancelScheduledValues(ctx.currentTime);
          master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        } catch {
          // noop
        }
        setTimeout(() => {
          stoppers.forEach((s) => {
            try {
              s();
            } catch {
              // noop
            }
          });
          try {
            master.disconnect();
          } catch {
            // noop
          }
        }, 500);
      },
    };

    return () => {
      nodesRef.current?.stop();
      nodesRef.current = null;
    };
  }, [scene, muted]);

  // Close context on unmount
  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
    };
  }, []);
}