import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { CreateTaskButton } from "../../features/dashboard/components/CreateTaskButton";
import { SearchBar } from "../ui/SearchBar";
import { useParams } from "react-router-dom";
import { ProfileDropdown } from "./ProfilleDropdown";

interface TopbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Topbar = ({ onToggleSidebar, isSidebarOpen }: TopbarProps) => {
  const {orgSlug} = useParams<{orgSlug: string}>();
  return (
    <div className="px-1 py-2 w-full bg-app-topbar grid grid-cols-3 items-center border-y border-app-border">
      {/*Sidebar toggle & Logo */}
      <div className="flex items-center gap-4 text-text-muted">
        <button
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close Sidebar" : "Open sidebar"}
          className="hover:opacity-80 transition-opacity cursor-pointer">
          {isSidebarOpen ? (
            <GoSidebarExpand className="size-6" />
          ) : (
            <GoSidebarCollapse className="size-6" />
          )}
        </button>
        {/* Logo */}
        <div className="flex flex-col justify-center cursor-pointer">
          <p className="text-xl font-semibold text-app-brand m-0 leading-none">
            Taskpad
          </p>
          <p className="text-text-ghost text-xs m-0 mt-1 leading-none">
            Manage your all task smartly
          </p>
        </div>
      </div>

      {/* Search & Create Button */}
      <div className="flex items-center gap-2 w-full h-full">
        <SearchBar
          className="text-sm bg-app-input-bg"
          placeholder="Type here...."/>
        <CreateTaskButton slug={orgSlug || ""}/>
      </div>

      {/*User related */}
      <div className="flex items-center gap-4 text-text-muted justify-self-end">
        {/* notifications */}
        <button className="hover:opacity-80 transition-opacity cursor-pointer">
          <IoIosNotificationsOutline className="size-6" />
        </button>
        {/* settings */}
        <button className="hover:opacity-80 transition-opacity cursor-pointer">
          <IoSettingsOutline className="size-5" />
        </button>
        {/* profile*/}
          <ProfileDropdown />
      </div>
    </div>
  );
};
