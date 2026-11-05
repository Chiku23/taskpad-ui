import { useState } from "react";

import { SelectProjectMemberDropdown } from "./SelectProjectMemberDropdown";

import { useAddProjectMember } from "../../projects/hooks/useAddProjectMember";
import type { Project, ProjectRole } from "../../projects/types/projectTypes";
import { useToastStore } from "../../../stores/useToastStore";

interface AddProjectMemberModalProps {
  onSuccess: () => void;
  projectData: Project
}
export const AddProjectMemberModal = ({
  onSuccess,
  projectData
}: AddProjectMemberModalProps) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [role, setRole] = useState<ProjectRole>("member");

  const {addToast} = useToastStore();

  const projectSlug = projectData?.slug || "";
  const { mutateAddMember } = useAddProjectMember();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAddMember({slug: projectSlug, addMemberData: {user_id: userId, role}})
    addToast("Added member", "success", 5000)
    onSuccess(); //close modal
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Form Fields */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="member-email"
            className="text-xs font-bold text-text-ghost uppercase tracking-wide"
          >
            User Email
          </label>
          <div className="border border-app-border bg-app-input-bg rounded-lg">
            <SelectProjectMemberDropdown
            id={"member-email"} 
            selected={userId}
            onSelectUser={(id) => setUserId(id)}/>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="member-role"
            className="text-xs font-bold text-text-ghost uppercase tracking-wide"
          >
            Role
          </label>
          <select
            id="member-role"
            value={role}
            onChange={(e) => setRole(e.target.value as ProjectRole)}
            className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none focus:border-app-button transition-colors cursor-pointer"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-app-button hover:bg-app-button-hover text-black font-semibold rounded-lg px-4 py-2 text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {"Add Member"}
      </button>
    </form>
  );
};
