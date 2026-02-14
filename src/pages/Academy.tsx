import { useProgress } from "@/lib/progress-store";
import { LevelMap } from "@/components/academy/LevelMap";

export default function Academy() {
  const { progress } = useProgress();

  return (
    <div className="max-w-3xl mx-auto">
      <LevelMap progress={progress} />
    </div>
  );
}
