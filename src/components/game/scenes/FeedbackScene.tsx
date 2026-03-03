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
  if (state.score >= 90) tips.push("Excellent performance! Keep practicing to maintain your skills.");
  if (tips.length === 0) tips.push("Great job! You completed all steps correctly.");

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4">
      <div className="scene-label mb-6">Scene 8 — Feedback & Results</div>

      <VRPanel title="📊 Training Summary" sceneLabel="Summary Panel" className="w-full max-w-lg">
        {/* Score */}
        <div className="text-center mb-6">
          <div className="font-mono text-6xl font-bold text-foreground mb-1">
            {state.score}%
          </div>
          <div className="font-mono text-sm text-muted-foreground">Final Score</div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="border border-dashed border-border rounded-sm p-3 text-center">
            <div className="font-mono text-lg text-foreground">{formatTime(state.elapsedTime)}</div>
            <div className="font-mono text-xs text-muted-foreground">Time</div>
          </div>
          <div className="border border-dashed border-border rounded-sm p-3 text-center">
            <div className="font-mono text-lg text-destructive">{state.mistakes}</div>
            <div className="font-mono text-xs text-muted-foreground">Mistakes</div>
          </div>
          <div className="border border-dashed border-border rounded-sm p-3 text-center">
            <div className="font-mono text-lg text-foreground">{completionPercent}%</div>
            <div className="font-mono text-xs text-muted-foreground">Checklist</div>
          </div>
        </div>

        {/* Checklist summary */}
        <div className="space-y-2 mb-6">
          {state.checklist.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-2 font-mono text-xs ${
                item.completed ? "text-success" : "text-destructive"
              }`}
            >
              <span>{item.completed ? "☑" : "☐"}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="border border-dashed border-border rounded-sm p-4 mb-6">
          <div className="font-mono text-xs text-muted-foreground mb-2 uppercase tracking-wider">
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
    </div>
  );
};

export default FeedbackScene;
