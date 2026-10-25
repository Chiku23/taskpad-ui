import { IoIosMore } from "react-icons/io";
import { useModalStore } from "../../../stores/useModalStore";
import { Link, useParams } from "react-router-dom";
import { useGetProjects } from "../../projects/hooks/useGetProjects.ts";
import type { Project, RouteParams } from "../../projects/types/projectTypes.ts";
import { formatDate } from "../../../utils/formatDate.ts";

export const ProjectListPage = () => {
  const { openModal } = useModalStore();
  const { orgSlug } = useParams<RouteParams>() as RouteParams;
  const { projectsData } = useGetProjects(orgSlug);
  const currentProjects: Project[] = projectsData?.data?.projects || [];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-text-main">Projects</h1>
          <p className="text-xs text-text-muted">Manage and track your organization workflows.</p>
        </div>
        <button
          className="border border-app-border px-4 py-2 rounded-md bg-app-button cursor-pointer text-black font-semibold text-sm hover:brightness-95 shadow-sm"
          onClick={() => openModal({
            activeModal: "create_project",
            modalData: null
          })}
        >
          Add Project
        </button>
      </div>

      {/*Table*/}
      <div className="border rounded-lg border-app-border overflow-scroll">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-text-muted text-xs font-semibold uppercase tracking-wider border-b border-app-border bg-app-card">
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Project Lead</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Setting</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-app-border text-text-muted text-sm">
            {currentProjects &&
              currentProjects.map((project) => (
                <tr key={project.id} className="hover:bg-app-card/30">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded border bg-app-card px-1.5 py-0.5 text-xs font-medium">
                        {project.key.toUpperCase()}
                      </span>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="font-medium text-text-main hover:underline decoration-2"
                      >
                        {project.name}
                      </Link>
                    </div>
                  </td>

                  {/* Project Lead */}
                  <td className="px-4 py-3 whitespace-nowrap align-middle">
                    <select className="border rounded-md px-3 py-2 outline-none border-app-border">
                      <option>Unassigned</option>
                      <option>{project.lead_id}</option>
                    </select>
                  </td>

                  {/* Dates */}
                  <td className="px-4 py-3 whitespace-nowrap align-middle">{formatDate(project.created_at)}</td>

                  {/* Settings Icon */}
                  <td className="px-4 py-3 whitespace-nowrap align-middle text-right">
                    <button className="inline-flex items-center justify-center p-1 rounded-md hover:bg-app-card cursor-pointer transition-colors text-text-muted">
                      <IoIosMore className="size-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
