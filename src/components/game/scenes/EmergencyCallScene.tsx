import { useState } from "react";
import VRPanel from "../VRPanel";
import emergencyCallImg from "@/assets/emergency-call.png";
import { playCorrect, playWrong } from "@/lib/feedbackSound";

interface EmergencyCallSceneProps {
  onComplete: () => void;
  onCompleteChecklist: (id: string) => void;
  onMistake: () => void;
  onIncorrectCall: () => void;
}

type CallStep = "calling" | "dialogue" | "complete";

interface DialogueLine {
  speaker: "operator" | "player";
  text: string;
}

const EmergencyCallScene = ({ onComplete, onCompleteChecklist, onMistake, onIncorrectCall }: EmergencyCallSceneProps) => {
  const [step, setStep] = useState<CallStep>("calling");
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [dialogueHistory, setDialogueHistory] = useState<DialogueLine[]>([]);
  const [showFeedback, setShowFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleCalling = () => {
    setTimeout(() => {
      setStep("dialogue");
      setDialogueHistory([{ speaker: "operator", text: "Emergency services, what is your location?" }]);
    }, 1500);
  };

  const dialogueFlow = [
    {
      operatorQuestion: "Emergency services, what is your location?",
      options: [
        { label: '📍 "Weidenau ZOB, 57076"', correct: true },
        { label: '📍 "Somewhere on the road"', correct: false },
        { label: "… Stay silent", correct: false },
      ],
      correctResponse: "Weidenau ZOB, 57076.",
      nextOperator: "What happened?",
    },
    {
      operatorQuestion: "What happened?",
      options: [
        { label: '🩹 "Road accident, one person injured"', correct: true },
        { label: '🩹 "I don\'t know"', correct: false },
        { label: "… Stay silent", correct: false },
      ],
      correctResponse: "There has been a road accident and one person is injured.",
      nextOperator: "Is the person conscious and breathing?",
    },
    {
      operatorQuestion: "Is the person conscious and breathing?",
      options: [
        { label: '🩺 "I haven\'t checked yet, I will now"', correct: true },
        { label: '🩺 "Yes, everything is fine"', correct: false },
        { label: "… Stay silent", correct: false },
      ],
      correctResponse: "I haven't checked yet, I will assess now.",
      nextOperator: null,
    },
  ];

  const handleChoice = (optionIndex: number) => {
    const current = dialogueFlow[dialogueIndex];
    const option = current.options[optionIndex];

    if (!option.correct) {
      playWrong();
      setShowFeedback({ type: "error", text: "Incorrect response. Provide clear, specific information to emergency services." });
      onMistake();
      onIncorrectCall();
      setTimeout(() => setShowFeedback(null), 2500);
      return;
    }

    playCorrect();
    // Add player response
    const newHistory: DialogueLine[] = [
      ...dialogueHistory,
      { speaker: "player", text: current.correctResponse },
    ];

    // Add next operator line if exists
    if (current.nextOperator) {
      newHistory.push({ speaker: "operator", text: current.nextOperator });
    }

    setDialogueHistory(newHistory);

    if (dialogueIndex >= dialogueFlow.length - 1) {
      onCompleteChecklist("call-emergency");
      setTimeout(() => setStep("complete"), 1000);
    } else {
      setDialogueIndex(dialogueIndex + 1);
    }

    setShowFeedback({ type: "success", text: "Correct!" });
    setTimeout(() => setShowFeedback(null), 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen fade-in px-4">
      <div className="scene-label mb-4">Scene 5 — Emergency Call</div>

      <div className="dialogue-box mb-4">
        Call emergency services and describe the situation clearly.
      </div>

      {step === "calling" && (
        <VRPanel sceneLabel="Floating UI" className="max-w-md text-center slide-up">
          <div className="space-y-4">
            <img
              src={emergencyCallImg}
              alt="Hand holding a phone with the emergency call screen at night"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-40 h-40 mx-auto object-cover rounded-lg vibrate shadow-lg border border-border/40"
            />
            <div className="font-mono text-lg text-foreground">📱 Calling 112…</div>
            <div className="flex justify-center gap-1.5 my-2">
              <span className="w-2 h-2 rounded-full bg-primary typing-dot" />
              <span className="w-2 h-2 rounded-full bg-primary typing-dot" />
              <span className="w-2 h-2 rounded-full bg-primary typing-dot" />
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary/60 animate-pulse w-full rounded-full" />
            </div>
            <div className="text-[11px] font-mono text-info bg-info/10 border border-info/30 rounded-lg px-3 py-2">
              🇪🇺 112 — Single emergency number across all EU member states
            </div>
            <button onClick={handleCalling} className="vr-button w-full">
              Connect Call
            </button>
          </div>
        </VRPanel>
      )}

      {step === "dialogue" && (
        <VRPanel sceneLabel="Emergency Call" title="📞 112 Operator" className="max-w-lg slide-up">
          {/* Dialogue history */}
          <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
            {dialogueHistory.map((line, i) => (
              <div
                key={i}
                className={`flex ${line.speaker === "player" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-xs font-mono ${
                    line.speaker === "operator"
                      ? "bg-info/15 border border-info/30 text-info"
                      : "bg-primary/15 border border-primary/30 text-primary"
                  }`}
                >
                  <span className="font-bold text-[10px] block mb-0.5">
                    {line.speaker === "operator" ? "🎧 Operator" : "🧑 You"}
                  </span>
                  "{line.text}"
                </div>
              </div>
            ))}
          </div>

          {/* Current choices */}
          {dialogueIndex < dialogueFlow.length && (
            <div className="space-y-2">
              <div className="text-xs font-mono text-muted-foreground mb-2">Choose your response:</div>
              {dialogueFlow[dialogueIndex].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(i)}
                  className={`w-full text-left text-sm ${
                    opt.correct ? "vr-button" : i === dialogueFlow[dialogueIndex].options.length - 1 ? "vr-button-destructive" : "vr-button"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Feedback popup */}
          {showFeedback && (
            <div className={`mt-3 ${showFeedback.type === "success" ? "feedback-success" : "feedback-error"}`}>
              {showFeedback.type === "success" ? "✓" : "✕"} {showFeedback.text}
            </div>
          )}
        </VRPanel>
      )}

      {step === "complete" && (
        <VRPanel className="max-w-md text-center slide-up">
          <div className="space-y-4">
            <div className="feedback-success">
              ✓ Emergency services notified successfully
            </div>
            <div className="text-xs text-muted-foreground">
              Location: Weidenau ZOB, 57076 • Situation: Road accident, 1 injured
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
