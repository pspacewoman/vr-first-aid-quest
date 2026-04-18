import accidentSceneImg from "@/assets/accident-scene.png";
import InfoTip from "../InfoTip";

interface AccidentSceneProps {
  onSelectHotspot: (id: string) => void;
}

const WarningTriangle = ({ size = 28 }: { size?: number }) => (
  <svg viewBox="0 0 40 36" width={size} height={size * 0.9}>
    <polygon
      points="20,3 38,33 2,33"
      fill="hsl(0 0% 100%)"
      stroke="hsl(0 75% 50%)"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <polygon
      points="20,11 32,30 8,30"
      fill="hsl(0 75% 50%)"
      opacity="0.85"
    />
  </svg>
);

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
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        {/* Road surface */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[hsl(215,30%,18%)] to-transparent opacity-60" />

        {/* Crashed car with hazard lights */}
        <div className="absolute top-[25%] left-[18%] w-36 h-18 bg-card/70 border-2 border-destructive/50 rounded-lg flex items-center justify-center backdrop-blur-sm relative">
          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-warning hazard-blink" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-warning hazard-blink" />
          <span className="text-xs font-mono text-destructive text-center">🚗 Crashed<br/>Vehicle</span>
        </div>

        {/* Distance marker for safety — 50m German law */}
        <div className="absolute bottom-[38%] left-[18%] right-[15%] flex items-center">
          <div className="flex-1 border-t-2 border-dashed border-warning/60" />
          <span className="px-2 py-0.5 text-[10px] font-mono text-warning bg-card/80 rounded border border-warning/40">
            50m (German StVO)
          </span>
          <div className="flex-1 border-t-2 border-dashed border-warning/60" />
        </div>

        {/* Victim - with wound coloring + pulsing glow */}
        <div className="absolute top-[45%] left-[42%]">
          <div className="absolute inset-0 rounded-lg bg-destructive/30 animate-ping" style={{ animationDuration: '2s' }} />
          <div
            onClick={() => onSelectHotspot("victim")}
            className="hotspot relative w-22 h-16 highlight-glow"
          >
            <span className="text-xs font-mono">👤 Victim</span>
            <span className="text-[10px] text-destructive">● Injured</span>
          </div>
        </div>

        {/* Warning Triangle 1 — primary at 50m */}
        <div
          onClick={() => onSelectHotspot("triangle")}
          className="absolute bottom-[18%] right-[12%] cursor-pointer hover:scale-110 transition-transform triangle-drop"
        >
          <WarningTriangle size={32} />
          <span className="text-[10px] font-mono text-primary/90 block text-center blink-prompt">Triangle (50m)</span>
        </div>

        {/* Warning Triangle 2 — secondary marker */}
        <div
          onClick={() => onSelectHotspot("triangle")}
          className="absolute bottom-[24%] right-[28%] cursor-pointer hover:scale-110 transition-transform"
        >
          <WarningTriangle size={24} />
          <span className="text-[10px] font-mono text-primary/70 block text-center">Marker</span>
        </div>

        {/* Phone */}
        <div
          onClick={() => onSelectHotspot("phone")}
          className="hotspot absolute top-[15%] right-[18%] w-20 h-14"
        >
          <span className="text-xs font-mono">📱 Phone</span>
        </div>

        {/* Bystanders with sway animation */}
        <div className="absolute top-[18%] right-[42%] flex gap-1.5 opacity-60">
          <div className="w-5 h-9 bg-muted/60 border border-border/40 rounded sway" style={{ animationDelay: '0s' }} />
          <div className="w-5 h-9 bg-muted/60 border border-border/40 rounded sway" style={{ animationDelay: '0.5s' }} />
          <div className="w-5 h-9 bg-muted/60 border border-border/40 rounded sway" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute top-[16%] right-[39%] text-[10px] font-mono text-muted-foreground/60">
          Bystanders
        </div>

        {/* Scene legend */}
        <div className="absolute top-2 left-2 bg-card/85 backdrop-blur-sm rounded-lg px-2 py-1.5 border border-border/40 text-[9px] font-mono space-y-0.5">
          <div className="text-muted-foreground/70 uppercase tracking-wider mb-1">Legend</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-destructive" />Victim</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-warning" />Hazard</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" />Action</div>
        </div>
      </div>

      {/* Safety instruction */}
      <div className="bg-warning/10 border border-warning/40 rounded-lg px-4 py-2 max-w-lg text-center mb-2">
        <span className="text-xs font-mono text-warning">
          ⚠ Place the warning triangle 50m behind the accident (German road safety law)
        </span>
      </div>

      <InfoTip
        icon="📘"
        title="German StVO §15"
        text="50m on city/country roads, 100m on highways for warning triangle placement."
        className="max-w-lg mt-2"
      />

      <div className="mt-3 text-xs font-mono text-muted-foreground text-center">
        [ Select interactive elements to proceed ]
      </div>
    </div>
  );
};

export default AccidentScene;
