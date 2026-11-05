import { useState } from "react";
import { useModalStore } from "../../../stores/useModalStore"; 
import { Link, useParams } from "react-router-dom"; 
import { useGetProjects } from "../../projects/hooks/useGetProjects.ts"; 
import type { Project, RouteParams } from "../../projects/types/projectTypes.ts"; 
import { formatDate } from "../../../utils/formatDate.ts"; 
import { ProjectSettingDropdown } from "../components/ProjectSettingDropdown.tsx"; 
import { SelectProjectLeadDropdown } from "../components/SelectProjectLeadDropdown.tsx";

export const ProjectListPage = () => {
  const [selectedLead, setSelectedLead] = useState<Record<number, number | null>>({});
  const { openModal } = useModalStore();
  const { orgSlug } = useParams<RouteParams>() as RouteParams;
  const { projectsData } = useGetProjects(orgSlug);
  const currentProjects: Project[] = projectsData?.data?.projects || [];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-app-border pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-main tracking-tight">Projects</h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">Manage and track your organization workflows.</p>
        </div>
        <button 
          className="w-full sm:w-auto border border-app-border px-4 py-2 sm:py-2.5 rounded-lg bg-app-button cursor-pointer text-black font-semibold text-sm hover:brightness-95 shadow-sm transition-all shrink-0 text-center" 
          onClick={() => openModal({ activeModal: "create_project", modalData: null })}
        >
          Add Project
        </button>
      </div>

      {/* Main Content Layout Container */}
      <div className="w-full border rounded-xl border-app-border bg-app-card/20 overflow-hidden shadow-sm">
        {/* Scroll Wrapper*/}
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-app-border select-none">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-text-muted text-xs font-bold uppercase tracking-wider border-b border-app-border bg-app-card/60">
                <th scope="col" className="px-5 py-3.5 font-semibold w-[40%]">Project</th>
                <th scope="col" className="px-5 py-3.5 font-semibold w-[25%]">Project Lead</th>
                <th scope="col" className="px-5 py-3.5 font-semibold w-[20%]">Created</th>
                <th scope="col" className="px-5 py-3.5 font-semibold text-right w-[15%]">Setting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border text-text-muted text-sm">
              {currentProjects.length > 0 ? (
                currentProjects.map((project) => 
                {
                   const activeLeadId = selectedLead[project.id] !== undefined 
                    ? selectedLead[project.id] 
                    : project.lead_id;
                  return (
                  <tr 
                    key={project.id} 
                    className="group hover:bg-app-card/40 transition-all duration-150 ease-in-out"
                  >
                    {/* Project Title Column */}
                    <td className="px-5 py-4 whitespace-nowrap align-middle">
                      <div className="flex items-center gap-3 w-full min-w-0">
                        <span className="inline-flex items-center justify-center rounded border bg-app-card px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase shrink-0 min-w-[45px] text-center text-text-main">
                          {project.key.toUpperCase()}
                        </span>
                        <Link 
                          to={`/${orgSlug}/projects/${project.slug}`} 
                          className="font-semibold text-text-main hover:underline decoration-2 transition-all truncate block max-w-[280px] lg:max-w-md"
                        >
                          {project.name}
                        </Link>
                      </div>
                    </td>

                    {/* Project Lead Dropdown Column */}
                    <td className="px-5 py-2 align-middle overflow-visible relative">
                      <div className="max-w-[200px] w-full">
                        <SelectProjectLeadDropdown 
                        id={`select-project-${project.id}-lead`} 
                        projectSlug={project.slug}
                        selected={activeLeadId}
                        onSelectUser={(newId) => setSelectedLead(prev => ({...prev, [project.id]: newId}))}/>
                      </div>
                    </td>

                    {/* Created Date Column */}
                    <td className="px-5 py-4 whitespace-nowrap align-middle text-text-muted/90 font-medium">
                      {formatDate(project.created_at)}
                    </td>

                    {/* Setting Action Trigger Column */}
                    <td className="px-5 py-4 align-middle text-right overflow-visible">
                      <ProjectSettingDropdown 
                      id={project.id} 
                      project={project}/>
                    </td>
                  </tr>
                )})
              ) : (
                /* Empty State Row */
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center select-none">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-xs mx-auto">
                      <p className="text-base text-text-main font-semibold">No active projects found</p>
                      <p className="text-xs text-text-muted">Get started by creating a brand new project tracker for your team.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
