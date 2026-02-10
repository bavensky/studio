"use client";

import { useState, useEffect, useCallback } from "react";
import { lessonsData } from "@/lib/data";

const PROGRESS_KEY = "thai_learner_progress";

export const useProgress = () => {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(PROGRESS_KEY);
      if (storedProgress) {
        setCompletedLevels(JSON.parse(storedProgress));
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  const updateProgress = useCallback((newCompletedLevels: number[]) => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(newCompletedLevels));
      setCompletedLevels(newCompletedLevels);
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  }, []);

  const markAsCompleted = useCallback(
    (level: number) => {
      if (!completedLevels.includes(level)) {
        const newCompletedLevels = [...completedLevels, level].sort((a, b) => a - b);
        updateProgress(newCompletedLevels);
      }
    },
    [completedLevels, updateProgress]
  );

  const isCompleted = useCallback(
    (level: number) => {
      return completedLevels.includes(level);
    },
    [completedLevels]
  );
  
  const resetProgress = useCallback(() => {
    updateProgress([]);
  }, [updateProgress]);

  const progressPercentage = (completedLevels.length / lessonsData.length) * 100;

  return {
    completedLevels,
    markAsCompleted,
    isCompleted,
    progressPercentage,
    isInitialized,
    resetProgress,
  };
};
