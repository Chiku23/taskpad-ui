import { Link } from "react-router-dom";
import { useGetProjects } from "../../features/projects/hooks/useGetProjects";
import type { Project } from "../../features/projects/types/projectTypes";
import { MdOutlineFolderOpen } from "react-icons/md";

interface OrgProjectsListProps {
  orgSlug: string;
}

export const OrgProjectsList = ({ orgSlug }: OrgProjectsListProps) => {
  // Each organization dropdown now manages its own explicit network state
  const { projectsData, isLoading } = useGetProjects(orgSlug);
  const projects: Project[] = projectsData?.data?.projects || [];

  if (isLoading) {
    return <div className="text-[11px] text-text-ghost pl-6 py-1">Loading projects...</div>;
  }

  if (projects.length === 0) {
    return <div className="text-[11px] text-text-ghost pl-6 py-1 italic">No project</div>;
  }

  return (
    <div className="flex flex-col pl-6 mt-1 gap-1">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/projects/${project.slug}`}
          className="flex items-center gap-2 p-1.5 rounded-md hover:bg-app-item-hover text-xs"
        >
          <MdOutlineFolderOpen className="size-3.5 text-text-ghost shrink-0" />
          <span className="truncate">{project.name}</span>
        </Link>
      ))}
    </div>
  );
};
