import { useState, useCallback } from "react";

export type Scene =
  | "main-menu"
  | "driving"
  | "accident"
  | "safety-actions"
  | "emergency-call"
  | "victim-assessment"
  | "feedback";

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface GameState {
  currentScene: Scene;
  score: number;
  mistakes: number;
  startTime: number | null;
  elapsedTime: number;
  checklist: ChecklistItem[];
  showChecklist: boolean;
  skippedSafety: boolean;
  incorrectCall: boolean;
}

const initialChecklist: ChecklistItem[] = [
  { id: "secure-scene", label: "Secure accident scene", completed: false },
  { id: "call-emergency", label: "Call emergency services", completed: false },
  { id: "assess-consciousness", label: "Assess consciousness", completed: false },
  { id: "check-breathing", label: "Check breathing", completed: false },
  { id: "control-bleeding", label: "Control bleeding", completed: false },
];

const initialState: GameState = {
  currentScene: "main-menu",
  score: 100,
  mistakes: 0,
  startTime: null,
  elapsedTime: 0,
  checklist: initialChecklist.map((c) => ({ ...c })),
  showChecklist: false,
  skippedSafety: false,
  incorrectCall: false,
};

export function useGameState() {
  const [state, setState] = useState<GameState>({ ...initialState });

  const goToScene = useCallback((scene: Scene) => {
    setState((prev) => ({
      ...prev,
      currentScene: scene,
      startTime: prev.startTime ?? Date.now(),
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

  const addMistake = useCallback((penalty: number = 5) => {
    setState((prev) => ({
      ...prev,
      mistakes: prev.mistakes + 1,
      score: Math.max(0, prev.score - penalty),
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

  const finishGame = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentScene: "feedback" as Scene,
      elapsedTime: prev.startTime ? Math.floor((Date.now() - prev.startTime) / 1000) : 0,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setState({
      ...initialState,
      checklist: initialChecklist.map((c) => ({ ...c })),
    });
  }, []);

  const completionPercent = Math.round(
    (state.checklist.filter((c) => c.completed).length / state.checklist.length) * 100
  );

  return {
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
  };
}
