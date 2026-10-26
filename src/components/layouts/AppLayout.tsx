import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useState } from "react";
import { ModalRegistry } from "../modals/ModalRegistry";

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (

    //no full window scrolling
    <div className="relative flex flex-col h-screen w-full overflow-hidden font-public-sans">
      <div className="relative z-50">
        <Topbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isSidebarOpen} />

        {/* Only outlet contents are allowed to scroll */}
        <main className="flex-1 overflow-y-auto z-10 bg-app-canvas">
          <Outlet />
        </main>
          <ModalRegistry />
      </div>
    </div>
  );
};
