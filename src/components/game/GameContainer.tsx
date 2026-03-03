import { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import ChecklistOverlay from "./ChecklistOverlay";
import FlowDiagram from "./FlowDiagram";
import MainMenuScene from "./scenes/MainMenuScene";
import DrivingScene from "./scenes/DrivingScene";
import AccidentScene from "./scenes/AccidentScene";
import SafetyActionsScene from "./scenes/SafetyActionsScene";
import EmergencyCallScene from "./scenes/EmergencyCallScene";
import VictimAssessmentScene from "./scenes/VictimAssessmentScene";
import FeedbackScene from "./scenes/FeedbackScene";

const GameContainer = () => {
  const {
    state,
    goToScene,
    completeChecklistItem,
    addMistake,
    toggleChecklist,
    setSkippedSafety,
    setIncorrectCall,
    finishGame,
    resetGame,
    completionPercent,
  } = useGameState();

  const [showFlow, setShowFlow] = useState(false);

  const handleAccidentHotspot = (id: string) => {
    if (id === "triangle") {
      goToScene("safety-actions");
    } else if (id === "phone") {
      goToScene("emergency-call");
    } else if (id === "victim") {
      goToScene("victim-assessment");
    }
  };

  const handleSkipSafety = () => {
    setSkippedSafety();
    addMistake(15);
    goToScene("emergency-call");
  };

  const renderScene = () => {
    switch (state.currentScene) {
      case "main-menu":
        return (
          <MainMenuScene
            onStartGame={() => goToScene("driving")}
            onOpenChecklist={toggleChecklist}
          />
        );
      case "driving":
        return <DrivingScene onComplete={() => goToScene("accident")} />;
      case "accident":
        return <AccidentScene onSelectHotspot={handleAccidentHotspot} />;
      case "safety-actions":
        return (
          <SafetyActionsScene
            onComplete={() => goToScene("emergency-call")}
            onSkip={handleSkipSafety}
            onCompleteChecklist={completeChecklistItem}
          />
        );
      case "emergency-call":
        return (
          <EmergencyCallScene
            onComplete={() => goToScene("victim-assessment")}
            onCompleteChecklist={completeChecklistItem}
            onMistake={() => addMistake(5)}
            onIncorrectCall={setIncorrectCall}
          />
        );
      case "victim-assessment":
        return (
          <VictimAssessmentScene
            onComplete={finishGame}
            onCompleteChecklist={completeChecklistItem}
          />
        );
      case "feedback":
        return (
          <FeedbackScene
            state={state}
            completionPercent={completionPercent}
            onRetry={resetGame}
            onMainMenu={resetGame}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Top bar */}
      {state.currentScene !== "main-menu" && state.currentScene !== "feedback" && (
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-2 bg-card/80 border-b border-dashed border-border backdrop-blur-sm">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            VR First Aid Training
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFlow(true)}
              className="font-mono text-xs px-3 py-1 border border-dashed border-border rounded-sm hover:bg-accent transition-colors"
            >
              Flow ◇
            </button>
            <button
              onClick={toggleChecklist}
              className="font-mono text-xs px-3 py-1 border border-dashed border-border rounded-sm hover:bg-accent transition-colors"
            >
              Checklist ☐ {completionPercent}%
            </button>
            <button
              onClick={resetGame}
              className="font-mono text-xs px-3 py-1 border border-dashed border-destructive/40 rounded-sm text-destructive/60 hover:text-destructive hover:bg-destructive/5 transition-colors"
            >
              Reset ✕
            </button>
          </div>
        </div>
      )}

      {/* Scene content */}
      {renderScene()}

      {/* Checklist overlay */}
      {state.showChecklist && (
        <ChecklistOverlay
          items={state.checklist}
          completionPercent={completionPercent}
          onClose={toggleChecklist}
        />
      )}

      {/* Flow diagram */}
      {showFlow && (
        <FlowDiagram currentScene={state.currentScene} onClose={() => setShowFlow(false)} />
      )}
    </div>
  );
};

export default GameContainer;
