import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkles } from "lucide-react";
import { XpBadge } from "./XpBadge";

interface CelebrationOverlayProps {
  show: boolean;
  xpEarned: number;
  message: string;
  onClose: () => void;
}

const confettiColors = ["bg-primary", "bg-secondary", "bg-accent", "bg-xp-gold", "bg-celebration"];

export function CelebrationOverlay({ show, xpEarned, message, onClose }: CelebrationOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 rounded-full ${confettiColors[i % confettiColors.length]}`}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{
                x: (Math.random() - 0.5) * 600,
                y: (Math.random() - 0.5) * 600,
                opacity: 0,
                scale: Math.random() * 1.5 + 0.5,
                rotate: Math.random() * 720,
              }}
              transition={{ duration: 1.5 + Math.random(), delay: Math.random() * 0.3, ease: "easeOut" }}
              style={{ left: "50%", top: "50%" }}
            />
          ))}

          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-card rounded-2xl p-8 shadow-card-hover text-center max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Trophy className="w-16 h-16 text-xp-gold mx-auto mb-4" />
            </motion.div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-xp-gold" />
              <h2 className="text-2xl font-bold text-foreground">Amazing!</h2>
              <Sparkles className="w-5 h-5 text-xp-gold" />
            </div>
            <p className="text-muted-foreground mb-4">{message}</p>
            <XpBadge xp={xpEarned} size="lg" animate />
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
