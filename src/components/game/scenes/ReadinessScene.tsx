import VRPanel from "../VRPanel";
import readinessBadge from "@/assets/readiness-badge.png";

interface ReadinessSceneProps {
  totalScore: number;
  onRetry: () => void;
  onMainMenu: () => void;
}

const ReadinessScene = ({ totalScore, onRetry, onMainMenu }: ReadinessSceneProps) => {
  const isReady = totalScore >= 80;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4 py-8">
      <div className="scene-label mb-4">Readiness Assessment</div>

      <VRPanel className="w-full max-w-lg text-center mb-6">
        {/* Big status */}
        <div className="mb-6">
          <img src={readinessBadge} alt="Readiness badge" className={`w-24 h-24 mx-auto mb-2 ${isReady ? "animate-bounce" : "opacity-40 grayscale"}`} />
          <h2 className={`font-mono text-2xl font-bold mb-2 ${isReady ? "text-success" : "text-warning"}`}>
            {isReady ? "READY FOR UNITY PROTOTYPE" : "MORE PRACTICE NEEDED"}
          </h2>
          <div className="font-mono text-sm text-muted-foreground mb-4">
            Your Score: <span className={`font-bold text-lg ${isReady ? "text-success" : "text-warning"}`}>{totalScore}%</span>
            <span className="text-muted-foreground"> / 80% required</span>
          </div>

          {/* Progress to readiness */}
          <div className="w-full max-w-xs mx-auto mb-4">
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden relative">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${isReady ? "bg-success" : "bg-warning"}`}
                style={{ width: `${Math.min(totalScore, 100)}%` }}
              />
              {/* 80% threshold marker */}
              <div className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-foreground/50" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1">
              <span>0%</span>
              <span className="text-foreground/60">80% threshold</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {isReady ? (
          <div className="space-y-4 mb-6">
            <div className="bg-success/10 border border-success/30 rounded-lg p-4">
              <div className="font-mono text-sm text-success font-bold mb-2">✓ Qualification Achieved</div>
              <p className="text-xs text-foreground/80">
                You have demonstrated sufficient knowledge of the rescue chain. 
                You are now eligible to proceed with the <strong>high-fidelity Unity VR prototype</strong> for 
                realistic emergency medical training on Meta Quest 3.
              </p>
            </div>

            <div className="bg-card border border-border/40 rounded-lg p-4">
              <div className="font-mono text-xs text-primary/70 uppercase tracking-wider mb-3">Next Steps</div>
              <div className="space-y-2 text-left">
                <div className="flex items-start gap-2 text-xs font-mono">
                  <span className="text-success mt-0.5">1.</span>
                  <span>Install Unity 2022.3 LTS with XR support</span>
                </div>
                <div className="flex items-start gap-2 text-xs font-mono">
                  <span className="text-success mt-0.5">2.</span>
                  <span>Connect Meta Quest 3 via Oculus Link</span>
                </div>
                <div className="flex items-start gap-2 text-xs font-mono">
                  <span className="text-success mt-0.5">3.</span>
                  <span>Launch high-fidelity VR training scenario</span>
                </div>
                <div className="flex items-start gap-2 text-xs font-mono">
                  <span className="text-success mt-0.5">4.</span>
                  <span>Practice with realistic 3D environments and hand tracking</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
              <div className="font-mono text-sm text-warning font-bold mb-2">⚠ Not Yet Qualified</div>
              <p className="text-xs text-foreground/80">
                You need a score of at least <strong>80%</strong> to proceed to the high-fidelity Unity prototype. 
                Review the rescue chain steps and try again. Focus on the areas where you lost points.
              </p>
            </div>

            <div className="bg-card border border-border/40 rounded-lg p-4">
              <div className="font-mono text-xs text-primary/70 uppercase tracking-wider mb-2">Recommendations</div>
              <div className="space-y-1.5 text-xs text-muted-foreground text-left">
                <div>• Review the rescue chain sequence carefully</div>
                <div>• Don't skip safety steps — they carry heavy weight</div>
                <div>• Provide accurate info during emergency calls</div>
                <div>• Act quickly during the first-aid timer</div>
              </div>
            </div>
          </div>
        )}

        {/* Progression visual */}
        <div className="bg-card border border-border/40 rounded-lg p-4 mb-6">
          <div className="font-mono text-xs text-primary/70 uppercase tracking-wider mb-3">Training Progression</div>
          <div className="flex items-center justify-center gap-2 text-xs font-mono">
            <div className="px-3 py-2 bg-success/15 border border-success/40 rounded-lg text-success font-bold">
              ✓ Low-Fidelity
            </div>
            <span className="text-primary text-lg">→</span>
            <div className={`px-3 py-2 border rounded-lg font-bold ${
              isReady 
                ? "bg-success/15 border-success/40 text-success" 
                : "bg-muted border-border/40 text-muted-foreground"
            }`}>
              {isReady ? "✓" : "🔒"} Unity VR
            </div>
            <span className="text-primary text-lg">→</span>
            <div className="px-3 py-2 bg-muted border border-border/40 rounded-lg text-muted-foreground">
              🔒 Real Training
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button onClick={onRetry} className="vr-button-primary w-full">
            ↻ Retry Training
          </button>
          <button onClick={onMainMenu} className="vr-button w-full">
            ← Main Menu
          </button>
        </div>
      </VRPanel>
    </div>
  );
};

export default ReadinessScene;
