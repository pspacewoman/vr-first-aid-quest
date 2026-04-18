import { useState } from "react";
import VRPanel from "../VRPanel";
import vrHeadsetIcon from "@/assets/vr-headset-icon.png";

interface MainMenuSceneProps {
  onStartGame: () => void;
  onOpenChecklist: () => void;
}

const rescueChainSteps = [
  { icon: "👁", label: "Recognize Emergency", desc: "Identify the situation and stay calm", weight: 15 },
  { icon: "🩺", label: "Assess the Victim", desc: "Check consciousness and breathing", weight: 15 },
  { icon: "🔺", label: "Secure Accident Scene", desc: "Place warning triangle 50m behind (StVO)", weight: 20 },
  { icon: "📞", label: "Call Emergency Services", desc: "Dial 112 and describe the situation", weight: 20 },
  { icon: "🩹", label: "Provide First Aid", desc: "Apply pressure, stabilize, support", weight: 20 },
  { icon: "🚑", label: "Wait for Help", desc: "Stay with the victim until help arrives", weight: 10 },
];

const MainMenuScene = ({ onStartGame, onOpenChecklist }: MainMenuSceneProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showRescueChain, setShowRescueChain] = useState(false);
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

      <VRPanel sceneLabel="Scene 1 — Main Menu" className="w-full max-w-lg text-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-sweep pointer-events-none" />
        <div className="mb-8 relative">
          <img src={vrHeadsetIcon} alt="VR Headset" className="w-24 h-24 mx-auto mb-4 opacity-90 float-anim" />
          <div className="text-xs font-mono text-primary/70 mb-2">[ META QUEST 3 ]</div>
          <h1 className="font-mono text-2xl font-bold tracking-wider text-foreground mb-2">
            VR FIRST AID
          </h1>
          <h2 className="font-mono text-lg text-primary tracking-wide">
            EMERGENCY TRAINING
          </h2>
          <div className="mt-4 w-20 h-px bg-primary/40 mx-auto" />
        </div>

        <div className="space-y-3">
          <button onClick={onStartGame} className="vr-button-primary w-full pulse-border">
            ▶ Start Game
          </button>
          <button onClick={() => setShowRescueChain(true)} className="vr-button w-full">
            🔗 Rescue Chain
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

      {/* Rescue Chain Overlay */}
      {showRescueChain && (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center fade-in backdrop-blur-sm overflow-y-auto py-8">
          <VRPanel title="🔗 Rescue Chain" sceneLabel="Training Roadmap" className="w-full max-w-2xl mx-4">
            <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-3 mb-5">
              <p className="text-sm font-mono text-primary text-center">
                Complete this rescue chain to qualify for the <span className="font-bold">High-Fidelity Unity Prototype</span>
              </p>
            </div>

            {/* Visual chain */}
            <div className="relative mb-6">
              {/* Connecting line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-primary/20" />
              
              <div className="space-y-3">
                {rescueChainSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border/40 bg-muted/30 hover:bg-muted/60 transition-all relative slide-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-xl flex-shrink-0 z-10">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-sm font-bold text-foreground">
                        Step {i + 1}: {step.label}
                      </div>
                      <div className="text-xs text-muted-foreground">{step.desc}</div>
                    </div>
                    <div className="text-xs font-mono text-primary/50 flex-shrink-0">
                      {[15, 20, 20, 15, 20, 10][i]}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progression info */}
            <div className="bg-card border border-border/40 rounded-lg p-4 mb-4">
              <div className="font-mono text-xs text-primary/70 uppercase tracking-wider mb-2">Progression Path</div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/15 border border-primary/30 rounded-lg">
                  <span>📋</span> Low-Fidelity Prototype
                </div>
                <span className="text-primary">→</span>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/15 border border-success/30 rounded-lg">
                  <span>🎮</span> Unity VR Prototype
                </div>
                <span className="text-primary">→</span>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-info/15 border border-info/30 rounded-lg">
                  <span>🏥</span> Real Training
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground text-center mb-4">
              Score ≥ 80% to unlock high-fidelity Unity prototype access
            </div>

            <button onClick={() => setShowRescueChain(false)} className="vr-button w-full">
              Close
            </button>
          </VRPanel>
        </div>
      )}

      {/* Settings Overlay */}
      {showSettings && (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center fade-in backdrop-blur-sm overflow-y-auto py-8">
          <VRPanel title="⚙ Settings" sceneLabel="Configuration" className="w-full max-w-lg mx-4">
            {/* Basic Settings */}
            <div className="space-y-3 mb-6">
              <div className="font-mono text-xs text-primary/70 uppercase tracking-wider mb-2">Basic Controls</div>
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

            {/* Unity / High-Fidelity Settings */}
            <div className="border border-info/30 rounded-lg p-4 mb-6 bg-info/5">
              <div className="font-mono text-xs text-info uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>🎮</span> Unity VR Requirements
              </div>
              <div className="space-y-2 text-xs font-mono text-foreground/80 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-info mt-0.5">▸</span>
                  <span><strong>Device:</strong> Meta Quest 3 with latest firmware</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-info mt-0.5">▸</span>
                  <span><strong>Unity Version:</strong> 2022.3 LTS or newer</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-info mt-0.5">▸</span>
                  <span><strong>XR Plugin:</strong> OpenXR with Meta Quest support</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-info mt-0.5">▸</span>
                  <span><strong>Rendering:</strong> Universal Render Pipeline (URP)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-info mt-0.5">▸</span>
                  <span><strong>Min FPS:</strong> 72 Hz (90 Hz recommended)</span>
                </div>
              </div>

              <div className="font-mono text-xs text-info/70 uppercase tracking-wider mb-2">Progression Path</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded bg-primary/10 border border-primary/20">
                  <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-[10px]">1</span>
                  <div>
                    <div className="font-bold text-xs text-primary">Low-Fidelity (Current)</div>
                    <div className="text-[10px] text-muted-foreground">Web-based wireframe prototype • Learn the flow</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-success/10 border border-success/20">
                  <span className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center text-[10px]">2</span>
                  <div>
                    <div className="font-bold text-xs text-success">High-Fidelity Unity</div>
                    <div className="text-[10px] text-muted-foreground">VR headset • Realistic 3D scenes • Hand tracking</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-info/10 border border-info/20">
                  <span className="w-6 h-6 bg-info/20 rounded-full flex items-center justify-center text-[10px]">3</span>
                  <div>
                    <div className="font-bold text-xs text-info">Real-World Training</div>
                    <div className="text-[10px] text-muted-foreground">Apply skills in certified first-aid courses</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Low-Fidelity Settings Info */}
            <div className="border border-border/40 rounded-lg p-4 mb-4 bg-muted/30">
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Low-Fidelity Prototype Settings
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div>• Simplified 2D interactions (click-based)</div>
                <div>• No hand tracking or spatial audio</div>
                <div>• Timer-based scene transitions</div>
                <div>• Wireframe-level graphics with warm tones</div>
                <div>• Text-based dialogue (no voice)</div>
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
