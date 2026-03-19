import { ChecklistItem } from "@/hooks/useGameState";

interface SideChecklistProps {
  items: ChecklistItem[];
  completionPercent: number;
}

const SideChecklist = ({ items, completionPercent }: SideChecklistProps) => {
  return (
    <div className="side-checklist">
      <div className="font-mono text-[10px] uppercase tracking-wider text-primary/70 mb-2">
        First Aid Steps
      </div>
      <div className="space-y-1.5 mb-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-2 text-xs font-mono transition-all duration-300 ${
              item.completed ? "text-success check-complete" : "text-muted-foreground"
            }`}
          >
            <span className={`w-4 h-4 flex items-center justify-center rounded border text-[10px] ${
              item.completed
                ? "border-success bg-success/20 text-success"
                : "border-border"
            }`}>
              {item.completed ? "✓" : ""}
            </span>
            <span className={item.completed ? "line-through opacity-70" : ""}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${completionPercent}%` }}
        />
      </div>
      <div className="font-mono text-[10px] text-muted-foreground mt-1 text-right">
        {completionPercent}%
      </div>
    </div>
  );
};

export default SideChecklist;
