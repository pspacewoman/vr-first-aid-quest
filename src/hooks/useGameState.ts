import { useState, useCallback } from "react";

export type Scene =
  | "main-menu"
  | "rescue-chain"
  | "driving"
  | "accident"
  | "safety-actions"
  | "emergency-call"
  | "victim-assessment"
  | "feedback"
  | "readiness";

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface RescueChainStep {
  id: string;
  label: string;
  icon: string;
  completed: boolean;
  correct: boolean;
  maxScore: number;
  earnedScore: number;
}

export interface GameState {
  currentScene: Scene;
  score: number;
  mistakes: number;
  startTime: number | null;
  elapsedTime: number;
  checklist: ChecklistItem[];
  rescueChain: RescueChainStep[];
  showChecklist: boolean;
  skippedSafety: boolean;
  incorrectCall: boolean;
  breathingMistake: boolean;
  firstAidTimedOut: boolean;
}

const initialChecklist: ChecklistItem[] = [
  { id: "secure-scene", label: "Secure accident scene", completed: false },
  { id: "call-emergency", label: "Call emergency services", completed: false },
  { id: "assess-consciousness", label: "Assess consciousness", completed: false },
  { id: "check-breathing", label: "Check breathing", completed: false },
  { id: "control-bleeding", label: "Control bleeding", completed: false },
  { id: "provide-help", label: "Provide first aid", completed: false },
];

const initialRescueChain: RescueChainStep[] = [
  { id: "recognize", label: "Recognize emergency", icon: "👁", completed: false, correct: true, maxScore: 15, earnedScore: 0 },
  { id: "secure", label: "Secure accident scene", icon: "🔶", completed: false, correct: true, maxScore: 20, earnedScore: 0 },
  { id: "call", label: "Call emergency services", icon: "📞", completed: false, correct: true, maxScore: 20, earnedScore: 0 },
  { id: "assess", label: "Assess victim", icon: "🩺", completed: false, correct: true, maxScore: 15, earnedScore: 0 },
  { id: "first-aid", label: "Provide first aid", icon: "🩹", completed: false, correct: true, maxScore: 20, earnedScore: 0 },
  { id: "wait", label: "Wait for professional help", icon: "🚑", completed: false, correct: true, maxScore: 10, earnedScore: 0 },
];

const initialState: GameState = {
  currentScene: "main-menu",
  score: 0,
  mistakes: 0,
  startTime: null,
  elapsedTime: 0,
  checklist: initialChecklist.map((c) => ({ ...c })),
  rescueChain: initialRescueChain.map((r) => ({ ...r })),
  showChecklist: false,
  skippedSafety: false,
  incorrectCall: false,
  breathingMistake: false,
  firstAidTimedOut: false,
};

export function useGameState() {
  const [state, setState] = useState<GameState>({ ...initialState });

  const goToScene = useCallback((scene: Scene) => {
    setState((prev) => ({
      ...prev,
      currentScene: scene,
      startTime: prev.startTime ?? (scene !== "main-menu" && scene !== "rescue-chain" ? Date.now() : null),
    }));
  }, []);

  const completeChecklistItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item) =>
        item.id === id ? { ...item, completed: true } : item
      ),
    }));
  }, []);

  const completeRescueChainStep = useCallback((id: string, correct: boolean = true) => {
    setState((prev) => ({
      ...prev,
      rescueChain: prev.rescueChain.map((step) => {
        if (step.id !== id) return step;
        const earned = correct ? step.maxScore : Math.floor(step.maxScore * 0.3);
        return { ...step, completed: true, correct, earnedScore: earned };
      }),
    }));
  }, []);

  const addMistake = useCallback((penalty: number = 5) => {
    setState((prev) => ({
      ...prev,
      mistakes: prev.mistakes + 1,
    }));
  }, []);

  const toggleChecklist = useCallback(() => {
    setState((prev) => ({ ...prev, showChecklist: !prev.showChecklist }));
  }, []);

  const setSkippedSafety = useCallback(() => {
    setState((prev) => ({ ...prev, skippedSafety: true }));
  }, []);

  const setIncorrectCall = useCallback(() => {
    setState((prev) => ({ ...prev, incorrectCall: true }));
  }, []);

  const setBreathingMistake = useCallback(() => {
    setState((prev) => ({ ...prev, breathingMistake: true }));
  }, []);

  const setFirstAidTimedOut = useCallback(() => {
    setState((prev) => ({ ...prev, firstAidTimedOut: true }));
  }, []);

  const finishGame = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentScene: "feedback" as Scene,
      elapsedTime: prev.startTime ? Math.floor((Date.now() - prev.startTime) / 1000) : 0,
      score: prev.rescueChain.reduce((sum, s) => sum + s.earnedScore, 0),
    }));
  }, []);

  const resetGame = useCallback(() => {
    setState({
      ...initialState,
      checklist: initialChecklist.map((c) => ({ ...c })),
      rescueChain: initialRescueChain.map((r) => ({ ...r })),
    });
  }, []);

  const resetFirstAid = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentScene: "victim-assessment" as Scene,
      checklist: prev.checklist.map((item) =>
        ["assess-consciousness", "check-breathing", "control-bleeding", "provide-help"].includes(item.id)
          ? { ...item, completed: false }
          : item
      ),
      rescueChain: prev.rescueChain.map((step) =>
        ["assess", "first-aid"].includes(step.id)
          ? { ...step, completed: false, correct: true, earnedScore: 0 }
          : step
      ),
      breathingMistake: false,
      firstAidTimedOut: false,
    }));
  }, []);

  const completionPercent = Math.round(
    (state.checklist.filter((c) => c.completed).length / state.checklist.length) * 100
  );

  const totalScore = state.rescueChain.reduce((sum, s) => sum + s.earnedScore, 0);

  return {
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
  };
}
