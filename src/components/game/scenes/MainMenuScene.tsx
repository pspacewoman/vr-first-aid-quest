import { useState } from "react";
import VRPanel from "../VRPanel";

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
          <circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="12" y1="4" x2="12" y2="8" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="4" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>

      <VRPanel sceneLabel="Scene 1 — Main Menu" className="w-full max-w-lg text-center">
        <div className="mb-8">
          <div className="text-xs font-mono text-muted-foreground mb-2">[ META QUEST 3 ]</div>
          <h1 className="font-mono text-2xl font-bold tracking-wider text-foreground mb-2">
            VR FIRST AID
          </h1>
          <h2 className="font-mono text-lg text-muted-foreground tracking-wide">
            EMERGENCY TRAINING
          </h2>
          <div className="mt-4 w-20 h-px bg-foreground/20 mx-auto" />
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
        <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center fade-in">
          <VRPanel title="⚙ Settings" sceneLabel="Overlay" className="w-full max-w-sm">
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 border border-dashed border-border rounded-sm">
                <span className="font-mono text-sm">Sound</span>
                <button
                  onClick={() => setSoundOn(!soundOn)}
                  className={`font-mono text-sm px-4 py-1 border border-dashed rounded-sm ${
                    soundOn ? "border-success text-success" : "border-destructive text-destructive"
                  }`}
                >
                  {soundOn ? "ON" : "OFF"}
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border border-dashed border-border rounded-sm">
                <span className="font-mono text-sm">Movement</span>
                <button
                  onClick={() => setMovementMode(movementMode === "teleport" ? "smooth" : "teleport")}
                  className="font-mono text-sm px-4 py-1 border border-dashed border-foreground/40 rounded-sm"
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
