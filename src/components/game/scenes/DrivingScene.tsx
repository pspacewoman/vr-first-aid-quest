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
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4">
      <div className="scene-label mb-6">Scene 2 — Driving Scene</div>

      {/* Scene description */}
      <div className="dialogue-box mb-4">
        You are driving home when you notice something unusual ahead on the road.
      </div>

      {/* Road viewport */}
      <div className="w-full max-w-2xl aspect-video border border-border/40 rounded-lg relative overflow-hidden mb-6 shadow-lg">
        <img src={drivingSceneImg} alt="Driving scene" className="w-full h-full object-cover opacity-70" />
        {/* Road overlay with warm tones */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/30">
          <span className="text-xs font-mono text-foreground/60">🚗 First-person driving view</span>
        </div>
      </div>

      {/* Timer / Prompt */}
      {!showPrompt ? (
        <div className="font-mono text-sm text-muted-foreground">
          Scene transitions in <span className="text-primary font-bold">{countdown}s</span>...
        </div>
      ) : (
        <div className="slide-up space-y-4 text-center">
          <div className="bg-warning/15 border border-warning/40 rounded-lg px-5 py-3 text-warning font-mono text-sm">
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
