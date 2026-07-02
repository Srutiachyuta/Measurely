import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CalculationEntry {
  id: string;
  toolSlug: string;
  toolName: string;
  category: string;
  inputData: Record<string, number | string>;
  resultData: Record<string, number | string>;
  timestamp: number;
}

interface CalculationsState {
  history: CalculationEntry[];
  addCalculation: (entry: Omit<CalculationEntry, "id" | "timestamp">) => void;
  removeCalculation: (id: string) => void;
  clearHistory: () => void;
  getRecentCalculations: (limit?: number) => CalculationEntry[];
}

export const useCalculations = create<CalculationsState>()(
  persist(
    (set, get) => ({
      history: [],
      addCalculation: (entry) =>
        set((state) => ({
          history: [
            {
              ...entry,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
            ...state.history,
          ].slice(0, 200),
        })),
      removeCalculation: (id) =>
        set((state) => ({
          history: state.history.filter((entry) => entry.id !== id),
        })),
      clearHistory: () => set({ history: [] }),
      getRecentCalculations: (limit = 10) =>
        get().history.slice(0, limit),
    }),
    {
      name: "measurely-calculations",
    }
  )
);
