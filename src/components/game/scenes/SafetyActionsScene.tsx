import { useState } from "react";
import VRPanel from "../VRPanel";
import safetyActionsImg from "@/assets/safety-actions.png";
import InfoTip from "../InfoTip";
import { playCorrect } from "@/lib/feedbackSound";

interface SafetyActionsSceneProps {
  onComplete: () => void;
  onSkip: () => void;
  onCompleteChecklist: (id: string) => void;
}

const WarningTriangle = ({ size = 32, dim = false }: { size?: number; dim?: boolean }) => (
  <svg viewBox="0 0 40 36" width={size} height={size * 0.9} className={dim ? "opacity-40" : ""}>
    <polygon
      points="20,3 38,33 2,33"
      fill="hsl(0 0% 100%)"
      stroke="hsl(0 75% 50%)"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <polygon points="20,11 32,30 8,30" fill="hsl(0 75% 50%)" opacity="0.85" />
  </svg>
);

const SafetyActionsScene = ({ onComplete, onSkip, onCompleteChecklist }: SafetyActionsSceneProps) => {
  const [trianglesPlaced, setTrianglesPlaced] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);

  const handlePlaceTriangle = () => {
    const next = trianglesPlaced + 1;
    setTrianglesPlaced(next);
    setRippleKey((k) => k + 1);
    playCorrect();
    if (next >= 3) {
      setShowSuccess(true);
      onCompleteChecklist("secure-scene");
    }
  };

  const positions = [
    { bottom: '20%', right: '15%', label: 'Position 1 (50m)' },
    { bottom: '28%', right: '34%', label: 'Position 2 (35m)' },
    { bottom: '36%', right: '50%', label: 'Position 3 (20m)' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4">
      <div className="scene-label mb-4">Scene 4 — Safety Actions</div>

      <div className="dialogue-box mb-4">
        Place the warning triangles 50m behind the vehicle to warn approaching traffic.
      </div>

      {/* Placement area */}
      <div className="w-full max-w-2xl aspect-video border border-border/40 rounded-lg relative mb-4 overflow-hidden shadow-lg">
        <img src={safetyActionsImg} alt="Safety actions" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        {/* Vehicle */}
        <div className="absolute top-[28%] left-[18%] w-36 h-16 bg-card/70 border-2 border-destructive/40 rounded-lg flex items-center justify-center relative">
          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-warning hazard-blink" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-warning hazard-blink" />
          <span className="text-xs font-mono text-foreground/80">🚗 Vehicle</span>
        </div>

        {/* Distance line — 50m */}
        <div className="absolute bottom-[45%] left-[28%] right-[12%] flex items-center">
          <div className="flex-1 border-t-2 border-dashed border-warning/60" />
          <span className="px-2 py-0.5 text-[10px] font-mono text-warning bg-card/80 rounded border border-warning/40">
            50m StVO
          </span>
          <div className="flex-1 border-t-2 border-dashed border-warning/60" />
        </div>

        {/* Triangle placement zones */}
        {positions.map((pos, i) => (
          <div
            key={i}
            style={{ bottom: pos.bottom, right: pos.right }}
            className="absolute"
          >
            {i < trianglesPlaced ? (
              <div className="flex flex-col items-center triangle-drop relative">
                {i === trianglesPlaced - 1 && (
                  <div
                    key={rippleKey}
                    className="absolute inset-0 rounded-full bg-success/40 ripple pointer-events-none"
                  />
                )}
                <WarningTriangle size={36} />
                <span className="text-[9px] font-mono text-success mt-1">✓ Placed</span>
              </div>
            ) : i === trianglesPlaced ? (
              <div
                onClick={handlePlaceTriangle}
                className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform pulse-border border border-primary/50 rounded-lg p-2 bg-primary/5"
              >
                <WarningTriangle size={32} dim />
                <span className="text-[9px] font-mono text-primary/80 mt-1 blink-prompt">{pos.label}</span>
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
      <div className="flex gap-2 mb-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i < trianglesPlaced ? "bg-success glow-pulse" : "bg-muted border border-border/40"
            }`}
          />
        ))}
        <span className="text-xs font-mono text-muted-foreground ml-2">{trianglesPlaced}/3 triangles placed</span>
      </div>

      <InfoTip
        icon="📘"
        title="Why 50m?"
        text="German StVO §15 requires a warning triangle 50m behind the accident on roads (100m on highways)."
        className="max-w-md mb-3"
      />

      {/* Feedback */}
      {showSuccess ? (
        <VRPanel className="max-w-md slide-up">
          <div className="text-center space-y-3">
            <div className="feedback-success">
              ✓ All warning triangles placed correctly!
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
            className="text-xs font-mono text-destructive/70 hover:text-destructive cursor-pointer transition-colors"
          >
            [ Skip this step → ]
          </button>
        </div>
      )}
    </div>
  );
};

export default SafetyActionsScene;
