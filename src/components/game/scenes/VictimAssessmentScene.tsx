import { useState, useEffect } from "react";
import VRPanel from "../VRPanel";
import victimAssessmentImg from "@/assets/victim-assessment.png";

interface VictimAssessmentSceneProps {
  onComplete: () => void;
  onCompleteChecklist: (id: string) => void;
}

type AssessStep = "approach" | "consciousness" | "breathing" | "bleeding" | "done";

const VictimAssessmentScene = ({ onComplete, onCompleteChecklist }: VictimAssessmentSceneProps) => {
  const [step, setStep] = useState<AssessStep>("approach");
  const [breathTimer, setBreathTimer] = useState(10);
  const [timerActive, setTimerActive] = useState(false);
  const [pressureApplied, setPressureApplied] = useState(false);

  useEffect(() => {
    if (!timerActive || breathTimer <= 0) return;
    const t = setInterval(() => {
      setBreathTimer((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          setTimerActive(false);
          onCompleteChecklist("check-breathing");
          setStep("bleeding");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [timerActive, breathTimer, onCompleteChecklist]);

  const handleTapShoulder = () => {
    onCompleteChecklist("assess-consciousness");
    setStep("breathing");
  };

  const handleStartBreathCheck = () => {
    setTimerActive(true);
  };

  const handleApplyPressure = () => {
    setPressureApplied(true);
    onCompleteChecklist("control-bleeding");
    setTimeout(() => setStep("done"), 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4">
      <div className="scene-label mb-6">Scene 6 — Victim Assessment</div>

      {/* Victim wireframe with image */}
      <div className="w-full max-w-lg aspect-[4/3] border-2 border-dashed border-border rounded-sm relative mb-6 overflow-hidden">
        <img src={victimAssessmentImg} alt="Victim assessment" className="w-full h-full object-cover opacity-40" />
        <div className="absolute bottom-2 left-4 text-xs font-mono text-foreground/50 bg-background/60 px-2 py-1 rounded-sm">
          [ victim lying on ground — assess condition ]
        </div>
      </div>

      {/* Interactive panels */}
      {step === "approach" && (
        <VRPanel sceneLabel="Contextual Prompt" className="max-w-md slide-up">
          <div className="space-y-3">
            <div className="prompt-text">Check the victim's condition</div>
            <button onClick={handleTapShoulder} className="vr-button w-full pulse-border">
              👋 Tap victim's shoulder
            </button>
            <div className="text-xs font-mono text-muted-foreground text-center">
              [ Interaction: tap to check consciousness ]
            </div>
          </div>
        </VRPanel>
      )}

      {step === "consciousness" && null}

      {step === "breathing" && (
        <VRPanel sceneLabel="Assessment Step" className="max-w-md slide-up">
          <div className="space-y-3">
            <div className="prompt-text">No response. Check breathing.</div>
            {!timerActive ? (
              <button onClick={handleStartBreathCheck} className="vr-button w-full pulse-border">
                🫁 Check Breathing
              </button>
            ) : (
              <div className="space-y-2">
                <div className="font-mono text-center text-lg text-foreground">
                  Checking… {breathTimer}s
                </div>
                <div className="w-full h-3 border border-dashed border-border rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-foreground/20 transition-all duration-1000"
                    style={{ width: `${((10 - breathTimer) / 10) * 100}%` }}
                  />
                </div>
                <div className="text-xs font-mono text-muted-foreground text-center">
                  [ look, listen, feel for 10 seconds ]
                </div>
              </div>
            )}
          </div>
        </VRPanel>
      )}

      {step === "bleeding" && (
        <VRPanel sceneLabel="Assessment Step" className="max-w-md slide-up">
          <div className="space-y-3">
            <div className="prompt-text">Breathing detected. Bleeding found on arm.</div>
            {!pressureApplied ? (
              <>
                <button onClick={handleApplyPressure} className="vr-button w-full pulse-border">
                  🩹 Apply pressure to wound
                </button>
                <div className="text-xs font-mono text-muted-foreground text-center">
                  [ Drag interaction: apply pressure ]
                </div>
              </>
            ) : (
              <div className="font-mono text-sm text-success text-center">
                ✓ Pressure applied — bleeding controlled
              </div>
            )}
          </div>
        </VRPanel>
      )}

      {step === "done" && (
        <VRPanel className="max-w-md text-center slide-up">
          <div className="space-y-4">
            <div className="font-mono text-sm text-success">
              ✓ Victim assessment complete
            </div>
            <div className="space-y-1 text-left">
              <div className="prompt-text border-success/30 text-success text-xs">☑ Assess consciousness</div>
              <div className="prompt-text border-success/30 text-success text-xs">☑ Check breathing</div>
              <div className="prompt-text border-success/30 text-success text-xs">☑ Control bleeding</div>
            </div>
            <button onClick={onComplete} className="vr-button-primary w-full">
              ▶ View Results
            </button>
          </div>
        </VRPanel>
      )}
    </div>
  );
};

export default VictimAssessmentScene;
