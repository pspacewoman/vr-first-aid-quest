import { useState } from "react";
import VRPanel from "../VRPanel";
import rescueChainImg from "@/assets/rescue-chain.png";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Maximize2, X } from "lucide-react";

interface RescueChainSceneProps {
  onContinue: () => void;
}

const steps = [
  { icon: "👁", label: "Recognize Emergency", desc: "Identify the situation and stay calm" },
  { icon: "🩺", label: "Assess the Victim", desc: "Check consciousness and breathing" },
  { icon: "🔺", label: "Secure Accident Scene", desc: "Place warning triangle 50m behind (StVO)" },
  { icon: "📞", label: "Call Emergency Services", desc: "Dial 112 and describe the situation" },
  { icon: "🩹", label: "Provide First Aid", desc: "Apply pressure, stabilize, support" },
  { icon: "🚑", label: "Wait for Help", desc: "Stay with the victim until help arrives" },
];

const RescueChainScene = ({ onContinue }: RescueChainSceneProps) => {
  const [zoomOpen, setZoomOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4 py-12">
      <VRPanel className="w-full max-w-2xl" sceneLabel="Introduction">
        <h2 className="font-mono text-xl font-bold text-foreground mb-2 text-center">
          🔗 The Rescue Chain
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Follow these steps in order to save a life. This training will guide you through each one.
        </p>

        <div className="relative mx-auto mb-6 w-full max-w-sm">
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="group block w-full overflow-hidden rounded-lg border border-border/40 bg-background/40 transition-all hover:border-primary/60 hover:shadow-lg"
            aria-label="Enlarge rescue chain diagram"
          >
            <img
              src={rescueChainImg}
              alt="Rescue chain six-step diagram"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
            <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-md bg-background/80 backdrop-blur px-2 py-1 text-xs font-mono text-foreground border border-border/60">
              <Maximize2 className="w-3 h-3" />
              Pop out
            </span>
          </button>
          <p className="mt-2 text-center text-xs text-muted-foreground font-mono">
            Tap the image to enlarge
          </p>
        </div>

        <div className="dialogue-box mb-6">
          Learn the correct sequence of emergency response before you begin.
        </div>

        <div className="space-y-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 rounded-lg border border-border/40 bg-muted/30 hover:bg-muted/60 transition-all"
              style={{ animationDelay: `${i * 100}ms`, animation: 'slideUp 0.4s ease-out both' }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-lg flex-shrink-0">
                {step.icon}
              </div>
              <div className="flex-1">
                <div className="font-mono text-sm font-bold text-foreground">
                  {i + 1}. {step.label}
                </div>
                <div className="text-xs text-muted-foreground">{step.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="text-muted-foreground/40 text-lg">→</div>
              )}
            </div>
          ))}
        </div>

        <button onClick={onContinue} className="vr-button-primary w-full mt-6">
          ▶ Begin Training
        </button>
      </VRPanel>

      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-3xl p-0 bg-background border-border">
          <DialogTitle className="sr-only">Rescue Chain diagram</DialogTitle>
          <div className="relative">
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute top-3 right-3 z-10 inline-flex items-center justify-center rounded-md bg-background/80 backdrop-blur p-2 border border-border/60 hover:bg-background"
              aria-label="Close enlarged view"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={rescueChainImg}
              alt="Rescue chain six-step diagram, enlarged"
              className="w-full h-auto object-contain rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RescueChainScene;
