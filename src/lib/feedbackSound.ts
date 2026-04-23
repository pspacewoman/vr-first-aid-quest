/**
 * Lightweight procedural SFX for correct/incorrect interactions.
 * Shares a single AudioContext across the app; respects the global
 * mute toggle (driven from GameContainer).
 */

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

export function setFeedbackMuted(value: boolean) {
  muted = value;
}

/** Pleasant two-note rising chime for correct answers. */
export function playCorrect() {
  if (muted) return;
  const c = getCtx();
  if (!c) return;
  const now = c.currentTime;
  const notes = [
    { freq: 659.25, start: 0, dur: 0.18 }, // E5
    { freq: 880.0, start: 0.12, dur: 0.28 }, // A5
  ];
  notes.forEach((n) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.value = n.freq;
    gain.gain.value = 0;
    osc.connect(gain).connect(c.destination);
    const t = now + n.start;
    gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + n.dur);
    osc.start(t);
    osc.stop(t + n.dur + 0.05);
  });
}

/** Short low buzzer for wrong answers. */
export function playWrong() {
  if (muted) return;
  const c = getCtx();
  if (!c) return;
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.32);
  gain.gain.value = 0;
  osc.connect(gain).connect(c.destination);
  gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.25);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
  osc.start(now);
  osc.stop(now + 0.45);
}