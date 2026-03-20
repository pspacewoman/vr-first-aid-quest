import VRPanel from "../VRPanel";
import rescueChainImg from "@/assets/rescue-chain.png";

interface RescueChainSceneProps {
  onContinue: () => void;
}

const steps = [
  { icon: "👁", label: "Recognize Emergency", desc: "Identify the situation and stay calm" },
  { icon: "🔶", label: "Secure Accident Scene", desc: "Protect yourself and others from danger" },
  { icon: "📞", label: "Call Emergency Services", desc: "Dial 112 and describe the situation" },
  { icon: "🩺", label: "Assess the Victim", desc: "Check consciousness and breathing" },
  { icon: "🩹", label: "Provide First Aid", desc: "Apply pressure, stabilize, support" },
  { icon: "🚑", label: "Wait for Help", desc: "Stay with the victim until help arrives" },
];

const RescueChainScene = ({ onContinue }: RescueChainSceneProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4 py-12">
      <VRPanel className="w-full max-w-2xl" sceneLabel="Introduction">
        <h2 className="font-mono text-xl font-bold text-foreground mb-2 text-center">
          🔗 The Rescue Chain
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Follow these steps in order to save a life. This training will guide you through each one.
        </p>

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
    </div>
  );
};

export default RescueChainScene;
