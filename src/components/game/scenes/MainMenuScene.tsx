import { useState } from "react";
import VRPanel from "../VRPanel";
import vrHeadsetIcon from "@/assets/vr-headset-icon.png";

interface MainMenuSceneProps {
  onStartGame: () => void;
  onOpenChecklist: () => void;
}

const MainMenuScene = ({ onStartGame, onOpenChecklist }: MainMenuSceneProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [movementMode, setMovementMode] = useState<"teleport" | "smooth">("teleport");

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Crosshair */}
      <div className="crosshair">
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="12" y1="4" x2="12" y2="8" stroke="currentColor" strokeWidth="1" />
          <line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" strokeWidth="1" />
          <line x1="4" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="1" />
          <line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <VRPanel sceneLabel="Scene 1 — Main Menu" className="w-full max-w-lg text-center">
        <div className="mb-8">
          <img src={vrHeadsetIcon} alt="VR Headset" className="w-24 h-24 mx-auto mb-4 opacity-80" />
          <div className="text-xs font-mono text-primary/60 mb-2">[ META QUEST 3 ]</div>
          <h1 className="font-mono text-2xl font-bold tracking-wider text-foreground mb-2">
            VR FIRST AID
          </h1>
          <h2 className="font-mono text-lg text-primary tracking-wide">
            EMERGENCY TRAINING
          </h2>
          <div className="mt-4 w-20 h-px bg-primary/30 mx-auto" />
        </div>

        <div className="space-y-3">
          <button onClick={onStartGame} className="vr-button-primary w-full pulse-border">
            ▶ Start Game
          </button>
          <button onClick={onOpenChecklist} className="vr-button w-full">
            ☐ Checklist
          </button>
          <button onClick={() => setShowSettings(true)} className="vr-button w-full">
            ⚙ Settings
          </button>
          <button className="vr-button w-full opacity-50 cursor-not-allowed">
            ✕ Quit
          </button>
        </div>

        <div className="mt-6 text-xs font-mono text-muted-foreground">
          [ Point controller & press trigger to select ]
        </div>
      </VRPanel>

      {showSettings && (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center fade-in backdrop-blur-sm">
          <VRPanel title="⚙ Settings" sceneLabel="Overlay" className="w-full max-w-sm">
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
                <span className="font-mono text-sm">Sound</span>
                <button
                  onClick={() => setSoundOn(!soundOn)}
                  className={`font-mono text-sm px-4 py-1 border rounded-lg transition-colors ${
                    soundOn ? "border-success/50 text-success bg-success/10" : "border-destructive/50 text-destructive bg-destructive/10"
                  }`}
                >
                  {soundOn ? "ON" : "OFF"}
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
                <span className="font-mono text-sm">Movement</span>
                <button
                  onClick={() => setMovementMode(movementMode === "teleport" ? "smooth" : "teleport")}
                  className="font-mono text-sm px-4 py-1 border border-border/40 rounded-lg hover:bg-accent transition-colors"
                >
                  {movementMode.toUpperCase()}
                </button>
              </div>
            </div>
            <button onClick={() => setShowSettings(false)} className="vr-button w-full">
              Close
            </button>
          </VRPanel>
        </div>
      )}
    </div>
  );
};

export default MainMenuScene;
