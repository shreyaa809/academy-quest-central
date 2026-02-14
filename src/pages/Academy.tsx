import { useModulesWithLessons, useUserProgress, useUserStats } from "@/hooks/use-supabase";
import { LevelMap } from "@/components/academy/LevelMap";
import { Loader2 } from "lucide-react";

export default function Academy() {
  const { data: modules, isLoading: modulesLoading } = useModulesWithLessons();
  const { data: progressData, isLoading: progressLoading } = useUserProgress();
  const { data: stats, isLoading: statsLoading } = useUserStats();

  const isLoading = modulesLoading || progressLoading || statsLoading;

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading academy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <LevelMap 
        modules={modules || []} 
        progressData={progressData || []} 
        stats={stats || { total_xp: 0, level: 1, streak: 0, user_id: '', id: '', last_activity_date: null, created_at: '', updated_at: '' }} 
      />
    </div>
  );
}
