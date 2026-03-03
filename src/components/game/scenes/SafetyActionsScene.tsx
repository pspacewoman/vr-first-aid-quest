import { useState } from "react";
import VRPanel from "../VRPanel";

interface SafetyActionsSceneProps {
  onComplete: () => void;
  onSkip: () => void;
  onCompleteChecklist: (id: string) => void;
}

const SafetyActionsScene = ({ onComplete, onSkip, onCompleteChecklist }: SafetyActionsSceneProps) => {
  const [placed, setPlaced] = useState(false);
  const [showGhost, setShowGhost] = useState(true);

  const handlePlace = () => {
    setPlaced(true);
    setShowGhost(false);
    onCompleteChecklist("secure-scene");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4">
      <div className="scene-label mb-6">Scene 4 — Safety Actions</div>

      {/* Placement area */}
      <div className="w-full max-w-2xl aspect-video border-2 border-dashed border-border rounded-sm relative mb-6">
        {/* Vehicle */}
        <div className="absolute top-[30%] left-[25%] w-36 h-16 border-2 border-dashed border-foreground/30 rounded-sm flex items-center justify-center">
          <span className="text-xs font-mono text-muted-foreground">🚗 vehicle</span>
        </div>

        {/* Ghost placement zone */}
        {showGhost && !placed && (
          <div
            onClick={handlePlace}
            className="absolute bottom-[25%] right-[20%] w-24 h-16 border-2 border-dashed border-foreground/40 rounded-sm flex items-center justify-center cursor-pointer hover:border-success/60 hover:bg-success/5 transition-all pulse-border"
          >
            <span className="text-xs font-mono text-muted-foreground text-center">
              [ place<br/>triangle<br/>here ]
            </span>
          </div>
        )}

        {/* Placed triangle */}
        {placed && (
          <div className="absolute bottom-[25%] right-[20%] w-24 h-16 border-2 border-dashed border-success/60 bg-success/10 rounded-sm flex items-center justify-center">
            <span className="text-xs font-mono text-success">⚠ placed ✓</span>
          </div>
        )}
      </div>

      {/* Feedback */}
      {placed ? (
        <VRPanel className="max-w-md slide-up">
          <div className="text-center space-y-3">
            <div className="font-mono text-sm text-success">
              ✓ Warning triangle placed correctly
            </div>
            <div className="prompt-text border-success/30">
              ☑ Secure accident area — Complete
            </div>
            <button onClick={onComplete} className="vr-button-primary w-full">
              ▶ Continue to Emergency Call
            </button>
          </div>
        </VRPanel>
      ) : (
        <div className="space-y-3 text-center">
          <div className="prompt-text">
            Place the warning triangle behind the vehicle
          </div>
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
