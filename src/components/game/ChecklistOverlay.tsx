import { ChecklistItem } from "@/hooks/useGameState";
import VRPanel from "./VRPanel";

interface ChecklistOverlayProps {
  items: ChecklistItem[];
  completionPercent: number;
  onClose: () => void;
}

const ChecklistOverlay = ({ items, completionPercent, onClose }: ChecklistOverlayProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center fade-in backdrop-blur-sm">
      <VRPanel title="📋 First Aid Checklist" sceneLabel="Floating UI" className="w-full max-w-md">
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 border rounded-lg transition-all ${
                item.completed
                  ? "border-success/40 bg-success/10"
                  : "border-border/40"
              }`}
            >
              <div
                className={`w-5 h-5 border-2 rounded flex items-center justify-center text-xs font-mono ${
                  item.completed
                    ? "border-success text-success bg-success/20"
                    : "border-muted-foreground"
                }`}
              >
                {item.completed ? "✓" : ""}
              </div>
              <span
                className={`font-mono text-sm ${
                  item.completed ? "text-success line-through" : "text-foreground"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex justify-between font-mono text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{completionPercent}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        <button onClick={onClose} className="vr-button w-full">
          Close Checklist
        </button>
      </VRPanel>
    </div>
  );
};

export default ChecklistOverlay;
