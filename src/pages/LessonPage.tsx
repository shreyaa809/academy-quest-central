import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import { modules } from "@/lib/academy-data";
import { useProgress } from "@/lib/progress-store";
import { AcademyHeader } from "@/components/academy/AcademyHeader";
import { VideoPlayer } from "@/components/academy/VideoPlayer";
import { Quiz } from "@/components/academy/Quiz";
import { FeedbackForm } from "@/components/academy/FeedbackForm";
import { XpBadge } from "@/components/academy/XpBadge";
import { CelebrationOverlay } from "@/components/academy/CelebrationOverlay";
import { useState } from "react";

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { progress, completeVideo, completeQuiz, submitRating } = useProgress();
  const [celebration, setCelebration] = useState<{ show: boolean; xp: number; message: string }>({
    show: false, xp: 0, message: "",
  });

  const allLessons = modules.flatMap((m) => m.lessons);
  const lesson = allLessons.find((l) => l.id === lessonId);
  const module = modules.find((m) => m.lessons.some((l) => l.id === lessonId));

  if (!lesson || !module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Lesson not found.</p>
      </div>
    );
  }

  const isLocked = progress.totalXp < lesson.xpRequired;
  const lp = progress.lessons[lesson.id];
  const videoWatched = lp?.videoWatched || false;
  const quizCompleted = lp?.quizCompleted || false;
  const isFullyComplete = videoWatched && quizCompleted;

  if (isLocked) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Lock className="w-16 h-16 text-locked-gray mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Lesson Locked</h2>
        <p className="text-muted-foreground mb-4">
          You need {lesson.xpRequired} XP to unlock this lesson. You have {progress.totalXp} XP.
        </p>
        <button
          onClick={() => navigate("/app/academy")}
          className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold"
        >
          Back to Academy
        </button>
      </div>
    );
  }

  const handleVideoComplete = () => {
    completeVideo(lesson.id);
    setCelebration({ show: true, xp: 10, message: "You watched the video!" });
  };

  const handleQuizComplete = (score: number, total: number) => {
    const xp = score === total ? 15 : Math.floor((score / total) * 15);
    completeQuiz(lesson.id, score, total);
    setCelebration({
      show: true, xp,
      message: score === total ? "Perfect score on the quiz!" : `You answered ${score}/${total} correctly!`,
    });
  };

  return (
    <div className="-m-4">
      <AcademyHeader totalXp={progress.totalXp} level={progress.level} />
      <CelebrationOverlay
        show={celebration.show}
        xpEarned={celebration.xp}
        message={celebration.message}
        onClose={() => setCelebration((c) => ({ ...c, show: false }))}
      />

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <button
            onClick={() => navigate("/app/academy")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Map</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-4xl">{lesson.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">{module.emoji} {module.title}</p>
              <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
            </div>
            {lp && <XpBadge xp={lp.xpEarned} size="sm" />}
          </div>
          <p className="text-muted-foreground mt-2">{lesson.description}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <VideoPlayer videoId={lesson.videoId} isWatched={videoWatched} onComplete={handleVideoComplete} />
        </motion.div>

        {videoWatched && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-xl font-bold text-foreground mb-3">📝 Quiz Time!</h2>
            <Quiz
              questions={lesson.quiz}
              isCompleted={quizCompleted}
              prevScore={lp?.quizScore || 0}
              onComplete={handleQuizComplete}
            />
          </motion.div>
        )}

        {isFullyComplete && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <FeedbackForm
              currentRating={lp?.rating || 0}
              currentFeedback={lp?.feedback || ""}
              onSubmit={(rating, feedback) => submitRating(lesson.id, rating, feedback)}
            />
          </motion.div>
        )}

        {isFullyComplete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center pb-8">
            <button
              onClick={() => navigate("/app/academy")}
              className="px-8 py-3 rounded-xl bg-secondary text-secondary-foreground font-bold hover:opacity-90 transition-opacity"
            >
              🗺️ Back to Level Map
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
