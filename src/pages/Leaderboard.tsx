import { motion } from "framer-motion";
import { Trophy, Flame, Zap, Crown, Medal } from "lucide-react";
import { useProgress } from "@/lib/progress-store";

const mockLeaders = [
  { id: "1", name: "Arjun S.", xp: 450, streak: 12 },
  { id: "2", name: "Priya M.", xp: 380, streak: 8 },
  { id: "3", name: "Rahul K.", xp: 320, streak: 15 },
  { id: "4", name: "Sneha P.", xp: 290, streak: 5 },
  { id: "5", name: "Vikram R.", xp: 260, streak: 7 },
  { id: "6", name: "Anita D.", xp: 230, streak: 4 },
  { id: "7", name: "Kiran B.", xp: 200, streak: 6 },
  { id: "8", name: "Meera T.", xp: 180, streak: 3 },
];

export default function Leaderboard() {
  const { progress } = useProgress();

  const leaders = [
    ...mockLeaders,
    { id: "you", name: "You", xp: progress.totalXp, streak: progress.streak },
  ].sort((a, b) => b.xp - a.xp);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-xp fill-current" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-streak" />;
    return <span className="w-6 text-center font-bold text-muted-foreground">{rank}</span>;
  };

  return (
    <div className="max-w-lg mx-auto px-4 pt-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-6 h-6 text-xp" />
          <h1 className="text-2xl font-extrabold text-foreground">Leaderboard</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Compete with fellow learners</p>

        <div className="space-y-2">
          {leaders.map((leader, i) => {
            const isYou = leader.id === "you";
            return (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-shadow ${
                  isYou ? "border-primary bg-primary/5 shadow-warm" : "border-border bg-card"
                }`}
              >
                <div className="w-8 flex justify-center">{getRankIcon(i + 1)}</div>
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-lg font-bold text-primary">
                  {leader.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold truncate ${isYou ? "text-primary" : "text-foreground"}`}>
                    {leader.name} {isYou && "⭐"}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Zap className="w-3 h-3 text-xp" /> {leader.xp} XP
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Flame className="w-3 h-3 text-streak" /> {leader.streak}d
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
