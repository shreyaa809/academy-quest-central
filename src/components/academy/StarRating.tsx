import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface StarRatingProps {
  rating: number;
  onRate?: (value: number) => void;
  size?: number;
  readonly?: boolean;
}

export function StarRating({ rating, onRate, size = 24, readonly = false }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={readonly ? {} : { scale: 1.2 }}
          whileTap={readonly ? {} : { scale: 0.9 }}
          onClick={() => !readonly && onRate?.(star)}
          className={`transition-colors ${readonly ? "cursor-default" : "cursor-pointer"}`}
          disabled={readonly}
        >
          <Star
            size={size}
            className={star <= rating ? "fill-star-fill text-star-fill" : "fill-none text-star-empty"}
          />
        </motion.button>
      ))}
    </div>
  );
}
