import { useState } from "react";
import VRPanel from "../VRPanel";
import safetyActionsImg from "@/assets/safety-actions.png";

interface SafetyActionsSceneProps {
  onComplete: () => void;
  onSkip: () => void;
  onCompleteChecklist: (id: string) => void;
}

const SafetyActionsScene = ({ onComplete, onSkip, onCompleteChecklist }: SafetyActionsSceneProps) => {
  const [conesPlaced, setConesPlaced] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePlaceCone = () => {
    const next = conesPlaced + 1;
    setConesPlaced(next);
    if (next >= 3) {
      setShowSuccess(true);
      onCompleteChecklist("secure-scene");
    }
  };

  const conePositions = [
    { bottom: '20%', right: '18%', label: 'Position 1 (~100m)' },
    { bottom: '28%', right: '35%', label: 'Position 2 (~70m)' },
    { bottom: '36%', right: '50%', label: 'Position 3 (~40m)' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4">
      <div className="scene-label mb-4">Scene 4 — Safety Actions</div>

      <div className="dialogue-box mb-4">
        Place the safety cones at the correct distance behind the vehicle to warn approaching traffic.
      </div>

      {/* Placement area */}
      <div className="w-full max-w-2xl aspect-video border border-border/40 rounded-lg relative mb-4 overflow-hidden shadow-lg">
        <img src={safetyActionsImg} alt="Safety actions" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />

        {/* Vehicle */}
        <div className="absolute top-[28%] left-[22%] w-36 h-16 bg-card/60 border border-border/40 rounded-lg flex items-center justify-center">
          <span className="text-xs font-mono text-muted-foreground">🚗 Vehicle</span>
        </div>

        {/* Distance line */}
        <div className="absolute bottom-[45%] left-[35%] right-[15%] flex items-center">
          <div className="flex-1 border-t border-dashed border-warning/40" />
          <span className="px-2 text-[10px] font-mono text-warning bg-card/70 rounded">Safety distance</span>
          <div className="flex-1 border-t border-dashed border-warning/40" />
        </div>

        {/* Cone placement zones */}
        {conePositions.map((pos, i) => (
          <div
            key={i}
            style={{ bottom: pos.bottom, right: pos.right }}
            className="absolute"
          >
            {i < conesPlaced ? (
              <div className="flex flex-col items-center">
                <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-b-[22px] border-l-transparent border-r-transparent border-b-[hsl(25,90%,55%)]" />
                <span className="text-[9px] font-mono text-success mt-1">✓ Placed</span>
              </div>
            ) : i === conesPlaced ? (
              <div
                onClick={handlePlaceCone}
                className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform pulse-border border border-primary/40 rounded-lg p-2 bg-primary/5"
              >
                <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-b-[22px] border-l-transparent border-r-transparent border-b-[hsl(25,40%,40%)] opacity-50" />
                <span className="text-[9px] font-mono text-primary/70 mt-1 blink-prompt">{pos.label}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center opacity-30">
                <div className="w-6 h-6 border border-dashed border-border/40 rounded flex items-center justify-center">
                  <span className="text-[10px]">?</span>
                </div>
                <span className="text-[9px] font-mono text-muted-foreground/40 mt-1">{pos.label}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="flex gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i < conesPlaced ? "bg-success" : "bg-muted border border-border/40"
            }`}
          />
        ))}
        <span className="text-xs font-mono text-muted-foreground ml-2">{conesPlaced}/3 cones placed</span>
      </div>

      {/* Feedback */}
      {showSuccess ? (
        <VRPanel className="max-w-md slide-up">
          <div className="text-center space-y-3">
            <div className="feedback-success">
              ✓ All safety cones placed correctly!
            </div>
            <div className="prompt-text border-success/30 text-success text-sm">
              ☑ Secure accident area — Complete
            </div>
            <button onClick={onComplete} className="vr-button-primary w-full">
              ▶ Continue to Emergency Call
            </button>
          </div>
        </VRPanel>
      ) : (
        <div className="space-y-3 text-center">
          <button
            onClick={onSkip}
            className="text-xs font-mono text-destructive/60 hover:text-destructive cursor-pointer transition-colors"
          >
            [ Skip this step → ]
          </button>
        </div>
      )}
    </div>
  );
};

export default SafetyActionsScene;
