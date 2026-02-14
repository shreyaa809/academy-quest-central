import { supabase } from './supabase';
import type { Database } from './database.types';

type Module = Database['public']['Tables']['modules']['Row'];
type Lesson = Database['public']['Tables']['lessons']['Row'];
type QuizQuestion = Database['public']['Tables']['quiz_questions']['Row'];
type UserProgress = Database['public']['Tables']['user_progress']['Row'];
type UserStats = Database['public']['Tables']['user_stats']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

// =============================================
// MODULES
// =============================================

export async function getModules() {
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .order('order_index');

  if (error) throw error;
  return data;
}

export async function getModuleById(id: string) {
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createModule(module: Omit<Module, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('modules')
    .insert(module)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateModule(id: string, updates: Partial<Module>) {
  const { data, error } = await supabase
    .from('modules')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteModule(id: string) {
  const { error } = await supabase
    .from('modules')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// =============================================
// LESSONS
// =============================================

export async function getLessons() {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .order('order_index');

  if (error) throw error;
  return data;
}

export async function getLessonsByModuleId(moduleId: string) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('module_id', moduleId)
    .order('order_index');

  if (error) throw error;
  return data;
}

export async function getLessonById(id: string) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createLesson(lesson: Omit<Lesson, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('lessons')
    .insert(lesson)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateLesson(id: string, updates: Partial<Lesson>) {
  const { data, error } = await supabase
    .from('lessons')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLesson(id: string) {
  const { error } = await supabase
    .from('lessons')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// =============================================
// QUIZ QUESTIONS
// =============================================

export async function getQuizQuestionsByLessonId(lessonId: string) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('order_index');

  if (error) throw error;
  return data;
}

export async function createQuizQuestion(question: Omit<QuizQuestion, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .insert(question)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateQuizQuestion(id: string, updates: Partial<QuizQuestion>) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteQuizQuestion(id: string) {
  const { error } = await supabase
    .from('quiz_questions')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// =============================================
// USER PROGRESS
// =============================================

export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

export async function getLessonProgress(userId: string, lessonId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
  return data;
}

export async function upsertProgress(progress: Omit<UserProgress, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert(progress, { onConflict: 'user_id,lesson_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function completeVideo(userId: string, lessonId: string) {
  const existing = await getLessonProgress(userId, lessonId);
  const VIDEO_XP = 10;

  const progress = {
    user_id: userId,
    lesson_id: lessonId,
    video_watched: true,
    quiz_completed: existing?.quiz_completed || false,
    quiz_score: existing?.quiz_score || 0,
    xp_earned: (existing?.xp_earned || 0) + (existing?.video_watched ? 0 : VIDEO_XP),
    rating: existing?.rating,
    feedback: existing?.feedback,
  };

  const updated = await upsertProgress(progress);

  // Update user stats
  if (!existing?.video_watched) {
    await addXp(userId, VIDEO_XP);
  }

  return updated;
}

export async function completeQuiz(userId: string, lessonId: string, score: number, total: number) {
  const existing = await getLessonProgress(userId, lessonId);
  const QUIZ_XP = 15;
  const quizXp = score === total ? QUIZ_XP : Math.floor((score / total) * QUIZ_XP);

  const progress = {
    user_id: userId,
    lesson_id: lessonId,
    video_watched: existing?.video_watched || false,
    quiz_completed: true,
    quiz_score: score,
    xp_earned: (existing?.xp_earned || 0) + (existing?.quiz_completed ? 0 : quizXp),
    rating: existing?.rating,
    feedback: existing?.feedback,
  };

  const updated = await upsertProgress(progress);

  // Update user stats
  if (!existing?.quiz_completed) {
    await addXp(userId, quizXp);
  }

  return updated;
}

export async function submitRating(userId: string, lessonId: string, rating: number, feedback: string) {
  const existing = await getLessonProgress(userId, lessonId);

  const progress = {
    user_id: userId,
    lesson_id: lessonId,
    video_watched: existing?.video_watched || false,
    quiz_completed: existing?.quiz_completed || false,
    quiz_score: existing?.quiz_score || 0,
    xp_earned: existing?.xp_earned || 0,
    rating,
    feedback,
  };

  return await upsertProgress(progress);
}

// =============================================
// USER STATS
// =============================================

export async function getUserStats(userId: string) {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function initializeUserStats(userId: string) {
  const { data, error } = await supabase
    .from('user_stats')
    .insert({
      user_id: userId,
      total_xp: 0,
      level: 1,
      streak: 0,
      last_activity_date: new Date().toISOString().split('T')[0],
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addXp(userId: string, xp: number) {
  let stats = await getUserStats(userId);

  if (!stats) {
    stats = await initializeUserStats(userId);
  }

  const newTotalXp = stats.total_xp + xp;
  const newLevel = Math.floor(newTotalXp / 50) + 1;

  // Check streak
  const today = new Date().toISOString().split('T')[0];
  const lastActivity = stats.last_activity_date;
  let newStreak = stats.streak;

  if (lastActivity) {
    const lastDate = new Date(lastActivity);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      newStreak += 1; // Continue streak
    } else if (diffDays > 1) {
      newStreak = 1; // Reset streak
    }
    // If diffDays === 0, same day, don't change streak
  }

  const { data, error } = await supabase
    .from('user_stats')
    .update({
      total_xp: newTotalXp,
      level: newLevel,
      streak: newStreak,
      last_activity_date: today,
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;

  // Update leaderboard
  await updateLeaderboardEntry(userId);

  return data;
}

// =============================================
// LEADERBOARD
// =============================================

export async function getLeaderboard(limit = 100) {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('rank')
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function updateLeaderboardEntry(userId: string) {
  const stats = await getUserStats(userId);
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', userId)
    .single();

  if (!stats || !profile) return;

  const username = profile.full_name || profile.email;

  // Get current rank
  const { data: allStats } = await supabase
    .from('user_stats')
    .select('user_id, total_xp')
    .order('total_xp', { ascending: false });

  const rank = (allStats?.findIndex((s) => s.user_id === userId) ?? -1) + 1;

  const { error } = await supabase
    .from('leaderboard')
    .upsert({
      user_id: userId,
      username,
      total_xp: stats.total_xp,
      level: stats.level,
      rank,
    }, { onConflict: 'user_id' });

  if (error) throw error;
}

// =============================================
// COMBINED DATA QUERIES
// =============================================

export async function getModulesWithLessons() {
  const modules = await getModules();
  const lessons = await getLessons();

  return modules.map((module) => ({
    ...module,
    lessons: lessons.filter((lesson) => lesson.module_id === module.id),
  }));
}

export async function getLessonWithQuiz(lessonId: string) {
  const lesson = await getLessonById(lessonId);
  const quiz = await getQuizQuestionsByLessonId(lessonId);

  return {
    ...lesson,
    quiz,
  };
}

export async function getUserDashboardData(userId: string) {
  const [modules, progress, stats] = await Promise.all([
    getModulesWithLessons(),
    getUserProgress(userId),
    getUserStats(userId) || initializeUserStats(userId),
  ]);

  return {
    modules,
    progress,
    stats,
  };
}
