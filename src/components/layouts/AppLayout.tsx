import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useState } from "react";
import { ModalRegistry } from "../modals/ModalRegistry";
import { useModalStore } from "../../stores/useModalStore";

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedOrganizationName, setSelectedOrganizationName] = useState<string | null>("Create An Organization");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const onOrganizationChange = () => {
    // TODO: Open organization modal
    useModalStore.getState().openModal("create_organization");
  };

  return (

    //no full window scrolling
    <div className="relative flex flex-col h-screen w-full overflow-hidden font-public-sans">
      <Topbar
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        onOrganizationChange={onOrganizationChange}
        selectedOrganizationName={selectedOrganizationName}
      />
      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isSidebarOpen} />

        {/* Only outlet contents are allowed to scroll */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        <ModalRegistry />
      </div>
    </div>
  );
};
