import { useParams } from "react-router-dom";
import { useGetProjectMembers } from "../hooks/useGetProjectMembers";
import { IoAlbums } from "react-icons/io5";

export const ProjectSettingsPage = () => {
  const { projectSlug } = useParams();
  const { projectMembersData, isLoading } = useGetProjectMembers(
    projectSlug || "",
  );
  const members = projectMembersData?.data?.members || [];
  return (
    <div className="flex flex-col gap-4">
      <div className="border border-app-border bg-app-card p-4 rounded-lg">
        <div className="flex flex-col gap-8 p-6">
          {/*Heading */}
          <div className="flex items-center gap-4">
            <IoAlbums className="size-10 border text-app-button border-app-border bg-app-button/10 p-2 rounded-lg" />
            <div className="flex flex-col">
              <span className="font-bold text-xl">Project Details</span>
              <p className="text-xs text-text-ghost">
                General details and information about your project
              </p>
            </div>
          </div>

          {/* project info */}
          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <span className="text-xs text-text-ghost">TOTAL MEMBERS</span>
              <span className="text-sm font-bold">{members.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* members list */}
        <div className="border border-app-border bg-app-card">
            <div>
                <span></span>
            </div>
          {members.map((member) => (
            <div key={member.id}>
                {/*todo: show member role, email and name */}
            </div>
          ))}
        </div>
    </div>
  );
};
