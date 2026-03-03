import { useState } from "react";
import VRPanel from "../VRPanel";
import emergencyCallImg from "@/assets/emergency-call.png";

interface EmergencyCallSceneProps {
  onComplete: () => void;
  onCompleteChecklist: (id: string) => void;
  onMistake: () => void;
  onIncorrectCall: () => void;
}

type CallStep = "calling" | "dialogue" | "complete";

const EmergencyCallScene = ({ onComplete, onCompleteChecklist, onMistake, onIncorrectCall }: EmergencyCallSceneProps) => {
  const [step, setStep] = useState<CallStep>("calling");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

  const handleCalling = () => {
    setTimeout(() => setStep("dialogue"), 1500);
  };

  const handleDialogueChoice = (choice: string) => {
    if (choice === "silent") {
      setShowFeedback("Staying silent is not helpful! Describe the situation.");
      onMistake();
      onIncorrectCall();
      setTimeout(() => setShowFeedback(null), 2000);
      return;
    }

    setSelectedOptions((prev) => [...prev, choice]);

    if (selectedOptions.length >= 1 && choice !== "silent") {
      onCompleteChecklist("call-emergency");
      setStep("complete");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4">
      <div className="scene-label mb-6">Scene 5 — Emergency Call</div>

      {step === "calling" && (
        <VRPanel sceneLabel="Floating UI" className="max-w-md text-center slide-up">
          <div className="space-y-4">
            <img src={emergencyCallImg} alt="Emergency call" className="w-28 h-28 mx-auto opacity-60 rounded-sm" />
            <div className="font-mono text-lg text-foreground">📱 Calling 112…</div>
            <div className="w-full h-2 border border-dashed border-border rounded-sm overflow-hidden">
              <div className="h-full bg-foreground/20 animate-pulse w-full" />
            </div>
            <button onClick={handleCalling} className="vr-button w-full">
              Connect Call
            </button>
          </div>
        </VRPanel>
      )}

      {step === "dialogue" && (
        <VRPanel sceneLabel="Dialogue Prompt" title="112 Operator" className="max-w-md slide-up">
          <div className="prompt-text mb-6">
            "Emergency services. What is your situation?"
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleDialogueChoice("location")}
              disabled={selectedOptions.includes("location")}
              className={`vr-button w-full text-left ${
                selectedOptions.includes("location") ? "opacity-50 border-success/40 text-success" : ""
              }`}
            >
              📍 Describe location
              {selectedOptions.includes("location") && " ✓"}
            </button>
            <button
              onClick={() => handleDialogueChoice("injury")}
              disabled={selectedOptions.includes("injury")}
              className={`vr-button w-full text-left ${
                selectedOptions.includes("injury") ? "opacity-50 border-success/40 text-success" : ""
              }`}
            >
              🩹 Describe injury
              {selectedOptions.includes("injury") && " ✓"}
            </button>
            <button
              onClick={() => handleDialogueChoice("silent")}
              className="vr-button-destructive w-full text-left"
            >
              … Stay silent (incorrect)
            </button>
          </div>

          {showFeedback && (
            <div className="mt-4 prompt-text border-destructive/40 text-destructive text-center">
              ✕ {showFeedback}
            </div>
          )}
        </VRPanel>
      )}

      {step === "complete" && (
        <VRPanel className="max-w-md text-center slide-up">
          <div className="space-y-4">
            <div className="font-mono text-sm text-success">
              ✓ Emergency services notified
            </div>
            <div className="prompt-text border-success/30">
              ☑ Called emergency services — Complete
            </div>
            <button onClick={onComplete} className="vr-button-primary w-full">
              ▶ Continue to Victim Assessment
            </button>
          </div>
        </VRPanel>
      )}
    </div>
  );
};

export default EmergencyCallScene;
