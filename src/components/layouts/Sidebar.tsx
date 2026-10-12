import { Link, useLocation } from "react-router-dom";

import { MdOutlineSpaceDashboard } from "react-icons/md";
import { VscIssues } from "react-icons/vsc";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaAngleRightSolid } from "react-icons/lia";
import { CiSquareMore } from "react-icons/ci";

import { DUMMY_PROJECTS } from "../../seed/project";

interface SidebarProps {
  isOpen: boolean;
}

const ITEMS = [
  { id: "work", name: "Activity", url: "/activity", icon: FaRegUserCircle },
  { id: "dashboard", name: "Dashboard", url: "/dashboard", icon: MdOutlineSpaceDashboard },
  { id: "issues", name: "Issues", url: "/issues", icon: VscIssues },
];
export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  return (
    <div className={`bg-app-sidebar overflow-hidden h-screen font-poppins text-sm text-text-muted shadow-lg ${isOpen ? "w-64 p-4" : "w-0 p-0"}`}>
      <div className="flex flex-col gap-1">
        {/* sidebar items for navigation */}
        <p className="p-1 text-[12px] text-text-ghost font-bold">My works</p>
        {ITEMS.map((item) => {
          const isActive = location.pathname === item.url;
          const Icon = item.icon;
          return (
            <Link to={item.url} id={item.id} className={`p-1 flex items-center gap-1 rounded-lg ${isActive ? "bg-app-item-active hover:bg-app-item-active-hover": "hover:bg-app-item-hover"}`}>
              <span>
                <Icon className="size-5" />
              </span>
                <p>{item.name}</p>
            </Link>
          );
        })}

        <div className="h-0.5 bg-gray-800"></div>

        <p className="p-1 text-[12px] text-text-ghost font-bold">Projects</p>
        {DUMMY_PROJECTS.map((item) => {
          return (
            <div key={item.id} className="p-1 flex items-center gap-1 hover:bg-app-item-hover rounded-lg">
              <span className="rounded-full size-6 text-center bg-blue-700 text-black">{item.icon}</span>
              <p>{item.name}</p>
            </div>
          );
        })}
        <div className="p-1 flex items-center justify-between hover:bg-app-item-hover rounded-lg">
            <div className="flex gap-1">
                <CiSquareMore className="size-5"/>
            <p className="text-sm">View all</p>
            </div>
            <LiaAngleRightSolid className="size-4"/>
        </div>
      </div>
    </div>
  );
};
