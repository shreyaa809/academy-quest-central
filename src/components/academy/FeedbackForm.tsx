import { useState } from "react";
import { motion } from "framer-motion";
import { StarRating } from "./StarRating";
import { MessageSquare } from "lucide-react";

interface FeedbackFormProps {
  currentRating: number;
  currentFeedback: string;
  onSubmit: (rating: number, feedback: string) => void;
}

export function FeedbackForm({ currentRating, currentFeedback, onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState(currentRating);
  const [feedback, setFeedback] = useState(currentFeedback);
  const [submitted, setSubmitted] = useState(currentRating > 0);

  if (submitted) {
    return (
      <div className="bg-card rounded-2xl p-6 shadow-card text-center">
        <p className="text-lg font-bold text-foreground mb-2">Thanks for your feedback! 🙏</p>
        <StarRating rating={rating} readonly size={20} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 shadow-card space-y-4"
    >
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Rate this lesson</h3>
      </div>

      <div className="flex justify-center">
        <StarRating rating={rating} onRate={setRating} size={32} />
      </div>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Share your thoughts about this lesson (optional)"
        className="w-full p-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground resize-none h-24 focus:border-primary focus:outline-none transition-colors"
      />

      <button
        onClick={() => {
          if (rating > 0) {
            onSubmit(rating, feedback);
            setSubmitted(true);
          }
        }}
        disabled={rating === 0}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        Submit Feedback
      </button>
    </motion.div>
  );
}
