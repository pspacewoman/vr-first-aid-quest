import { useState } from "react";
import VRPanel from "../VRPanel";
import vrHeadsetIcon from "@/assets/vr-headset-icon.png";

interface MainMenuSceneProps {
  onStartGame: () => void;
  onOpenChecklist: () => void;
  soundOn: boolean;
  onToggleSound: (on: boolean) => void;
}

const rescueChainSteps = [
  { icon: "👁", label: "Recognize Emergency", desc: "Identify the situation and stay calm", weight: 15 },
  { icon: "🩺", label: "Assess the Victim", desc: "Check consciousness and breathing", weight: 15 },
  { icon: "🔺", label: "Secure Accident Scene", desc: "Place warning triangle 50m behind (StVO)", weight: 20 },
  { icon: "📞", label: "Call Emergency Services", desc: "Dial 112 and describe the situation", weight: 20 },
  { icon: "🩹", label: "Provide First Aid", desc: "Apply pressure, stabilize, support", weight: 20 },
  { icon: "🚑", label: "Wait for Help", desc: "Stay with the victim until help arrives", weight: 10 },
];

const MainMenuScene = ({ onStartGame, onOpenChecklist, soundOn, onToggleSound }: MainMenuSceneProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showRescueChain, setShowRescueChain] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
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
          <img
            src={vrHeadsetIcon}
            alt="VR Headset"
            width={512}
            height={512}
            className="w-24 h-24 mx-auto mb-4 float-anim drop-shadow-[0_0_18px_hsl(var(--primary)/0.55)]"
            loading="lazy"
          />
          <div className="text-xs font-mono text-primary/70 mb-2">[ META QUEST 3 ]</div>
          <h1 className="font-mono text-2xl font-bold tracking-wider text-foreground mb-2">
            EMERGENCY RESPONSE
          </h1>
          <h2 className="font-mono text-lg text-primary tracking-wide">
            TRAINING
          </h2>
          <p className="mt-2 font-mono text-sm text-muted-foreground tracking-widest uppercase">
            First-Aid Training
          </p>
          <div className="mt-4 w-20 h-px bg-primary/40 mx-auto" />
        </div>

        <div className="space-y-3">
          <button onClick={onStartGame} className="vr-button-primary w-full pulse-border">
            ▶ Start Game
          </button>
          <button onClick={() => setShowRescueChain(true)} className="vr-button w-full">
            🔗 Rescue Chain
          </button>
          <button onClick={() => setShowAbout(true)} className="vr-button w-full">
            ℹ About
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
                    <div className="text-xs font-mono text-primary/60 flex-shrink-0">
                      {step.weight}%
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

      {/* About Overlay */}
      {showAbout && (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center fade-in backdrop-blur-sm overflow-y-auto py-8">
          <VRPanel title="ℹ About this Application" sceneLabel="Purpose & Usage" className="w-full max-w-2xl mx-4">
            <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-3 mb-5">
              <p className="text-sm font-mono text-primary text-center">
                Low-Fidelity Web Prototype for the <span className="font-bold">VR First Aid Training</span> research project
              </p>
            </div>

            <div className="space-y-4 text-sm text-foreground/85 mb-5">
              <div>
                <div className="font-mono text-xs text-primary/70 uppercase tracking-wider mb-1">Why was this developed?</div>
                <p className="leading-relaxed">
                  This application was built as part of an <strong>HCI Master&apos;s thesis</strong> at the University of Siegen
                  to explore how immersive VR can teach the German <strong>Rescue Chain</strong> (Rettungskette)
                  to lay first responders. It follows the <strong>ADDIE</strong> instructional-design framework
                  and is the low-fidelity counterpart to a high-fidelity Unity VR prototype targeting the <strong>Meta Quest 3</strong>.
                </p>
              </div>

              <div>
                <div className="font-mono text-xs text-primary/70 uppercase tracking-wider mb-1">Why use it before the Unity VR prototype?</div>
                <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                  <li>Learn the <strong>flow and decision points</strong> of the rescue chain in a low-risk 2D environment first.</li>
                  <li>Reduce <strong>cognitive load</strong> when entering full immersion — you already know <em>what</em> to do, so VR can focus on <em>how</em>.</li>
                  <li>Build familiarity with checklists, scoring, and the 80% mastery threshold required to <strong>unlock the Unity VR scenario</strong>.</li>
                  <li>Provides a <strong>baseline measure</strong> for comparing learning gains between low- and high-fidelity conditions.</li>
                </ul>
              </div>

              <div>
                <div className="font-mono text-xs text-primary/70 uppercase tracking-wider mb-1">Recommended usage</div>
                <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed">
                  <li>Read the <strong>Rescue Chain</strong> roadmap on the main menu.</li>
                  <li>Complete one full playthrough — aim for ≥ 80% to unlock the Unity preview.</li>
                  <li>Review feedback &amp; mistakes, then proceed to the <strong>high-fidelity Unity VR training</strong>.</li>
                </ol>
              </div>

              <div className="text-xs text-muted-foreground border-t border-border/40 pt-3">
                Research context: HCI Master Thesis · University of Siegen · 2025/26 · Compliant with German <strong>StVO</strong> road-safety regulations (e.g., 50 m warning-triangle distance).
              </div>

              <div className="border-t border-border/40 pt-3">
                <div className="font-mono text-xs text-primary/70 uppercase tracking-wider mb-2">Developer / Designer</div>
                <div className="text-sm text-foreground font-semibold">Priyanshi Singh</div>
                <div className="text-xs text-foreground/80 mt-1 space-y-0.5">
                  <div>
                    LinkedIn:{" "}
                    <a
                      href="https://www.linkedin.com/in/spriyanshi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80 break-all"
                    >
                      linkedin.com/in/spriyanshi
                    </a>
                  </div>
                  <div>
                    Email:{" "}
                    <a
                      href="mailto:priyanshiuiux@gmail.com"
                      className="text-primary underline hover:text-primary/80 break-all"
                    >
                      priyanshiuiux@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-muted-foreground italic border-t border-border/40 pt-3 leading-relaxed">
                <strong className="text-warning not-italic">NDA Disclosure:</strong> This prototype and all associated
                research materials are confidential and shared under a Non-Disclosure Agreement. Do not reproduce,
                distribute, or share any part of this application or its contents without prior written consent from
                the developer.
              </div>
            </div>

            <button onClick={() => setShowAbout(false)} className="vr-button w-full">
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
                  onClick={() => onToggleSound(!soundOn)}
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
