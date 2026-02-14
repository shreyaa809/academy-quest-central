import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

const AppLayout = () => {
  return (
    <div className="relative min-h-screen pb-16">
      <div className="p-4">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
