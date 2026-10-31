import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateProject } from "../../projects/hooks/useCreateProject";
import { useGetOrganizationMembers } from "../hooks/useGetOrganizationMembers";

interface CreateProjectModalProps {
  onSuccess: () => void;
}

export const CreateProjectModal = ({ onSuccess }: CreateProjectModalProps) => {
  const { orgSlug = "" } = useParams<{ orgSlug: string }>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [key, setKey] = useState("");
  const [lead, setLead] = useState<number | null>(null);

  const { mutateCreateProject, isPending } = useCreateProject(orgSlug);
  const { organizationMembersData } = useGetOrganizationMembers(orgSlug);
  const members = organizationMembersData?.data?.members ?? [];

  // Auto-generate key from name (uppercase, max 6 chars, letters only)
  const handleNameChange = (val: string) => {
    setName(val);
    setKey(
      val
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 6)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutateCreateProject(
      { orgSlug, name, key, description, lead: lead ?? undefined },
      { onSuccess }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="project-name"
          className="text-xs font-bold text-text-ghost uppercase tracking-wide"
        >
          Project Name
        </label>
        <input
          id="project-name"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none focus:border-app-button transition-colors"
          type="text"
          placeholder="e.g. Backend API"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="project-description"
          className="text-xs font-bold text-text-ghost uppercase tracking-wide"
        >
          Description
        </label>
        <textarea
          id="project-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 h-20 rounded-lg w-full outline-none focus:border-app-button transition-colors"
          placeholder="Add a short description…"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="project-key"
          className="text-xs font-bold text-text-ghost uppercase tracking-wide"
        >
          Project Key
          <span className="ml-1 text-text-ghost font-normal normal-case">(short identifier)</span>
        </label>
        <input
          id="project-key"
          value={key}
          onChange={(e) => setKey(e.target.value.toUpperCase().slice(0, 6))}
          className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none focus:border-app-button transition-colors font-mono"
          type="text"
          placeholder="e.g. BACK"
          maxLength={6}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="project-lead"
          className="text-xs font-bold text-text-ghost uppercase tracking-wide"
        >
          Project Lead
          <span className="ml-1 text-text-ghost font-normal normal-case">(optional)</span>
        </label>
        <select
          id="project-lead"
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
        {isPending ? "Creating…" : "Create Project"}
      </button>
    </form>
  );
};
