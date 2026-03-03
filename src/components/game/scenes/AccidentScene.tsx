import accidentSceneImg from "@/assets/accident-scene.png";

interface AccidentSceneProps {
  onSelectHotspot: (id: string) => void;
}

const AccidentScene = ({ onSelectHotspot }: AccidentSceneProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4">
      <div className="scene-label mb-6">Scene 3 — Accident Encounter</div>

      {/* 3D layout with image background */}
      <div className="w-full max-w-3xl aspect-video border-2 border-dashed border-border rounded-sm relative mb-6 p-4 overflow-hidden">
        {/* Background image */}
        <img src={accidentSceneImg} alt="Accident scene" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        {/* Ground plane */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 border-t border-dashed border-foreground/10">
          <div className="absolute top-2 left-4 text-xs font-mono text-muted-foreground">[ road surface ]</div>
        </div>

        {/* Crashed car */}
        <div className="absolute top-[25%] left-[20%] w-32 h-16 border-2 border-dashed border-foreground/40 rounded-sm flex items-center justify-center">
          <span className="text-xs font-mono text-muted-foreground text-center">🚗 crashed<br/>vehicle</span>
        </div>

        {/* Victim */}
        <div
          onClick={() => onSelectHotspot("victim")}
          className="hotspot absolute top-[45%] left-[45%] w-20 h-14 cursor-pointer"
        >
          <span className="text-xs font-mono">👤 victim</span>
        </div>

        {/* Warning triangle */}
        <div
          onClick={() => onSelectHotspot("triangle")}
          className="hotspot absolute bottom-[20%] right-[15%] w-20 h-14 pulse-border"
        >
          <span className="text-xs font-mono">⚠ triangle</span>
        </div>

        {/* Cones */}
        <div
          onClick={() => onSelectHotspot("cones")}
          className="hotspot absolute bottom-[20%] left-[15%] w-20 h-14"
        >
          <span className="text-xs font-mono">🔶 cones</span>
        </div>

        {/* Phone */}
        <div
          onClick={() => onSelectHotspot("phone")}
          className="hotspot absolute top-[15%] right-[20%] w-20 h-14"
        >
          <span className="text-xs font-mono">📱 phone</span>
        </div>

        {/* Bystanders */}
        <div className="absolute top-[20%] right-[45%] flex gap-2 opacity-40">
          <div className="w-6 h-10 border border-dashed border-foreground/20 rounded-sm" />
          <div className="w-6 h-10 border border-dashed border-foreground/20 rounded-sm" />
          <div className="w-6 h-10 border border-dashed border-foreground/20 rounded-sm" />
        </div>
        <div className="absolute top-[18%] right-[42%] text-xs font-mono text-muted-foreground/40">
          bystanders
        </div>
      </div>

      {/* Prompt */}
      <div className="prompt-text text-center max-w-lg">
        "Secure the accident scene before helping the victim."
      </div>

      <div className="mt-4 text-xs font-mono text-muted-foreground text-center">
        [ Select interactive hotspots to proceed ]
      </div>
    </div>
  );
};

export default AccidentScene;
