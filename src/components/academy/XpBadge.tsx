import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface XpBadgeProps {
  xp: number;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const sizeClasses = {
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-sm px-3 py-1 gap-1.5",
  lg: "text-lg px-4 py-2 gap-2",
};

const iconSizes = { sm: 12, md: 14, lg: 20 };

export function XpBadge({ xp, size = "md", animate = false }: XpBadgeProps) {
  const Wrapper = animate ? motion.div : "div";
  const animProps = animate ? { animate: { scale: [1, 1.2, 1] }, transition: { duration: 0.4 } } : {};

  return (
    <Wrapper
      className={`inline-flex items-center font-bold rounded-full bg-xp-gold text-primary-foreground ${sizeClasses[size]}`}
      {...(animProps as any)}
    >
      <Zap size={iconSizes[size]} className="fill-current" />
      {xp} XP
    </Wrapper>
  );
}
