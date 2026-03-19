import VRPanel from "../VRPanel";
import { GameState } from "@/hooks/useGameState";

interface FeedbackSceneProps {
  state: GameState;
  completionPercent: number;
  onRetry: () => void;
  onMainMenu: () => void;
}

const FeedbackScene = ({ state, completionPercent, onRetry, onMainMenu }: FeedbackSceneProps) => {
  const tips = [];
  if (state.skippedSafety) tips.push("Always secure the scene before approaching the victim.");
  if (state.incorrectCall) tips.push("Provide clear location and injury details to emergency services.");
  if (state.breathingMistake) tips.push("Check breathing by observing chest, listening, and feeling for air.");
  if (state.score >= 90) tips.push("Excellent performance! Keep practicing to maintain your skills.");
  if (tips.length === 0) tips.push("Great job! You completed all steps correctly.");

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4 py-8">
      <div className="scene-label mb-4">Scene 8 — Feedback & Results</div>

      <VRPanel title="📊 Training Summary" sceneLabel="Summary Panel" className="w-full max-w-lg mb-6">
        {/* Score */}
        <div className="text-center mb-6">
          <div className={`font-mono text-6xl font-bold mb-1 ${
            state.score >= 80 ? "text-success" : state.score >= 50 ? "text-warning" : "text-destructive"
          }`}>
            {state.score}%
          </div>
          <div className="font-mono text-sm text-muted-foreground">Final Score</div>
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
          <button onClick={onRetry} className="vr-button-primary w-full">
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
    </div>
  );
};

export default FeedbackScene;
