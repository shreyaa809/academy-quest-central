import { motion } from "framer-motion";
import { modules } from "@/lib/academy-data";
import { useProgress } from "@/lib/progress-store";
import { XpBadge } from "@/components/academy/XpBadge";
import { ProgressBar } from "@/components/academy/ProgressBar";
import { StarRating } from "@/components/academy/StarRating";
import { Trophy, BookOpen, Target, RotateCcw, LogOut, Settings, ChevronRight } from "lucide-react";
import { XPBadge, StreakBadge, LevelBadge } from "@/components/XPBadge";

export default function Profile() {
  const { progress, resetProgress } = useProgress();
  const allLessons = modules.flatMap((m) => m.lessons);
  const completedLessons = allLessons.filter(
    (l) => progress.lessons[l.id]?.videoWatched && progress.lessons[l.id]?.quizCompleted
  );
  const totalPossibleXp = allLessons.length * 25;
  const perfectQuizzes = allLessons.filter(
    (l) => progress.lessons[l.id]?.quizScore === l.quiz.length
  );

  const badges = [
    { emoji: "🌱", label: "Beginner", unlocked: progress.totalXp >= 0 },
    { emoji: "📖", label: "Learner", unlocked: progress.totalXp >= 50 },
    { emoji: "⭐", label: "Star Student", unlocked: progress.totalXp >= 100 },
    { emoji: "🏆", label: "Champion", unlocked: progress.totalXp >= 150 },
    { emoji: "👑", label: "Master", unlocked: completedLessons.length === allLessons.length },
  ];

  const menuItems = [
    { icon: BookOpen, label: `Lessons Completed: ${completedLessons.length}` },
    { icon: Trophy, label: "Achievements" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 space-y-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl text-primary-foreground font-bold mx-auto mb-3 shadow-warm">
          🎓
        </div>
        <h1 className="text-2xl font-extrabold text-foreground">Learner</h1>
        <p className="text-muted-foreground text-sm mb-3">Level {progress.level} • Financial Explorer</p>
        <div className="flex justify-center gap-2 mb-4">
          <StreakBadge streak={progress.streak} />
          <XPBadge xp={progress.totalXp} />
          <LevelBadge level={progress.level} />
        </div>
        <div className="max-w-xs mx-auto">
          <ProgressBar current={progress.totalXp} max={totalPossibleXp} label="Total XP" />
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: BookOpen, label: "Completed", value: `${completedLessons.length}/${allLessons.length}` },
          { icon: Target, label: "Perfect Quizzes", value: String(perfectQuizzes.length) },
          { icon: Trophy, label: "Level", value: String(progress.level) },
        ].map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-4 shadow-card text-center"
          >
            <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground font-semibold">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-6 shadow-card"
      >
        <h2 className="text-lg font-bold text-foreground mb-4">🏅 Badges</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {badges.map((b) => (
            <div key={b.label} className={`flex flex-col items-center gap-1 ${b.unlocked ? "" : "opacity-30 grayscale"}`}>
              <span className="text-3xl">{b.emoji}</span>
              <span className="text-xs font-bold text-foreground">{b.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Module Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-6 shadow-card space-y-4"
      >
        <h2 className="text-lg font-bold text-foreground">📊 Module Progress</h2>
        {modules.map((mod) => {
          const completed = mod.lessons.filter(
            (l) => progress.lessons[l.id]?.videoWatched && progress.lessons[l.id]?.quizCompleted
          ).length;
          return (
            <div key={mod.id}>
              <p className="text-sm font-semibold text-foreground mb-1">{mod.emoji} {mod.title}</p>
              <ProgressBar current={completed} max={mod.lessons.length} color={mod.color as any} />
            </div>
          );
        })}
      </motion.div>

      {/* Menu */}
      <div className="space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:shadow-card transition-shadow cursor-pointer"
          >
            <item.icon className="w-5 h-5 text-muted-foreground" />
            <span className="flex-1 font-semibold text-foreground text-sm">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        ))}
      </div>

      {/* Reset */}
      <div className="text-center pb-8">
        <button
          onClick={() => {
            if (confirm("Reset all progress? This cannot be undone.")) resetProgress();
          }}
          className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Progress
        </button>
      </div>
    </div>
  );
}
