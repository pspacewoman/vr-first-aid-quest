import { useState, useEffect, useCallback } from "react";
import VRPanel from "../VRPanel";
import victimAssessmentImg from "@/assets/victim-assessment.png";

interface VictimAssessmentSceneProps {
  onComplete: () => void;
  onCompleteChecklist: (id: string) => void;
  onMistake: () => void;
  onBreathingMistake: () => void;
  onFirstAidTimeout: () => void;
  onRestartFirstAid: () => void;
}

type AssessStep = "approach" | "consciousness" | "breathing" | "breathing-check" | "bleeding" | "done";

const FIRST_AID_TIMER = 60;

const VictimAssessmentScene = ({ onComplete, onCompleteChecklist, onMistake, onBreathingMistake, onFirstAidTimeout, onRestartFirstAid }: VictimAssessmentSceneProps) => {
  const [step, setStep] = useState<AssessStep>("approach");
  const [breathTimer, setBreathTimer] = useState(10);
  const [timerActive, setTimerActive] = useState(false);
  const [pressureApplied, setPressureApplied] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [chestBreathing, setChestBreathing] = useState(true);
  
  // First aid overall timer
  const [firstAidTimer, setFirstAidTimer] = useState(FIRST_AID_TIMER);
  const [firstAidActive, setFirstAidActive] = useState(false);
  const [showTimeoutPrompt, setShowTimeoutPrompt] = useState(false);

  // Start first aid timer when approaching victim
  useEffect(() => {
    if (step === "approach" && !firstAidActive) {
      setFirstAidActive(true);
    }
  }, [step, firstAidActive]);

  // First aid countdown
  useEffect(() => {
    if (!firstAidActive || step === "done" || showTimeoutPrompt) return;
    if (firstAidTimer <= 0) {
      setFirstAidActive(false);
      setShowTimeoutPrompt(true);
      onFirstAidTimeout();
      return;
    }
    const t = setInterval(() => {
      setFirstAidTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(t);
  }, [firstAidActive, firstAidTimer, step, showTimeoutPrompt, onFirstAidTimeout]);

  // Breathing check timer
  useEffect(() => {
    if (!timerActive || breathTimer <= 0) return;
    const t = setInterval(() => {
      setBreathTimer((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          setTimerActive(false);
          onCompleteChecklist("check-breathing");
          setFeedback({ type: "success", text: "Breathing check complete. Victim is breathing." });
          setTimeout(() => {
            setFeedback(null);
            setStep("bleeding");
          }, 1500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [timerActive, breathTimer, onCompleteChecklist]);

  // Chest animation
  useEffect(() => {
    if (step === "breathing-check" && timerActive) {
      const interval = setInterval(() => setChestBreathing(prev => !prev), 1500);
      return () => clearInterval(interval);
    }
  }, [step, timerActive]);

  const handleTapShoulder = () => {
    onCompleteChecklist("assess-consciousness");
    setFeedback({ type: "success", text: "No response from victim." });
    setTimeout(() => {
      setFeedback(null);
      setStep("breathing");
    }, 1200);
  };

  const handleBreathingChoice = (choice: string) => {
    if (choice === "correct") {
      setStep("breathing-check");
      setTimerActive(true);
    } else {
      setFeedback({
        type: "error",
        text: "Incorrect. Check breathing by observing chest movement and listening for breath sounds."
      });
      onMistake();
      onBreathingMistake();
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleApplyPressure = () => {
    setPressureApplied(true);
    setFirstAidActive(false);
    onCompleteChecklist("control-bleeding");
    onCompleteChecklist("provide-help");
    setFeedback({ type: "success", text: "Pressure applied — bleeding controlled." });
    setTimeout(() => {
      setFeedback(null);
      setStep("done");
    }, 1200);
  };

  const handleRestart = () => {
    setStep("approach");
    setBreathTimer(10);
    setTimerActive(false);
    setPressureApplied(false);
    setFeedback(null);
    setChestBreathing(true);
    setFirstAidTimer(FIRST_AID_TIMER);
    setFirstAidActive(false);
    setShowTimeoutPrompt(false);
    onRestartFirstAid();
  };

  const timerColor = firstAidTimer <= 10 ? "text-destructive" : firstAidTimer <= 25 ? "text-warning" : "text-success";
  const timerBarColor = firstAidTimer <= 10 ? "bg-destructive" : firstAidTimer <= 25 ? "bg-warning" : "bg-success";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4">
      <div className="scene-label mb-4">Scene 6 — Victim Assessment</div>

      <div className="dialogue-box mb-4">
        {step === "approach" && "Check the victim's condition carefully."}
        {step === "breathing" && "Determine if the victim is breathing normally."}
        {step === "breathing-check" && "Observe chest movement and listen for breathing."}
        {step === "bleeding" && "Check the victim for visible injuries and bleeding."}
        {step === "done" && "First aid provided. The victim is stabilized."}
      </div>

      {/* First Aid Timer Bar */}
      {firstAidActive && step !== "done" && !showTimeoutPrompt && (
        <div className="w-full max-w-lg mb-3 slide-up">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono text-muted-foreground">⏱ First Aid Timer</span>
            <span className={`text-sm font-mono font-bold ${timerColor} ${firstAidTimer <= 10 ? "blink-prompt" : ""}`}>
              {firstAidTimer}s
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${timerBarColor}`}
              style={{ width: `${(firstAidTimer / FIRST_AID_TIMER) * 100}%` }}
            />
          </div>
          <div className="text-[10px] font-mono text-muted-foreground mt-1 text-center">
            Complete first aid before time runs out!
          </div>
        </div>
      )}

      {/* Timeout Prompt */}
      {showTimeoutPrompt && (
        <div className="fixed inset-0 bg-background/90 z-50 flex items-center justify-center fade-in backdrop-blur-sm">
          <VRPanel className="max-w-md text-center">
            <div className="text-5xl mb-4">⏰</div>
            <h3 className="font-mono text-xl font-bold text-destructive mb-2">TIME'S UP!</h3>
            <p className="text-sm text-foreground/80 mb-4">
              You didn't complete the first aid in time. In a real emergency, every second counts.
            </p>
            <div className="feedback-error mb-4">
              The victim needs immediate attention. Restart the first-aid procedure.
            </div>
            <button onClick={handleRestart} className="vr-button-primary w-full pulse-border">
              ↻ Restart First Aid
            </button>
          </VRPanel>
        </div>
      )}

      {/* Victim visual */}
      <div className="w-full max-w-lg aspect-[4/3] border border-border/40 rounded-lg relative mb-4 overflow-hidden shadow-lg">
        <img src={victimAssessmentImg} alt="Victim assessment" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        {/* Chest breathing animation */}
        {(step === "breathing-check" || step === "breathing") && (
          <div className={`absolute top-[35%] left-[40%] w-20 h-12 rounded-lg border-2 border-info/40 bg-info/10 flex items-center justify-center transition-transform duration-[1500ms] ease-in-out ${
            chestBreathing && timerActive ? "scale-y-105" : "scale-y-100"
          } breathe-animation`}>
            <span className="text-[10px] font-mono text-info">🫁 Chest</span>
          </div>
        )}

        {/* Wound area */}
        {(step === "bleeding" || step === "done") && (
          <div className={`absolute top-[55%] left-[55%] highlight-glow ${pressureApplied ? '' : 'blink-prompt'}`}>
            <div className="w-14 h-10 rounded-lg bg-destructive/25 border-2 border-destructive/50 flex items-center justify-center">
              <span className="text-[10px] font-mono text-destructive font-bold">
                {pressureApplied ? "🩹 Treated" : "🩸 Wound"}
              </span>
            </div>
          </div>
        )}

        {/* Shoulder tap area */}
        {step === "approach" && (
          <div className="absolute top-[25%] left-[35%] w-16 h-12 border-2 border-primary/40 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-all highlight-glow"
               onClick={handleTapShoulder}>
            <span className="text-[10px] font-mono text-primary blink-prompt">👋 Shoulder</span>
          </div>
        )}

        <div className="absolute bottom-2 left-3 bg-card/70 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-foreground/50">
          Victim lying on ground
        </div>
      </div>

      {/* Feedback popup */}
      {feedback && (
        <div className={`mb-3 max-w-md w-full ${feedback.type === "success" ? "feedback-success" : "feedback-error"}`}>
          {feedback.type === "success" ? "✓" : "✕"} {feedback.text}
        </div>
      )}

      {/* Interactive panels */}
      {step === "approach" && !feedback && (
        <VRPanel sceneLabel="Contextual Prompt" className="max-w-md slide-up">
          <div className="space-y-3">
            <div className="prompt-text">Tap the victim's shoulder to check consciousness</div>
            <button onClick={handleTapShoulder} className="vr-button w-full pulse-border">
              👋 Tap Victim's Shoulder
            </button>
          </div>
        </VRPanel>
      )}

      {step === "breathing" && !feedback && (
        <VRPanel sceneLabel="Assessment Step" className="max-w-md slide-up">
          <div className="space-y-3">
            <div className="prompt-text">No response. How do you check breathing?</div>
            <button onClick={() => handleBreathingChoice("correct")} className="vr-button w-full">
              🫁 Look, listen, and feel for 10 seconds
            </button>
            <button onClick={() => handleBreathingChoice("wrong1")} className="vr-button w-full">
              🪞 Hold a mirror to the mouth
            </button>
            <button onClick={() => handleBreathingChoice("wrong2")} className="vr-button w-full">
              💧 Splash water on the face
            </button>
          </div>
        </VRPanel>
      )}

      {step === "breathing-check" && (
        <VRPanel sceneLabel="Assessment Step" className="max-w-md slide-up">
          <div className="space-y-3">
            <div className="prompt-text">Observing breathing…</div>
            <div className="space-y-2">
              <div className="font-mono text-center text-lg text-foreground">
                Checking… <span className="text-primary">{breathTimer}s</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-info/60 transition-all duration-1000 rounded-full"
                  style={{ width: `${((10 - breathTimer) / 10) * 100}%` }}
                />
              </div>
              <div className="text-xs font-mono text-muted-foreground text-center">
                Look at chest, listen near mouth, feel for air
              </div>
            </div>
          </div>
        </VRPanel>
      )}

      {step === "bleeding" && !feedback && (
        <VRPanel sceneLabel="Assessment Step" className="max-w-md slide-up">
          <div className="space-y-3">
            <div className="prompt-text">
              Breathing detected. <span className="text-destructive font-bold">Bleeding found on arm.</span>
            </div>
            <button onClick={handleApplyPressure} className="vr-button w-full pulse-border">
              🩹 Apply Pressure to Wound
            </button>
            <div className="text-xs font-mono text-muted-foreground text-center">
              Press firmly on the wound to control bleeding
            </div>
          </div>
        </VRPanel>
      )}

      {step === "done" && (
        <VRPanel className="max-w-md text-center slide-up">
          <div className="space-y-4">
            <div className="feedback-success">
              ✓ Victim assessment and first aid complete
            </div>
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2 text-xs font-mono text-success">
                <span className="w-4 h-4 bg-success/20 rounded flex items-center justify-center text-[10px]">✓</span>
                Consciousness assessed
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-success">
                <span className="w-4 h-4 bg-success/20 rounded flex items-center justify-center text-[10px]">✓</span>
                Breathing checked
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-success">
                <span className="w-4 h-4 bg-success/20 rounded flex items-center justify-center text-[10px]">✓</span>
                Bleeding controlled
              </div>
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
