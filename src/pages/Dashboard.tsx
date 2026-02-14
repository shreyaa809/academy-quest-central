import { XPBadge, StreakBadge } from "@/components/XPBadge";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, BookOpen, Bell } from "lucide-react";
import { useProgress } from "@/lib/progress-store";
import { modules } from "@/lib/academy-data";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { progress } = useProgress();

  const allLessons = modules.flatMap((m) => m.lessons);
  const completedCount = allLessons.filter(
    (l) => progress.lessons[l.id]?.videoWatched && progress.lessons[l.id]?.quizCompleted
  ).length;

  return (
    <div className="max-w-lg mx-auto px-4 pt-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground font-medium">Welcome back</p>
          <h1 className="text-2xl font-extrabold text-foreground">Learner <span className="inline-block">👋</span></h1>
        </div>
        <div className="flex gap-2">
          <StreakBadge streak={progress.streak} />
          <XPBadge xp={progress.totalXp} />
        </div>
      </motion.div>

      {/* Daily Goal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-gradient-warm p-5 mb-6 shadow-warm"
      >
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-6 h-6 text-primary-foreground" />
          <h2 className="text-lg font-bold text-primary-foreground">Daily Goal</h2>
        </div>
        <p className="text-primary-foreground/80 text-sm mb-3">Complete 1 lesson today to maintain your streak!</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-3 rounded-full bg-primary-foreground/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary-foreground"
              initial={{ width: 0 }}
              animate={{ width: completedCount > 0 ? "100%" : "0%" }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <span className="text-xs font-bold text-primary-foreground">{completedCount > 0 ? "1/1" : "0/1"}</span>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: TrendingUp, label: "Level", value: progress.level, color: "text-primary" },
          { icon: BookOpen, label: "Completed", value: `${completedCount}/${allLessons.length}`, color: "text-accent" },
          { icon: Bell, label: "Streak", value: `${progress.streak}d`, color: "text-streak" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="rounded-2xl border border-border bg-card p-4 text-center"
          >
            <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Continue Learning */}
      <h2 className="text-lg font-bold text-foreground mb-3">Continue Learning</h2>
      <div className="space-y-3 mb-6">
        {modules.map((mod, i) => {
          const modCompleted = mod.lessons.filter(
            (l) => progress.lessons[l.id]?.videoWatched && progress.lessons[l.id]?.quizCompleted
          ).length;
          const modProgress = mod.lessons.length > 0 ? (modCompleted / mod.lessons.length) * 100 : 0;

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Link
                to="/app/academy"
                className="block rounded-2xl p-4 border-2 border-border bg-card hover:shadow-warm transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-primary/10">
                    {mod.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground truncate">{mod.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{mod.lessons.length} lessons</span>
                    </div>
                  </div>
                </div>
                {modProgress > 0 && (
                  <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${modProgress}%` }} />
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
