import React, { useState } from "react";
import type { OrgRole } from "../types/organizationTypes";
import { useAddOrgMember } from "../hooks/useAddOrgMember";
import { useParams } from "react-router-dom";
import { useModalStore } from "../../../stores/useModalStore";

interface AddOrgMemberProps {
  onSuccess: () => void;
}

export const AddOrgMemberModal = ({ onSuccess }: AddOrgMemberProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<OrgRole>("member");
  const [errorMessage, setErrorMessage] = useState("");

  const { orgSlug: routeOrgSlug } = useParams<{ orgSlug: string }>();
  const modalData = useModalStore((s) => s.modalData) as { slug?: string } | null;
  const orgSlug = routeOrgSlug || modalData?.slug || "";

  const { mutateAddOrgMember, isPending } = useAddOrgMember(orgSlug);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    mutateAddOrgMember(
      { slug: orgSlug, email, role },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: (err: any) => {
          setErrorMessage(err?.message || "Failed to add member to organization");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-3 py-2 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Form Fields */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="member-email"
            className="text-xs font-bold text-text-ghost uppercase tracking-wide"
          >
            User Email
          </label>
          <input
            id="member-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none focus:border-app-button transition-colors"
            type="email"
            placeholder="e.g. member@example.com"
            required
          />
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
            onChange={(e) => setRole(e.target.value as OrgRole)}
            className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none focus:border-app-button transition-colors cursor-pointer"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 w-full bg-app-button hover:bg-app-button-hover text-black font-semibold rounded-lg px-4 py-2 text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? "Adding Member…" : "Add Member"}
      </button>
    </form>
  );
};
