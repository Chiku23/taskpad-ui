import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { MdOutlineSpaceDashboard, MdOutlineAdd } from "react-icons/md";
import { VscIssues, VscProject, VscChevronDown } from "react-icons/vsc";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useOrgProjects } from "../../features/projects/hooks/useOrgProjects";
import { useModalStore } from "../../stores/useModalStore";
import type { Project } from "../../features/projects/types/projectTypes";

interface SidebarProps {
  isOpen: boolean;
}

const NAV_ITEMS = [
  {
    id: "1",
    name: "For you",
    path: "activity",
    icon: FaRegUserCircle,
  },
  {
    id: "2",
    name: "Dashboard",
    path: "dashboard",
    icon: MdOutlineSpaceDashboard,
  },
  {
    id: "3",
    name: "Issues",
    path: "issues",
    icon: VscIssues,
    issueCount: 5,
  },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const { orgSlug } = useParams<{ orgSlug: string }>();

  const [isProjectsOpen, setIsProjectsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar_projects_expanded");
    return saved !== null ? saved === "true" : true;
  });

  const toggleProjects = () => {
    setIsProjectsOpen((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar_projects_expanded", String(next));
      return next;
    });
  };

  const { projects, isLoading: projectsLoading } = useOrgProjects(orgSlug);

  const openCreateProject = () => {
    useModalStore.getState().openModal("create_project");
  };

  const openEditProject = (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    e.stopPropagation();
    useModalStore.getState().openModal("edit_project", project);
  };

  return (
    <div
      {...(!isOpen ? { inert: true } : {})}
      className={`bg-app-sidebar font-semibold border-r border-app-border overflow-hidden h-screen text-sm text-text-muted shadow-lg flex flex-col ${isOpen ? "w-64 md:w-sm p-4" : "w-0 p-0"}`}
    >
      {/* ── Main navigation ── */}
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const url = `/${orgSlug}/${item.path}`;
          const isActive =
            location.pathname === url ||
            location.pathname.startsWith(`${url}/`);
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
                  to={url}
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

      {/* ── Projects section ── */}
      <div className="mt-4 flex flex-col gap-1">
        {/* Section header with expand/collapse toggle and + button */}
        <div className="flex items-center justify-between px-1 mb-1">
          <button
            onClick={toggleProjects}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-text-ghost hover:text-text-muted transition-colors cursor-pointer select-none -ml-0.5"
            aria-expanded={isProjectsOpen}
            aria-label="Toggle projects list"
          >
            <VscChevronDown
              className={`size-3.5 transition-transform duration-200 ${
                isProjectsOpen ? "rotate-0" : "-rotate-90"
              }`}
            />
            <span>Projects</span>
          </button>

          <button
            onClick={openCreateProject}
            title="New project"
            aria-label="Create new project"
            className="size-5 flex items-center justify-center rounded hover:bg-app-item-hover text-text-ghost hover:text-text-main transition-colors cursor-pointer"
          >
            <MdOutlineAdd className="size-4" />
          </button>
        </div>

        {isProjectsOpen && (
          <div className="flex flex-col gap-1">
            {projectsLoading && (
              <div className="flex items-center gap-2 px-2 py-1 text-text-ghost">
                <AiOutlineLoading3Quarters className="size-4 animate-spin" />
                <span className="text-xs">Loading…</span>
              </div>
            )}

            {!projectsLoading && projects.length === 0 && (
              <button
                onClick={openCreateProject}
                className="px-2 text-xs text-text-ghost hover:text-text-muted text-left transition-colors"
              >
                + New project
              </button>
            )}

            {!projectsLoading &&
              projects.map((project) => {
                const url = `/${orgSlug}/projects/${project.slug}`;
                const isActive =
                  location.pathname === url ||
                  location.pathname.startsWith(`${url}/`);

                return (
                  <div
                    key={project.id}
                    className={`group flex items-center rounded-lg p-1 ${
                      isActive
                        ? "bg-app-item-active text-text-main"
                        : "hover:bg-app-item-hover"
                    }`}
                  >
                    <Link
                      to={url}
                      className="flex items-center gap-2 flex-1 min-w-0 p-0.5"
                    >
                      <span className="size-5 flex items-center justify-center shrink-0">
                        <VscProject className="size-4" />
                      </span>
                      <p className="truncate">{project.name}</p>
                    </Link>

                    {/* Edit button — visible on hover */}
                    <button
                      onClick={(e) => openEditProject(e, project)}
                      title="Edit project"
                      aria-label={`Edit ${project.name}`}
                      className="opacity-0 group-hover:opacity-100 size-5 flex items-center justify-center rounded hover:bg-app-item-active text-text-ghost hover:text-text-main transition-all cursor-pointer shrink-0 mr-0.5"
                    >
                      <HiOutlineDotsHorizontal className="size-4" />
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
