import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { type QuizQuestion } from "@/lib/academy-data";
import { XpBadge } from "./XpBadge";

interface QuizProps {
  questions: QuizQuestion[];
  isCompleted: boolean;
  prevScore: number;
  onComplete: (score: number, total: number) => void;
}

export function Quiz({ questions, isCompleted, prevScore, onComplete }: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(isCompleted);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));

  if (finished) {
    const displayScore = isCompleted ? prevScore : score;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-6 shadow-card text-center"
      >
        <div className="text-4xl mb-3">
          {displayScore === questions.length ? "🎉" : displayScore >= questions.length / 2 ? "👏" : "💪"}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-1">Quiz Complete!</h3>
        <p className="text-muted-foreground mb-3">
          You got {displayScore} out of {questions.length} correct
        </p>
        <XpBadge
          xp={displayScore === questions.length ? 15 : Math.floor((displayScore / questions.length) * 15)}
          size="lg"
          animate
        />
      </motion.div>
    );
  }

  const q = questions[currentQ];
  const isCorrect = selected === q.correctIndex;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
    if (idx === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      const finalScore = score;
      setFinished(true);
      onComplete(finalScore, questions.length);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-center gap-2 mb-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentQ ? "bg-primary scale-125" : i < currentQ ? "bg-success-green" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <div className="flex items-start gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-quiz-blue flex-shrink-0 mt-0.5" />
        <h3 className="text-lg font-bold text-foreground">{q.question}</h3>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {q.options.map((opt, idx) => {
            let optStyle = "bg-muted/50 border-border hover:bg-muted";
            if (showResult) {
              if (idx === q.correctIndex) optStyle = "bg-success-green-light border-success-green";
              else if (idx === selected && !isCorrect) optStyle = "bg-destructive/10 border-destructive";
              else optStyle = "bg-muted/30 border-border opacity-50";
            }

            return (
              <motion.button
                key={idx}
                whileHover={showResult ? {} : { scale: 1.01 }}
                whileTap={showResult ? {} : { scale: 0.99 }}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all flex items-center gap-3 ${optStyle}`}
              >
                <span className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-sm font-bold border border-border">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-foreground">{opt}</span>
                {showResult && idx === q.correctIndex && <CheckCircle className="w-5 h-5 text-success-green ml-auto" />}
                {showResult && idx === selected && !isCorrect && <XCircle className="w-5 h-5 text-destructive ml-auto" />}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {showResult && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <p className={`text-sm font-bold mb-3 ${isCorrect ? "text-success-green" : "text-destructive"}`}>
            {isCorrect ? "🎉 Correct!" : "❌ Not quite, but keep learning!"}
          </p>
          <button
            onClick={handleNext}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
          >
            {currentQ + 1 >= questions.length ? "Finish Quiz" : "Next Question"}
          </button>
        </motion.div>
      )}
    </div>
  );
}
