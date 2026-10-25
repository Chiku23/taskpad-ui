import React, { useState } from "react";
import type { OrgRole } from "../types/organizationTypes";
import { useAddOrgMember } from "../hooks/useAddOrgMember";
import { useParams } from "react-router-dom";

interface AddOrgMemberProps {
    onSuccess: () => void;
}

export const AddOrgMemberModal = ({onSuccess}: AddOrgMemberProps) => {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<OrgRole>("member");

  const {orgSlug} = useParams<{orgSlug: string}>();

  const {mutateAddOrgMember} = useAddOrgMember();
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    mutateAddOrgMember({slug: orgSlug || "", email, role}, {onSuccess});
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Form Fields */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="member-email"
          className="text-xs font-bold text-text-ghost uppercase tracking-wide"
        >
          Email
        </label>
        <input
          id="member-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-text-main text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none"
          type="email"
          placeholder="e.g. example@gmail.com"
          required
        />
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
        className="text-text-ghost text-sm border border-app-border bg-app-input-bg px-4 py-2 rounded-lg font-semibold w-full outline-none">
            <option value="member" className="text-text-ghost text-sm border border-app-border bg-app-input-bg px-4 py-2 font-semibold w-full outline-none">Member</option>
            <option value="admin" className="text-text-ghost text-sm border border-app-border bg-app-input-bg px-4 py-2 font-semibold w-full outline-none">Admin</option>
        </select>
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-app-button hover:bg-app-button-hover text-black font-semibold rounded-lg px-4 py-2 text-sm cursor-pointer"
      >
        Add Member
      </button>
    </form>
  );
};
