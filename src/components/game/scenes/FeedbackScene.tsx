import { useEffect, useState } from "react";
import VRPanel from "../VRPanel";
import { GameState } from "@/hooks/useGameState";

interface FeedbackSceneProps {
  state: GameState;
  completionPercent: number;
  totalScore: number;
  onRetry: () => void;
  onMainMenu: () => void;
  onReadiness: () => void;
  onUnityPreview: () => void;
}

const FeedbackScene = ({ state, completionPercent, totalScore, onRetry, onMainMenu, onReadiness, onUnityPreview }: FeedbackSceneProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedScore(Math.round(totalScore * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [totalScore]);

  const tips = [];
  if (state.skippedSafety) tips.push("Always secure the scene before approaching the victim.");
  if (state.incorrectCall) tips.push("Provide clear location and injury details to emergency services.");
  if (state.breathingMistake) tips.push("Check breathing by observing chest, listening, and feeling for air.");
  if (state.firstAidTimedOut) tips.push("Act quickly — every second counts in a real emergency.");
  if (totalScore >= 90) tips.push("Excellent performance! Keep practicing to maintain your skills.");
  if (tips.length === 0) tips.push("Great job! You completed all steps correctly.");

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4 py-8">
      <div className="scene-label mb-4">Scene 8 — Feedback & Results</div>

      <VRPanel title="📊 Training Summary" sceneLabel="Summary Panel" className="w-full max-w-lg mb-6 relative overflow-hidden">
        {totalScore >= 80 && (
          <div className="pointer-events-none absolute inset-0 text-2xl select-none">
            {["🎉","✨","🎊","⭐","💫","🎉","✨"].map((e, i) => (
              <span
                key={i}
                className="absolute float-anim"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${5 + (i % 3) * 8}%`,
                  animationDelay: `${i * 0.25}s`,
                  animationDuration: `${2.5 + (i % 3) * 0.5}s`,
                }}
              >
                {e}
              </span>
            ))}
          </div>
        )}
        {/* Total Score */}
        <div className="text-center mb-6 relative">
          <div className={`font-mono text-6xl font-bold mb-1 ${
            totalScore >= 80 ? "text-success" : totalScore >= 50 ? "text-warning" : "text-destructive"
          }`}>
            {animatedScore}%
          </div>
          <div className="font-mono text-sm text-muted-foreground">Total Score</div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="border border-border/40 rounded-lg p-3 text-center bg-muted/30">
            <div className="font-mono text-lg text-foreground">{formatTime(state.elapsedTime)}</div>
            <div className="font-mono text-xs text-muted-foreground">Time</div>
          </div>
          <div className="border border-border/40 rounded-lg p-3 text-center bg-muted/30">
            <div className="font-mono text-lg text-destructive">{state.mistakes}</div>
            <div className="font-mono text-xs text-muted-foreground">Mistakes</div>
          </div>
          <div className="border border-border/40 rounded-lg p-3 text-center bg-muted/30">
            <div className="font-mono text-lg text-primary">{completionPercent}%</div>
            <div className="font-mono text-xs text-muted-foreground">Checklist</div>
          </div>
        </div>

        {/* Per-step Score Breakdown */}
        <div className="border border-border/40 rounded-lg p-4 mb-4 bg-muted/20">
          <div className="font-mono text-xs text-primary/70 mb-3 uppercase tracking-wider">
            Score Breakdown by Step
          </div>
          <div className="space-y-2.5">
            {state.rescueChain.map((step) => {
              const pct = step.maxScore > 0 ? Math.round((step.earnedScore / step.maxScore) * 100) : 0;
              return (
                <div key={step.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-foreground/80 flex items-center gap-1.5">
                      <span>{step.icon}</span> {step.label}
                    </span>
                    <span className={`text-xs font-mono font-bold ${
                      step.earnedScore === step.maxScore ? "text-success" : step.earnedScore > 0 ? "text-warning" : "text-destructive"
                    }`}>
                      {step.earnedScore}/{step.maxScore} pts ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        step.earnedScore === step.maxScore ? "bg-success" : step.earnedScore > 0 ? "bg-warning" : "bg-destructive/40"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <div className="border border-border/40 rounded-lg p-4 mb-4 bg-primary/5">
          <div className="font-mono text-xs text-primary/70 mb-2 uppercase tracking-wider">
            Tips for Improvement
          </div>
          {tips.map((tip, i) => (
            <div key={i} className="font-mono text-xs text-foreground/80 mb-1">
              → {tip}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          {totalScore >= 80 && (
            <button
              onClick={onUnityPreview}
              className="vr-button-primary w-full pulse-border bg-gradient-to-r from-success/30 via-primary/30 to-success/30 border-success/50"
            >
              🥽 Preview Unity VR Prototype (Unlocked)
            </button>
          )}
          <button onClick={onReadiness} className="vr-button-primary w-full pulse-border">
            ▶ View Readiness Assessment
          </button>
          <button onClick={onRetry} className="vr-button w-full">
            ↻ Retry Training
          </button>
          <button onClick={onMainMenu} className="vr-button w-full">
            ← Exit to Main Menu
          </button>
        </div>
      </VRPanel>

      {/* Rescue Chain Completion */}
      <VRPanel title="🔗 Rescue Chain Review" className="w-full max-w-lg">
        <div className="space-y-2">
          {state.rescueChain.map((step, i) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                step.completed && step.correct
                  ? "border-success/40 bg-success/10"
                  : step.completed && !step.correct
                  ? "border-warning/40 bg-warning/10"
                  : "border-destructive/30 bg-destructive/5"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                step.completed && step.correct
                  ? "bg-success/20 border border-success/40"
                  : step.completed && !step.correct
                  ? "bg-warning/20 border border-warning/40"
                  : "bg-destructive/10 border border-destructive/30"
              }`}>
                {step.icon}
              </div>
              <div className="flex-1">
                <div className="font-mono text-xs font-bold text-foreground">
                  {i + 1}. {step.label}
                </div>
              </div>
              <div className={`font-mono text-xs font-bold ${
                step.completed && step.correct
                  ? "text-success"
                  : step.completed && !step.correct
                  ? "text-warning"
                  : "text-destructive"
              }`}>
                {step.completed && step.correct ? "✓ Correct" : step.completed ? "⚠ Errors" : "✕ Missed"}
              </div>
            </div>
          ))}
        </div>
      </VRPanel>

      <div className="w-full max-w-lg mt-6 text-[11px] text-muted-foreground italic leading-relaxed text-center px-2">
        <strong className="text-warning not-italic">NDA Disclosure:</strong> This prototype, your assessment results,
        and all associated training content are confidential and shared under a Non-Disclosure Agreement. Do not
        reproduce, distribute, or share any part of this application without prior written consent from the developer.
      </div>
    </div>
  );
};

export default FeedbackScene;
