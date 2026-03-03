import { Scene } from "@/hooks/useGameState";

interface FlowDiagramProps {
  currentScene: Scene;
  onClose: () => void;
}

const scenes: { id: Scene; label: string }[] = [
  { id: "main-menu", label: "Main Menu" },
  { id: "driving", label: "Driving Intro" },
  { id: "accident", label: "Accident Scene" },
  { id: "safety-actions", label: "Safety Actions" },
  { id: "emergency-call", label: "Emergency Call" },
  { id: "victim-assessment", label: "Victim Assessment" },
  { id: "feedback", label: "Feedback" },
];

const FlowDiagram = ({ currentScene, onClose }: FlowDiagramProps) => {
  return (
    <div className="fixed inset-0 bg-background/90 z-50 flex items-center justify-center fade-in p-4">
      <div className="wireframe-panel-floating w-full max-w-2xl">
        <div className="scene-label mb-3">Game Flow Diagram</div>
        <h2 className="font-mono text-lg font-bold text-foreground mb-6 border-b border-dashed border-border pb-3">
          Scene Progression
        </h2>

        <div className="flex flex-col items-center gap-1">
          {scenes.map((scene, i) => (
            <div key={scene.id} className="flex flex-col items-center">
              <div
                className={`w-full max-w-xs px-6 py-3 border-2 border-dashed rounded-sm text-center font-mono text-sm transition-all ${
                  currentScene === scene.id
                    ? "border-foreground bg-foreground/10 text-foreground font-bold"
                    : "border-border text-muted-foreground"
                }`}
              >
                {scene.label}
                {currentScene === scene.id && (
                  <span className="ml-2 text-xs">← current</span>
                )}
              </div>
              {i < scenes.length - 1 && (
                <div className="flex flex-col items-center my-1">
                  <div className="w-px h-4 border-l border-dashed border-foreground/30" />
                  <span className="text-xs font-mono text-muted-foreground">↓</span>
                  <div className="w-px h-4 border-l border-dashed border-foreground/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Conditional logic notes */}
        <div className="mt-6 space-y-2 border-t border-dashed border-border pt-4">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Conditional Logic
          </div>
          <div className="font-mono text-xs text-foreground/60">
            → If safety step skipped → score penalty (-15)
          </div>
          <div className="font-mono text-xs text-foreground/60">
            → If incorrect emergency call → corrective feedback shown
          </div>
          <div className="font-mono text-xs text-foreground/60">
            → Checklist updates dynamically per completed action
          </div>
        </div>

        <button onClick={onClose} className="vr-button w-full mt-6">
          Close Diagram
        </button>
      </div>
    </div>
  );
};

export default FlowDiagram;
