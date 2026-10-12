import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useState } from "react";

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (

    //no full window scrolling
    <div className="realative flex flex-col h-screen w-full overflow-hidden">
      <Topbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex h-full">
        <Sidebar isOpen={isSidebarOpen} />

        {/* Only outlet contents are allowed to scroll */}
        <main className="flex-1 items-center justify-center overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
