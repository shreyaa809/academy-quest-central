import { Link, useLocation } from "react-router-dom";
import { XpBadge } from "./XpBadge";
import { User, Map, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface AcademyHeaderProps {
  totalXp: number;
  level: number;
}

export function AcademyHeader({ totalXp, level }: AcademyHeaderProps) {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/app/academy" className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="font-bold text-lg text-foreground hidden sm:inline">Academy</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/app/academy"
            className={`p-2 rounded-xl transition-colors ${
              location.pathname === "/app/academy" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Map className="w-5 h-5" />
          </Link>
          <Link
            to="/app/profile"
            className={`p-2 rounded-xl transition-colors ${
              location.pathname === "/app/profile" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <User className="w-5 h-5" />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm font-bold text-muted-foreground">
            <Zap className="w-4 h-4 text-xp-gold" />
            Lv.{level}
          </div>
          <XpBadge xp={totalXp} size="sm" />
        </div>
      </div>
    </motion.header>
  );
}
