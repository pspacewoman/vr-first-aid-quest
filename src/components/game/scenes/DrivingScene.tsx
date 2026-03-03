import { useEffect, useState } from "react";
import drivingSceneImg from "@/assets/driving-scene.png";

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

      {/* Road viewport */}
      <div className="w-full max-w-2xl aspect-video border-2 border-dashed border-border rounded-sm relative overflow-hidden mb-6">
        <img src={drivingSceneImg} alt="Driving scene" className="w-full h-full object-cover opacity-60" />
        {/* Overlay labels */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 text-xs font-mono text-foreground/50 bg-background/60 px-2 py-1 rounded-sm">
          [ first-person driving view ]
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono text-foreground/40 bg-background/60 px-2 py-1 rounded-sm">
          [ steering wheel ]
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
