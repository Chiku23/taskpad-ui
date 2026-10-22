import { Link, useLocation } from "react-router-dom";

import { MdOutlineSpaceDashboard } from "react-icons/md";
import { VscIssues } from "react-icons/vsc";
import { FaRegUserCircle } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
}

const NAV_ITEMS = [
  {
    id: "1",
    name: "For you",
    url: "/activity",
    icon: FaRegUserCircle,
  },
  {
    id: "2",
    name: "Dashboard",
    url: "/dashboard",
    icon: MdOutlineSpaceDashboard,
  },
  {
    id: "3",
    name: "Issues",
    url: "/issues",
    icon: VscIssues,
    issueCount: 5,
  },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();



  return (
    <div
      {...(!isOpen ? { inert: true } : {})}
      className={`bg-app-sidebar font-semibold border-r border-app-border overflow-hidden h-screen text-sm text-text-muted shadow-lg ${isOpen ? "w-64 md:w-sm p-4" : "w-0 p-0"}`}
    >
      <nav className="flex flex-col gap-1">
        {/* sidebar items for navigation */}
        {NAV_ITEMS.map((item) => {
          const isActive =
            location.pathname === item.url ||
            location.pathname.startsWith(`${item.url}`);
          const Icon = item.icon;

          return (
            <div key={item.id} className="flex flex-col w-full">
              <div
                className={`group flex items-center justify-between rounded-lg p-1 ${
                  isActive
                    ? "bg-app-item-active text-text-main"
                    : "hover:bg-app-item-hover"
                }`}
              >
                <Link
                  to={item.url}
                  className="flex items-center gap-2 flex-1 min-w-0 p-0.5"
                >
                  <span className="size-5 flex items-center justify-center shrink-0">
                    <Icon className="size-5" />
                  </span>
                  <p className="truncate">{item.name}</p>
                </Link>

                <div
                  className="flex items-center gap-1.5 px-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.issueCount !== undefined && (
                    <span className="bg-app-button text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full text-center">
                      {item.issueCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};
