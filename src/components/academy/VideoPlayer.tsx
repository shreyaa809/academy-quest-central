import { useState } from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle } from "lucide-react";
import { XpBadge } from "./XpBadge";

interface VideoPlayerProps {
  videoId: string;
  isWatched: boolean;
  onComplete: () => void;
}

export function VideoPlayer({ videoId, isWatched, onComplete }: VideoPlayerProps) {
  const [started, setStarted] = useState(false);

  return (
    <div className="space-y-3">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-foreground/5 shadow-card">
        {started ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Lesson video"
          />
        ) : (
          <button
            onClick={() => setStarted(true)}
            className="absolute inset-0 w-full h-full flex items-center justify-center group"
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/20 transition-colors" />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-level"
            >
              <Play className="w-7 h-7 text-primary-foreground fill-primary-foreground ml-1" />
            </motion.div>
          </button>
        )}
      </div>

      {!isWatched ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <CheckCircle className="w-5 h-5" />
          Mark Video as Watched (+10 XP)
        </motion.button>
      ) : (
        <div className="flex items-center justify-center gap-2 py-3 text-success-green font-bold">
          <CheckCircle className="w-5 h-5" />
          Video Completed
          <XpBadge xp={10} size="sm" />
        </div>
      )}
    </div>
  );
}
