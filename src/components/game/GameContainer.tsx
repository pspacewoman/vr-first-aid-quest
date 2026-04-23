import { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { useSceneAudio } from "@/hooks/useSceneAudio";
import { setFeedbackMuted } from "@/lib/feedbackSound";
import { useEffect } from "react";
import ChecklistOverlay from "./ChecklistOverlay";
import SideChecklist from "./SideChecklist";
import FlowDiagram from "./FlowDiagram";
import MainMenuScene from "./scenes/MainMenuScene";
import RescueChainScene from "./scenes/RescueChainScene";
import DrivingScene from "./scenes/DrivingScene";
import AccidentScene from "./scenes/AccidentScene";
import SafetyActionsScene from "./scenes/SafetyActionsScene";
import EmergencyCallScene from "./scenes/EmergencyCallScene";
import VictimAssessmentScene from "./scenes/VictimAssessmentScene";
import FeedbackScene from "./scenes/FeedbackScene";
import ReadinessScene from "./scenes/ReadinessScene";
import UnityPreviewScene from "./scenes/UnityPreviewScene";

const GameContainer = () => {
  const {
    state,
    goToScene,
    completeChecklistItem,
    completeRescueChainStep,
    addMistake,
    toggleChecklist,
    setSkippedSafety,
    setIncorrectCall,
    setBreathingMistake,
    setFirstAidTimedOut,
    finishGame,
    resetGame,
    resetFirstAid,
    completionPercent,
    totalScore,
  } = useGameState();

  const [showFlow, setShowFlow] = useState(false);
  const [muted, setMuted] = useState(false);

  useSceneAudio(state.currentScene, muted);

  useEffect(() => {
    setFeedbackMuted(muted);
  }, [muted]);

  const isGameplay = !["main-menu", "rescue-chain", "feedback", "readiness", "unity-preview"].includes(state.currentScene);

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
    completeRescueChainStep("secure", false);
    goToScene("emergency-call");
  };

  const handleSafetyComplete = () => {
    completeRescueChainStep("recognize");
    completeRescueChainStep("secure");
    goToScene("emergency-call");
  };

  const handleCallComplete = () => {
    completeRescueChainStep("call");
    goToScene("victim-assessment");
  };

  const handleVictimComplete = () => {
    completeRescueChainStep("assess");
    completeRescueChainStep("first-aid");
    completeRescueChainStep("wait");
    finishGame();
  };

  const renderScene = () => {
    switch (state.currentScene) {
      case "main-menu":
        return (
          <MainMenuScene
            onStartGame={() => goToScene("rescue-chain")}
            onOpenChecklist={toggleChecklist}
            soundOn={!muted}
            onToggleSound={(on) => setMuted(!on)}
          />
        );
      case "rescue-chain":
        return <RescueChainScene onContinue={() => goToScene("driving")} />;
      case "driving":
        return <DrivingScene onComplete={() => goToScene("accident")} />;
      case "accident":
        return <AccidentScene onSelectHotspot={handleAccidentHotspot} />;
      case "safety-actions":
        return (
          <SafetyActionsScene
            onComplete={handleSafetyComplete}
            onSkip={handleSkipSafety}
            onCompleteChecklist={completeChecklistItem}
          />
        );
      case "emergency-call":
        return (
          <EmergencyCallScene
            onComplete={handleCallComplete}
            onCompleteChecklist={completeChecklistItem}
            onMistake={() => addMistake(5)}
            onIncorrectCall={setIncorrectCall}
          />
        );
      case "victim-assessment":
        return (
          <VictimAssessmentScene
            onComplete={handleVictimComplete}
            onCompleteChecklist={completeChecklistItem}
            onMistake={() => addMistake(5)}
            onBreathingMistake={setBreathingMistake}
            onFirstAidTimeout={setFirstAidTimedOut}
            onRestartFirstAid={resetFirstAid}
          />
        );
      case "feedback":
        return (
          <FeedbackScene
            state={state}
            completionPercent={completionPercent}
            totalScore={totalScore}
            onRetry={resetGame}
            onMainMenu={resetGame}
            onReadiness={() => goToScene("readiness")}
            onUnityPreview={() => goToScene("unity-preview")}
          />
        );
      case "readiness":
        return (
          <ReadinessScene
            totalScore={totalScore}
            onRetry={resetGame}
            onMainMenu={resetGame}
          />
        );
      case "unity-preview":
        return (
          <UnityPreviewScene
            totalScore={totalScore}
            onBack={() => goToScene("feedback")}
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
      {isGameplay && (
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-2 bg-card/90 border-b border-border/40 backdrop-blur-sm">
          <div className="font-mono text-xs text-primary/70 uppercase tracking-wider flex items-center gap-3">
            <span>VR First Aid Training</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-foreground/60">Score: <span className="text-primary font-bold">{totalScore}pts</span></span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFlow(true)}
              className="font-mono text-xs px-3 py-1 border border-border/40 rounded-lg hover:bg-accent transition-colors"
            >
              Flow ◇
            </button>
            <button
              onClick={toggleChecklist}
              className="font-mono text-xs px-3 py-1 border border-border/40 rounded-lg hover:bg-accent transition-colors"
            >
              Checklist ☐ {completionPercent}%
            </button>
            <button
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute ambience" : "Mute ambience"}
              title={muted ? "Unmute ambience" : "Mute ambience"}
              className="font-mono text-xs px-3 py-1 border border-border/40 rounded-lg hover:bg-accent transition-colors"
            >
              {muted ? "Audio 🔇" : "Audio 🔊"}
            </button>
            <button
              onClick={resetGame}
              className="font-mono text-xs px-3 py-1 border border-destructive/30 rounded-lg text-destructive/60 hover:text-destructive hover:bg-destructive/5 transition-colors"
            >
              Reset ✕
            </button>
          </div>
        </div>
      )}

      {/* Scene content */}
      {renderScene()}

      {/* Side checklist during gameplay */}
      {isGameplay && (
        <SideChecklist items={state.checklist} completionPercent={completionPercent} />
      )}

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
