import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useGetProject } from "../hooks/useGetProject";
import {
  IoSettingsOutline,
  IoGlobeOutline,
  IoList,
  IoPodium,
} from "react-icons/io5";

const NAV_ITEMS = [
  { id: "1", name: "Summary", path: "summary", icon: IoGlobeOutline },
  { id: "2", name: "List", path: "list", icon: IoList },
  { id: "3", name: "Board", path: "board", icon: IoPodium },
  { id: "4", name: "Setting & members", path: "settings", icon: IoSettingsOutline},
];

export const ProjectLayout = () => {
  const location = useLocation();
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const { projectData } = useGetProject(projectSlug || "");
  const project = projectData?.data?.project;

  return (
    <div className="flex flex-col bg-app-canvas min-h-screen">
      <div className="sticky top-0 flex flex-col gap-2 border-b border-app-border bg-app-canvas pt-5 px-10">
        {/*header */}
        <div className="flex items-center text-text-muted gap-1">
          <h1 className="text-2xl font-semibold capitalize">{project?.name}</h1>
        </div>

        {/*navigation */}
        <nav className="mt-4">
          <ul className="flex gap-4 text-text-ghost text-sm">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.endsWith(item.path);

              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 px-1 ${isActive ? "border-b-2 border-text-muted" : ""}`}
                  >
                    <Icon className="size-4" />
                    <span className="font-semibold">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* content */}
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
};
