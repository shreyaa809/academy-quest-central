import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './auth-context';
import * as supabaseService from './supabase-service';

// =============================================
// MODULES HOOKS
// =============================================

export function useModules() {
  return useQuery({
    queryKey: ['modules'],
    queryFn: supabaseService.getModules,
  });
}

export function useModulesWithLessons() {
  return useQuery({
    queryKey: ['modules', 'with-lessons'],
    queryFn: supabaseService.getModulesWithLessons,
  });
}

export function useModule(id: string) {
  return useQuery({
    queryKey: ['modules', id],
    queryFn: () => supabaseService.getModuleById(id),
    enabled: !!id,
  });
}

// =============================================
// LESSONS HOOKS
// =============================================

export function useLessons() {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: supabaseService.getLessons,
  });
}

export function useLessonsByModule(moduleId: string) {
  return useQuery({
    queryKey: ['lessons', 'module', moduleId],
    queryFn: () => supabaseService.getLessonsByModuleId(moduleId),
    enabled: !!moduleId,
  });
}

export function useLesson(id: string) {
  return useQuery({
    queryKey: ['lessons', id],
    queryFn: () => supabaseService.getLessonById(id),
    enabled: !!id,
  });
}

export function useLessonWithQuiz(id: string) {
  return useQuery({
    queryKey: ['lessons', id, 'quiz'],
    queryFn: () => supabaseService.getLessonWithQuiz(id),
    enabled: !!id,
  });
}

// =============================================
// PROGRESS HOOKS
// =============================================

export function useUserProgress() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['progress', user?.id],
    queryFn: () => supabaseService.getUserProgress(user!.id),
    enabled: !!user,
  });
}

export function useLessonProgress(lessonId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['progress', user?.id, lessonId],
    queryFn: () => supabaseService.getLessonProgress(user!.id, lessonId),
    enabled: !!user && !!lessonId,
  });
}

export function useCompleteVideo() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId: string) => supabaseService.completeVideo(user!.id, lessonId),
    onSuccess: (_, lessonId) => {
      queryClient.invalidateQueries({ queryKey: ['progress', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['progress', user?.id, lessonId] });
      queryClient.invalidateQueries({ queryKey: ['stats', user?.id] });
    },
  });
}

export function useCompleteQuiz() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lessonId, score, total }: { lessonId: string; score: number; total: number }) =>
      supabaseService.completeQuiz(user!.id, lessonId, score, total),
    onSuccess: (_, { lessonId }) => {
      queryClient.invalidateQueries({ queryKey: ['progress', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['progress', user?.id, lessonId] });
      queryClient.invalidateQueries({ queryKey: ['stats', user?.id] });
    },
  });
}

export function useSubmitRating() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lessonId,
      rating,
      feedback,
    }: {
      lessonId: string;
      rating: number;
      feedback: string;
    }) => supabaseService.submitRating(user!.id, lessonId, rating, feedback),
    onSuccess: (_, { lessonId }) => {
      queryClient.invalidateQueries({ queryKey: ['progress', user?.id, lessonId] });
    },
  });
}

// =============================================
// STATS HOOKS
// =============================================

export function useUserStats() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['stats', user?.id],
    queryFn: async () => {
      let stats = await supabaseService.getUserStats(user!.id);
      if (!stats) {
        stats = await supabaseService.initializeUserStats(user!.id);
      }
      return stats;
    },
    enabled: !!user,
  });
}

// =============================================
// LEADERBOARD HOOKS
// =============================================

export function useLeaderboard(limit = 100) {
  return useQuery({
    queryKey: ['leaderboard', limit],
    queryFn: () => supabaseService.getLeaderboard(limit),
  });
}

// =============================================
// DASHBOARD HOOKS
// =============================================

export function useDashboardData() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['dashboard', user?.id],
    queryFn: () => supabaseService.getUserDashboardData(user!.id),
    enabled: !!user,
  });
}

// =============================================
// ADMIN HOOKS
// =============================================

export function useCreateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supabaseService.createModule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}

export function useUpdateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      supabaseService.updateModule(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}

export function useDeleteModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supabaseService.deleteModule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}

export function useCreateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supabaseService.createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}

export function useUpdateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      supabaseService.updateLesson(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}

export function useDeleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supabaseService.deleteLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}

export function useCreateQuizQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supabaseService.createQuizQuestion,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['lessons', data.lesson_id, 'quiz'] });
    },
  });
}

export function useUpdateQuizQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      supabaseService.updateQuizQuestion(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
}

export function useDeleteQuizQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supabaseService.deleteQuizQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
}
