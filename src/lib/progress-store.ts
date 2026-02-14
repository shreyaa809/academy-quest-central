import { useState, useEffect, useCallback } from "react";

export interface LessonProgress {
  videoWatched: boolean;
  quizCompleted: boolean;
  quizScore: number;
  rating: number;
  feedback: string;
  xpEarned: number;
}

export interface UserProgress {
  totalXp: number;
  lessons: Record<string, LessonProgress>;
  level: number;
  streak: number;
}

const STORAGE_KEY = "academy_progress";

const defaultProgress: UserProgress = {
  totalXp: 0,
  lessons: {},
  level: 1,
  streak: 0,
};

function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { ...defaultProgress };
}

function saveProgress(progress: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const completeVideo = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const lesson = prev.lessons[lessonId] || {
        videoWatched: false, quizCompleted: false, quizScore: 0, rating: 0, feedback: "", xpEarned: 0,
      };
      if (lesson.videoWatched) return prev;
      return {
        ...prev,
        totalXp: prev.totalXp + 10,
        level: Math.floor((prev.totalXp + 10) / 50) + 1,
        lessons: {
          ...prev.lessons,
          [lessonId]: { ...lesson, videoWatched: true, xpEarned: lesson.xpEarned + 10 },
        },
      };
    });
  }, []);

  const completeQuiz = useCallback((lessonId: string, score: number, total: number) => {
    setProgress((prev) => {
      const lesson = prev.lessons[lessonId] || {
        videoWatched: false, quizCompleted: false, quizScore: 0, rating: 0, feedback: "", xpEarned: 0,
      };
      if (lesson.quizCompleted) return prev;
      const quizXp = score === total ? 15 : Math.floor((score / total) * 15);
      return {
        ...prev,
        totalXp: prev.totalXp + quizXp,
        level: Math.floor((prev.totalXp + quizXp) / 50) + 1,
        lessons: {
          ...prev.lessons,
          [lessonId]: { ...lesson, quizCompleted: true, quizScore: score, xpEarned: lesson.xpEarned + quizXp },
        },
      };
    });
  }, []);

  const submitRating = useCallback((lessonId: string, rating: number, feedback: string) => {
    setProgress((prev) => {
      const lesson = prev.lessons[lessonId] || {
        videoWatched: false, quizCompleted: false, quizScore: 0, rating: 0, feedback: "", xpEarned: 0,
      };
      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: { ...lesson, rating, feedback },
        },
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({ ...defaultProgress });
  }, []);

  return { progress, completeVideo, completeQuiz, submitRating, resetProgress };
}
