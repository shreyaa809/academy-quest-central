import { motion } from "framer-motion";
import { Lock, Check, Play } from "lucide-react";
import { StarRating } from "./StarRating";

interface LevelNodeProps {
  title: string;
  emoji: string;
  isLocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  stars: number;
  index: number;
  onClick: () => void;
}

export function LevelNode({ title, emoji, isLocked, isCompleted, isCurrent, stars, index, onClick }: LevelNodeProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1, type: "spring", damping: 12 }}
      className="flex flex-col items-center gap-2 min-w-[120px]"
    >
      <motion.button
        whileHover={isLocked ? {} : { scale: 1.08 }}
        whileTap={isLocked ? {} : { scale: 0.95 }}
        onClick={() => !isLocked && onClick()}
        className={`relative w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all
          ${isLocked
            ? "bg-locked-bg border-4 border-locked-gray cursor-not-allowed opacity-60"
            : isCompleted
              ? "bg-success-green-light border-4 border-success-green shadow-level cursor-pointer"
              : isCurrent
                ? "bg-card border-4 border-primary shadow-level animate-pulse-glow cursor-pointer"
                : "bg-card border-4 border-border shadow-card cursor-pointer hover:shadow-card-hover"
          }
        `}
      >
        {isLocked ? (
          <Lock className="w-7 h-7 text-locked-gray" />
        ) : isCompleted ? (
          <div className="relative">
            <span>{emoji}</span>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success-green rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-secondary-foreground" />
            </div>
          </div>
        ) : isCurrent ? (
          <div className="relative">
            <span>{emoji}</span>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <Play className="w-3 h-3 text-primary-foreground fill-primary-foreground" />
            </div>
          </div>
        ) : (
          <span>{emoji}</span>
        )}
      </motion.button>

      <span className={`text-xs font-bold text-center max-w-[100px] leading-tight ${isLocked ? "text-locked-gray" : "text-foreground"}`}>
        {title}
      </span>

      {isCompleted && <StarRating rating={stars} size={14} readonly />}
    </motion.div>
  );
}
