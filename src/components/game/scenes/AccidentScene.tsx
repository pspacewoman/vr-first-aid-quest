import accidentSceneImg from "@/assets/accident-scene.png";

interface AccidentSceneProps {
  onSelectHotspot: (id: string) => void;
}

const AccidentScene = ({ onSelectHotspot }: AccidentSceneProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4">
      <div className="scene-label mb-4">Scene 3 — Accident Encounter</div>

      {/* Scene description */}
      <div className="dialogue-box mb-4">
        Secure the area before helping the injured person.
      </div>

      {/* 3D layout with image background */}
      <div className="w-full max-w-3xl aspect-video border border-border/40 rounded-lg relative mb-4 overflow-hidden shadow-lg">
        {/* Background image */}
        <img src={accidentSceneImg} alt="Accident scene" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />

        {/* Road surface */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[hsl(25,10%,25%)] to-transparent opacity-40" />

        {/* Crashed car */}
        <div className="absolute top-[25%] left-[18%] w-36 h-18 bg-card/60 border border-destructive/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <span className="text-xs font-mono text-destructive/80 text-center">🚗 Crashed<br/>Vehicle</span>
        </div>

        {/* Distance marker for safety */}
        <div className="absolute bottom-[38%] left-[18%] right-[15%] flex items-center">
          <div className="flex-1 border-t border-dashed border-warning/50" />
          <span className="px-2 text-[10px] font-mono text-warning bg-card/70 rounded">~100m safety distance</span>
          <div className="flex-1 border-t border-dashed border-warning/50" />
        </div>

        {/* Victim - with wound coloring */}
        <div
          onClick={() => onSelectHotspot("victim")}
          className="hotspot absolute top-[45%] left-[42%] w-22 h-16 highlight-glow"
        >
          <span className="text-xs font-mono">👤 Victim</span>
          <span className="text-[10px] text-destructive">● Injured</span>
        </div>

        {/* Cone 1 */}
        <div
          onClick={() => onSelectHotspot("triangle")}
          className="absolute bottom-[18%] right-[12%] cursor-pointer hover:scale-110 transition-transform"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-[hsl(25,90%,55%)]" />
          </div>
          <span className="text-[10px] font-mono text-primary/70 block text-center blink-prompt">Cone 1</span>
        </div>

        {/* Cone 2 */}
        <div
          onClick={() => onSelectHotspot("triangle")}
          className="absolute bottom-[22%] right-[25%] cursor-pointer hover:scale-110 transition-transform"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-[hsl(25,90%,55%)]" />
          </div>
          <span className="text-[10px] font-mono text-primary/70 block text-center">Cone 2</span>
        </div>

        {/* Cone 3 */}
        <div
          onClick={() => onSelectHotspot("triangle")}
          className="absolute bottom-[18%] left-[12%] cursor-pointer hover:scale-110 transition-transform"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-[hsl(25,90%,55%)]" />
          </div>
          <span className="text-[10px] font-mono text-primary/70 block text-center">Cone 3</span>
        </div>

        {/* Phone */}
        <div
          onClick={() => onSelectHotspot("phone")}
          className="hotspot absolute top-[15%] right-[18%] w-20 h-14"
        >
          <span className="text-xs font-mono">📱 Phone</span>
        </div>

        {/* Bystanders */}
        <div className="absolute top-[18%] right-[42%] flex gap-1.5 opacity-50">
          <div className="w-5 h-9 bg-muted/40 border border-border/30 rounded" />
          <div className="w-5 h-9 bg-muted/40 border border-border/30 rounded" />
          <div className="w-5 h-9 bg-muted/40 border border-border/30 rounded" />
        </div>
        <div className="absolute top-[16%] right-[39%] text-[10px] font-mono text-muted-foreground/50">
          Bystanders
        </div>
      </div>

      {/* Safety instruction */}
      <div className="bg-warning/10 border border-warning/30 rounded-lg px-4 py-2 max-w-lg text-center mb-2">
        <span className="text-xs font-mono text-warning">
          ⚠ Place the warning cones at a safe distance (~100m) behind the accident
        </span>
      </div>

      <div className="mt-2 text-xs font-mono text-muted-foreground text-center">
        [ Select interactive elements to proceed ]
      </div>
    </div>
  );
};

export default AccidentScene;
