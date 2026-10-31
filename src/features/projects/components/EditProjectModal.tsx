import { useState } from "react";
import { useParams } from "react-router-dom";
import { useModalStore } from "../../../stores/useModalStore";
import { useUpdateProject } from "../../projects/hooks/useUpdateProject";
import { useGetOrganizationMembers } from "../../organization/hooks/useGetOrganizationMembers";
import type { Project } from "../../projects/types/projectTypes";

interface EditProjectModalProps {
  onSuccess: () => void;
}

export const EditProjectModal = ({ onSuccess }: EditProjectModalProps) => {
  const { orgSlug = "" } = useParams<{ orgSlug: string }>();
  const project = useModalStore((s) => s.modalData) as Project;

  const [name, setName] = useState(project?.name ?? "");
  const [key, setKey] = useState(project?.key ?? "");
  const [lead, setLead] = useState<number | null>(
    project?.lead_id ? Number(project.lead_id) : null
  );

  const { mutateUpdateProject, isPending } = useUpdateProject(orgSlug);
  const { organizationMembersData } = useGetOrganizationMembers(orgSlug);
  const members = organizationMembersData?.data?.members ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutateUpdateProject(
      { projectSlug: project.slug, name, key, lead: lead ?? undefined },
      { onSuccess }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="edit-project-name"
          className="text-xs font-bold text-text-ghost uppercase tracking-wide"
        >
          Project Name
        </label>
        <input
          id="edit-project-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none focus:border-app-button transition-colors"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="edit-project-key"
          className="text-xs font-bold text-text-ghost uppercase tracking-wide"
        >
          Project Key
        </label>
        <input
          id="edit-project-key"
          value={key}
          onChange={(e) => setKey(e.target.value.toUpperCase().slice(0, 6))}
          className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none focus:border-app-button transition-colors font-mono"
          type="text"
          maxLength={6}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="edit-project-lead"
          className="text-xs font-bold text-text-ghost uppercase tracking-wide"
        >
          Project Lead
        </label>
        <select
          id="edit-project-lead"
          value={lead ?? ""}
          onChange={(e) => setLead(e.target.value ? Number(e.target.value) : null)}
          className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none focus:border-app-button transition-colors cursor-pointer"
        >
          <option value="">— No lead —</option>
          {members.map((m) => (
            <option key={m.user_id} value={m.user_id}>
              {m.user_name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full bg-app-button hover:bg-app-button-hover text-black font-semibold rounded-lg px-4 py-2 text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
};
