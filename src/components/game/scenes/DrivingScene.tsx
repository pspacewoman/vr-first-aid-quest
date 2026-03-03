import { useEffect, useState } from "react";

interface DrivingSceneProps {
  onComplete: () => void;
}

const DrivingScene = ({ onComplete }: DrivingSceneProps) => {
  const [countdown, setCountdown] = useState(5);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowPrompt(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in">
      <div className="scene-label mb-6">Scene 2 — Driving Scene (Intro)</div>

      {/* Road viewport placeholder */}
      <div className="w-full max-w-2xl aspect-video border-2 border-dashed border-border rounded-sm relative overflow-hidden mb-6">
        {/* Horizon line */}
        <div className="absolute top-1/3 left-0 right-0 border-t border-dashed border-foreground/20" />
        
        {/* Road lines */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2/3 border-l-2 border-dashed border-foreground/15" />
        <div className="absolute bottom-0 left-[35%] w-px h-2/3 border-l border-dashed border-foreground/10" />
        <div className="absolute bottom-0 left-[65%] w-px h-2/3 border-l border-dashed border-foreground/10" />

        {/* Vanishing point label */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground">
          [ vanishing point ]
        </div>

        {/* Steering wheel indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="w-20 h-10 border-2 border-dashed border-foreground/30 rounded-t-full flex items-end justify-center pb-1">
            <span className="text-xs font-mono text-muted-foreground">wheel</span>
          </div>
        </div>

        {/* Dashboard label */}
        <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-dashed border-foreground/15 flex items-center justify-center">
          <span className="text-xs font-mono text-muted-foreground">[ dashboard ]</span>
        </div>
      </div>

      {/* Text overlay */}
      <div className="prompt-text text-center mb-4">
        "You are driving home…"
      </div>

      {/* Timer / Prompt */}
      {!showPrompt ? (
        <div className="font-mono text-sm text-muted-foreground">
          Scene transitions in {countdown}s...
        </div>
      ) : (
        <div className="slide-up space-y-4 text-center">
          <div className="prompt-text border-warning/40 text-warning">
            ⚠ "You notice an accident ahead."
          </div>
          <button onClick={onComplete} className="vr-button-primary pulse-border">
            ▶ Approach Scene
          </button>
        </div>
      )}
    </div>
  );
};

export default DrivingScene;
