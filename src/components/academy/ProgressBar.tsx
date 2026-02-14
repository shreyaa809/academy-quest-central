import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  color?: "primary" | "secondary" | "accent";
}

const colorMap = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
};

export function ProgressBar({ current, max, label, color = "primary" }: ProgressBarProps) {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1.5">
          <span className="text-sm font-semibold text-foreground">{label}</span>
          <span className="text-sm font-bold text-muted-foreground">{current}/{max}</span>
        </div>
      )}
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorMap[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
