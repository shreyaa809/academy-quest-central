import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import ChatBot from "./ChatBot";

const AppLayout = () => {
  return (
    <div className="relative min-h-screen pb-16">
      <div className="p-4">
        <Outlet />
      </div>
      <BottomNav />
      <ChatBot />
    </div>
  );
};

export default AppLayout;
