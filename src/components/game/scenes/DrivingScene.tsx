import { useEffect, useState } from "react";
import drivingSceneImg from "@/assets/driving-scene.png";
import InfoTip from "../InfoTip";

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
      <div className="w-full max-w-2xl aspect-video border border-border/40 rounded-lg relative overflow-hidden mb-4 shadow-lg">
        <img src={drivingSceneImg} alt="Driving scene" className="w-full h-full object-cover opacity-70" />

        {/* Animated scrolling road lines overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-70 road-scroll"
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent 0 30px, hsla(0,0%,100%,0.55) 30px 50px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 90%)",
            width: "12px",
            margin: "0 auto",
            left: 0,
            right: 0,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />

        {/* Steering wheel icon overlay */}
        <div className="absolute bottom-8 right-8 text-4xl opacity-40 sway">🎚</div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/40">
          <span className="text-xs font-mono text-foreground/70">🚗 First-person driving view</span>
        </div>
      </div>

      <InfoTip
        icon="📘"
        title="Did you know?"
        text="In Germany, failing to render aid is punishable under §323c StGB."
        className="max-w-md mb-3"
      />

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
