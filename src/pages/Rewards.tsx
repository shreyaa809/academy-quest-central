import { useProgress } from "@/lib/progress-store";
import { motion } from "framer-motion";
import { Gift, Zap, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const mockRewards = [
  { id: "1", title: "Amazon ₹100 Voucher", xp_cost: 200, icon: "🛒", category: "Shopping" },
  { id: "2", title: "Flipkart ₹100 Voucher", xp_cost: 200, icon: "🛍️", category: "Shopping" },
  { id: "3", title: "Swiggy ₹50 Voucher", xp_cost: 100, icon: "🍕", category: "Food" },
  { id: "4", title: "Premium Badge", xp_cost: 50, icon: "🏅", category: "Badge" },
  { id: "5", title: "Custom Avatar", xp_cost: 75, icon: "👤", category: "Customization" },
];

export default function Rewards() {
  const { progress } = useProgress();

  const handleRedeem = (reward: typeof mockRewards[0]) => {
    if (progress.totalXp < reward.xp_cost) {
      toast.error("Not enough XP! Keep learning to earn more.");
      return;
    }
    toast.success("🎉 Reward redeemed! (Demo mode)");
  };

  return (
    <div className="max-w-lg mx-auto px-4 pt-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-2 mb-1">
          <Gift className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-extrabold text-foreground">Rewards</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Redeem your XP for real rewards</p>

        <div className="rounded-2xl bg-gradient-warm p-5 mb-6 shadow-warm text-center">
          <p className="text-sm text-primary-foreground/80 font-semibold mb-1">Your Balance</p>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-7 h-7 text-primary-foreground fill-current" />
            <span className="text-4xl font-extrabold text-primary-foreground">{progress.totalXp}</span>
            <span className="text-lg font-bold text-primary-foreground/80">XP</span>
          </div>
        </div>

        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" /> Available Rewards
        </h2>
        <div className="space-y-3">
          {mockRewards.map((reward, i) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border-2 border-border bg-card p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                  {reward.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">{reward.category}</p>
                  <h3 className="font-bold text-foreground">{reward.title}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Zap className="w-3.5 h-3.5 text-xp fill-current" />
                    <span className="text-sm font-bold text-xp">{reward.xp_cost} XP</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleRedeem(reward)}
                  disabled={progress.totalXp < reward.xp_cost}
                  className="rounded-xl bg-primary text-primary-foreground font-bold"
                >
                  Redeem
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
