import { useNavigate } from "react-router-dom";
import { LevelNode } from "./LevelNode";
import { XpBadge } from "./XpBadge";
import { ProgressBar } from "./ProgressBar";

interface Module {
  id: string;
  title: string;
  emoji: string;
  color: string;
  order_index: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  module_id: string;
  title: string;
  emoji: string;
  video_id: string;
  description: string;
  xp_required: number;
  order_index: number;
}

interface ProgressData {
  lesson_id: string;
  video_watched: boolean;
  quiz_completed: boolean;
  quiz_score: number;
  rating: number | null;
  xp_earned: number;
}

interface Stats {
  total_xp: number;
  level: number;
  streak: number;
}

interface LevelMapProps {
  modules: Module[];
  progressData: ProgressData[];
  stats: Stats;
}

export function LevelMap({ modules, progressData, stats }: LevelMapProps) {
  const navigate = useNavigate();

  const progressMap = Object.fromEntries(
    progressData.map((p) => [p.lesson_id, p])
  );

  const allLessons = modules.flatMap((m) => m.lessons);
  const completedCount = allLessons.filter(
    (l) => progressMap[l.id]?.video_watched && progressMap[l.id]?.quiz_completed
  ).length;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">🎓 Financial Academy</h1>
        <p className="text-muted-foreground text-lg">Master your money skills, one level at a time!</p>
        <div className="flex items-center justify-center gap-4">
          <XpBadge xp={stats.total_xp} size="lg" />
          <span className="text-muted-foreground font-semibold">Level {stats.level}</span>
        </div>
        <div className="max-w-md mx-auto">
          <ProgressBar current={completedCount} max={allLessons.length} label="Lessons Completed" color="secondary" />
        </div>
      </div>

      {modules.map((mod) => (
        <ModuleSection
          key={mod.id}
          module={mod}
          progressMap={progressMap}
          totalXp={stats.total_xp}
          onLessonClick={(lessonId) => navigate(`/app/lesson/${lessonId}`)}
        />
      ))}
    </div>
  );
}

function ModuleSection({
  module: mod,
  progressMap,
  totalXp,
  onLessonClick,
}: {
  module: Module;
  progressMap: Record<string, ProgressData>;
  totalXp: number;
  onLessonClick: (id: string) => void;
}) {
  const moduleXp = mod.lessons.reduce(
    (sum, l) => sum + (progressMap[l.id]?.xp_earned || 0), 0
  );
  const maxModuleXp = mod.lessons.length * 25;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">{mod.emoji} {mod.title}</h2>
        <XpBadge xp={moduleXp} size="sm" />
      </div>

      <ProgressBar current={moduleXp} max={maxModuleXp} color={mod.color as any} />

      <div className="mt-6 overflow-x-auto scrollbar-hide pb-4">
        <div className="flex items-center gap-4 min-w-max px-2">
          {mod.lessons.map((lesson, i) => {
            const lp = progressMap[lesson.id];
            const isCompleted = !!(lp?.video_watched && lp?.quiz_completed);
            const isLocked = totalXp < lesson.xp_required;
            const isCurrent = !isLocked && !isCompleted;

            return (
              <div key={lesson.id} className="flex items-center">
                <LevelNode
                  title={lesson.title}
                  emoji={lesson.emoji}
                  isLocked={isLocked}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                  stars={lp?.rating || 0}
                  index={i}
                  onClick={() => onLessonClick(lesson.id)}
                />
                {i < mod.lessons.length - 1 && (
                  <div className={`w-8 h-1 rounded-full mx-1 ${isCompleted ? "bg-success-green" : "bg-muted"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
