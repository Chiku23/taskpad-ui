import { Link, useLocation } from "react-router-dom";
import { useModalStore } from "../../stores/useModalStore";

import { MdOutlineSpaceDashboard } from "react-icons/md";
import { VscIssues } from "react-icons/vsc";
import { FaRegUserCircle } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdOutlineFolderOpen } from "react-icons/md";
import {PROJECTS} from "../../seed/project.ts";


interface SidebarProps {
  isOpen: boolean;
}

const NAV_ITEMS = [
  {
    id: "1",
    name: "Organization",
    url: "/organization",
    icon: GoOrganization,
    addIcon: IoMdAdd,
    dropDownIcon: true,
  },
  {
    id: "2",
    name: "For you",
    url: "/activity",
    icon: FaRegUserCircle,
  },
  {
    id: "3",
    name: "Dashboard",
    url: "/dashboard",
    icon: MdOutlineSpaceDashboard,
  },
  {
    id: "4",
    name: "Issues",
    url: "/issues",
    icon: VscIssues,
    issueCount: 5,
  },
];

const ORGANIZATIONS = [
  { id: "1", name: "Zeta Corporation" },
  { id: "2", name: "Stark Pvt. ltd." },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const { openModal } = useModalStore();

  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});
  const [openSubDropdown, setOpenSubDropdown] = useState<Record<string, boolean>>({});

  const toggleDropdown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpenDropdown((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const toggleSubDropdown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpenSubDropdown((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      {...(!isOpen ? { inert: true } : {})}
      className={`bg-app-sidebar font-semibold border-r border-app-border overflow-hidden h-screen text-sm text-text-muted shadow-lg ${isOpen ? "w-64 p-4" : "w-0 p-0"}`}
    >
      <nav className="flex flex-col gap-1">
        {/* sidebar items for navigation */}
        <p className="p-1 text-[12px] text-text-ghost font-bold">My works</p>
        {NAV_ITEMS.map((item) => {
          const isActive =
            location.pathname === item.url ||
            location.pathname.startsWith(`${item.url}`);
          const Icon = item.icon;
          const AddIcon = item.addIcon;
          const isDropdownOpen = !!openDropdown[item.id];

          return (
            <div key={item.id} className="flex flex-col w-full">
              
              <div
                className={`group flex items-center justify-between rounded-lg p-1 ${
                  isActive ? "bg-app-item-active text-text-main" : "hover:bg-app-item-hover"
                }`}
              >
               {item.dropDownIcon ? (
                  <div
                    onClick={(e) => toggleDropdown(e, item.id)}
                    className="flex items-center gap-2 flex-1 min-w-0 p-0.5 cursor-pointer select-none"
                  >
                    <span className="size-5 relative flex items-center justify-center shrink-0">
                      <Icon className={`size-5 absolute transition-opacity duration-150 ${isDropdownOpen ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`} />
                      <span className={`size-5 absolute flex items-center justify-center ${isDropdownOpen ? "opacity-100 rotate-180 text-text-main" : "opacity-0 group-hover:opacity-100 text-text-ghost"}`}>
                        <FaAngleDown className="size-3.5" />
                      </span>
                    </span>
                    <p className="truncate">{item.name}</p>
                  </div>
                ) : (
                  <Link to={item.url} className="flex items-center gap-2 flex-1 min-w-0 p-0.5">
                    <span className="size-5 flex items-center justify-center shrink-0">
                      <Icon className="size-5" />
                    </span>
                    <p className="truncate">{item.name}</p>
                  </Link>
                )}

                <div className="flex items-center gap-1.5 px-1" onClick={(e) => e.stopPropagation()}>
                  {item.issueCount !== undefined && (
                    <span className="bg-app-button text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full text-center">
                      {item.issueCount}
                    </span>
                  )}
                  {AddIcon && (
                    <button
                      type="button"
                      onClick={() => openModal("create_organization")}
                      className="cursor-pointer hover:bg-app-item-hover rounded p-0.5 transition-colors"
                    >
                      <AddIcon className="size-4 text-text-ghost hover:text-text-muted" />
                    </button>
                  )}
                </div>
              </div>

               {item.dropDownIcon && isDropdownOpen && (
                <div className="flex flex-col pl-4 mt-1 gap-1">
                  {ORGANIZATIONS.map((org) => {
                    const isOrgActive = location.pathname.startsWith(`/organization/${org.id}`);
                    const isSubOpen = !!openSubDropdown[org.id];
                    const filteredProjects = PROJECTS.filter((p) => p.organizationId === org.id);

                    return (
                      <div key={org.id} className="flex flex-col w-full">
                        <div className={`flex items-center justify-between rounded-md p-1.5 ${
                          isOrgActive ? "bg-app-item-active/50 text-text-main" : "hover:bg-app-item-hover"
                        }`}>
                            <button
                              type="button"
                              onClick={(e) => toggleSubDropdown(e, org.id)}
                              className="size-4 flex items-center justify-center cursor-pointer text-text-ghost"
                            >
                              <FaAngleDown className={`size-3 ${isSubOpen ? "rotate-0" : "-rotate-90"}`} />
                            </button>
                          <Link to={`/organization/${org.id}`} className="flex items-center gap-2 flex-1 min-w-0">
                            <HiOutlineOfficeBuilding className="size-4 text-text-ghost shrink-0" />
                            <span className="truncate text-xs">{org.name}</span>
                          </Link>
                        </div>

                        {isSubOpen && (
                          <div className="flex flex-col pl-6 mt-1 gap-1">
                            {filteredProjects.map((project) => {
                              const isProjectActive = location.pathname.startsWith(`/projects/${project.id}`);
                              return (
                                <Link
                                  key={project.id}
                                  to={`/projects/${project.id}`}
                                  className={`p-1 flex items-center gap-2 rounded text-xs ${
                                    isProjectActive ? "text-blue-500 font-bold" : "text-text-muted hover:text-text-main"
                                  }`}
                                >
                                  <MdOutlineFolderOpen className="size-3.5 text-text-ghost shrink-0" />
                                  <span className="truncate flex-1">{project.name}</span>
                                </Link>
                              );
                            })}
                            {filteredProjects.length === 0 && (
                              <span className="text-[11px] text-text-ghost pl-2 italic">No projects</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          );
        })}
      </nav>
    </div>
  );
};
